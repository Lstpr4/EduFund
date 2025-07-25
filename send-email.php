<?php
<?php
// Set headers to allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Check if it's a POST request
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get JSON data from request body
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data, true);
    
    // Check if required fields exist
    if (isset($data["name"]) && isset($data["email"]) && isset($data["message"])) {
        $name = htmlspecialchars($data["name"]);
        $email = htmlspecialchars($data["email"]);
        $message = htmlspecialchars($data["message"]);
        
        // Email recipient
        $to = "enzolimit99@yahoo.com";
        
        // Email subject
        $subject = "New Contact Form Submission from EduFund";
        
        // Email headers
        $headers = "From: " . $email . "\r\n";
        $headers .= "Reply-To: " . $email . "\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        
        // Email body
        $email_body = "
        <html>
        <head>
            <title>New Contact Form Submission</title>
        </head>
        <body>
            <h2>New Contact Form Submission from EduFund Website</h2>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Message:</strong></p>
            <p>{$message}</p>
        </body>
        </html>
        ";
        
        // Send email
        if (mail($to, $subject, $email_body, $headers)) {
            http_response_code(200);
            echo json_encode(["success" => true, "message" => "Email sent successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Failed to send email"]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Missing required fields"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
}
?>