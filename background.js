// Interactive Peaceful Background

document.addEventListener('DOMContentLoaded', function() {
  // Get the canvas element
  const canvas = document.getElementById('hexagon-background');
  
  // If canvas doesn't exist, exit
  if (!canvas) {
    console.error("Canvas element 'hexagon-background' not found. Background will not be displayed.");
    return;
  }
  
  console.log("Canvas found, initializing background...");
  
  // Initialize canvas and context
  const ctx = canvas.getContext('2d');
  
  // Set canvas size to match window
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(`Canvas resized to ${canvas.width}x${canvas.height}`);
  };
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // EduFund color palette
  const colors = [
    'rgba(10, 61, 122, 0.6)',   // Dark blue
    'rgba(24, 98, 181, 0.6)',   // Primary blue
    'rgba(42, 157, 143, 0.6)',  // Teal
    'rgba(76, 110, 245, 0.6)',  // Bright blue
    'rgba(173, 194, 235, 0.6)', // Light blue
    'rgba(118, 194, 175, 0.6)'  // Light teal
  ];
  
  // Hexagon class
  class ShootingHexagon {
    constructor() {
      // Initialize position above and to the right of the screen
      this.reset();
      
      // Start from a random position at first creation
      this.x = Math.random() * (canvas.width + 200);
      this.y = Math.random() * canvas.height;
    }
    
    reset() {
      // Size properties
      this.size = Math.random() * 12 + 5;
      this.glowSize = this.size * (Math.random() * 1.5 + 1);
      
      // Position at top-right off screen
      this.x = canvas.width + Math.random() * 100;
      this.y = -100 - Math.random() * canvas.height * 0.5;
      
      // Movement
      this.speed = Math.random() * 2 + 1;
      this.angle = Math.PI * 0.25 + Math.random() * 0.2; // Diagonal angle for falling
      
      // Appearance
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.rotation = Math.random() * Math.PI;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      
      // Trail
      this.tailLength = Math.random() * 20 + 5;
      
      // Effects
      this.alpha = Math.random() * 0.5 + 0.5;
      this.twinkle = Math.random() > 0.7;
      this.twinkleSpeed = 0.03 + Math.random() * 0.03;
      this.twinkleValue = Math.random();
    }
    
    update() {
      // Move diagonally
      this.x -= Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      
      // Rotate hexagon
      this.rotation += this.rotationSpeed;
      
      // Twinkle effect
      if (this.twinkle) {
        this.twinkleValue += this.twinkleSpeed;
        if (this.twinkleValue > 1 || this.twinkleValue < 0) {
          this.twinkleSpeed = -this.twinkleSpeed;
        }
      }
      
      // Check if hexagon is off screen
      if (this.x < -100 || this.y > canvas.height + 100) {
        this.reset();
      }
    }
    
    draw() {
      // Calculate current alpha with twinkle effect
      const currentAlpha = this.twinkle 
        ? this.alpha * (0.6 + 0.4 * Math.sin(this.twinkleValue * Math.PI * 2)) 
        : this.alpha;
      
      // Draw trail
      for (let i = 0; i < this.tailLength; i++) {
        const tailX = this.x + Math.cos(this.angle) * i * (this.speed * 0.8);
        const tailY = this.y - Math.sin(this.angle) * i * (this.speed * 0.8);
        const tailSize = this.size * (1 - i / this.tailLength) * 0.5;
        const tailAlpha = currentAlpha * (1 - i / this.tailLength) * 0.6;
        
        // Draw tail segment
        if (i % 2 === 0) { // Skip some segments for performance
          ctx.save();
          ctx.translate(tailX, tailY);
          ctx.rotate(this.rotation);
          ctx.globalAlpha = tailAlpha;
          
          // Draw hexagon for trail
          this.drawHexagon(0, 0, tailSize, this.color.replace(')', ', ' + tailAlpha + ')').replace('rgba', 'rgba'));
          
          ctx.restore();
        }
      }
      
      // Draw main hexagon
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = currentAlpha;
      
      // Draw glow effect
      const gradientColor = this.color.replace(')', ', 1)').replace('rgba', 'rgba');
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.glowSize);
      gradient.addColorStop(0, gradientColor);
      gradient.addColorStop(1, this.color.replace(')', ', 0)').replace('rgba', 'rgba'));
      
      ctx.beginPath();
      ctx.arc(0, 0, this.glowSize, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw hexagon
      this.drawHexagon(0, 0, this.size, this.color.replace(')', ', ' + currentAlpha + ')').replace('rgba', 'rgba'));
      
      // Draw bright center
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, ' + currentAlpha * 0.9 + ')';
      ctx.fill();
      
      ctx.restore();
    }
    
    // Helper method to draw hexagons
    drawHexagon(x, y, size, color) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + this.rotation;
        const hx = x + size * Math.cos(angle);
        const hy = y + size * Math.sin(angle);
        
        if (i === 0) {
          ctx.moveTo(hx, hy);
        } else {
          ctx.lineTo(hx, hy);
        }
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    }
  }
  
  // Create array of hexagons
  const hexagons = [];
  const hexagonCount = Math.min(Math.floor(canvas.width / 80), 30); // Responsive count
  
  // Initialize hexagons
  for (let i = 0; i < hexagonCount; i++) {
    hexagons.push(new ShootingHexagon());
  }
  
  // Animation loop
  function animate() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Create soft gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#f8faff');  // Very light blue-white
    gradient.addColorStop(1, '#eef5fc');  // Light blue-gray
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw hexagons
    for (const hexagon of hexagons) {
      hexagon.update();
      hexagon.draw();
    }
    
    requestAnimationFrame(animate);
  }
  
  // Add click/touch event to create bursts of hexagons
  function addHexagonBurst(x, y) {
    for (let i = 0; i < 5; i++) {
      const hexagon = new ShootingHexagon();
      hexagon.x = x;
      hexagon.y = y;
      hexagon.speed = Math.random() * 3 + 2; // Faster
      hexagon.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.5; // More random angles
      hexagons.push(hexagon);
      
      // Remove oldest hexagons if we have too many
      if (hexagons.length > hexagonCount + 20) {
        hexagons.shift();
      }
    }
  }
  
  canvas.addEventListener('click', function(event) {
    addHexagonBurst(event.clientX, event.clientY);
  });
  
  canvas.addEventListener('touchstart', function(event) {
    if (event.touches.length > 0) {
      addHexagonBurst(event.touches[0].clientX, event.touches[0].clientY);
      event.preventDefault(); // Prevent default touch behavior
    }
  });
  
  // Start animation
  animate();
  
  console.log('Hexagon shooting stars background initialized');
});