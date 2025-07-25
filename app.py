from flask import Flask, request, jsonify, send_from_directory
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json
import os
from datetime import datetime
import random

app = Flask(__name__, static_folder='.')

# Database files
SCHOLARSHIPS_FILE = 'scholarships.json'
APPLICATIONS_FILE = 'applications.json'

# Email configuration (update these values in production)
EMAIL_HOST = 'smtp.example.com'
EMAIL_PORT = 587
EMAIL_USER = 'your-email@example.com'
EMAIL_PASSWORD = 'your-password'

def load_scholarships():
    """Load scholarships from JSON file or create default if doesn't exist"""
    if not os.path.exists(SCHOLARSHIPS_FILE):
        # Create comprehensive scholarship database
        default_scholarships = [
            # National Merit Scholarships
            {"id": 1, "name": "National Merit Scholarship", "amount": 2500, 
             "organization": "National Merit Scholarship Corporation", 
             "requirements": {"min_gpa": 3.8, "education": ["high_school"], "test_scores": True}, 
             "deadline": "Sep 15, 2025", "available": True,
             "description": "The National Merit® Scholarship Program is an academic competition for recognition and scholarships that began in 1955."},
            
            # Large Foundation Scholarships
            {"id": 2, "name": "Gates Millennium Scholars Program", "amount": 40000, 
             "organization": "Bill & Melinda Gates Foundation", 
             "requirements": {"min_gpa": 3.3, "education": ["undergraduate"], "ethnicity": ["black", "hispanic", "native", "pacific"]}, 
             "deadline": "Jan 15, 2026", "available": True,
             "description": "The Gates Millennium Scholars (GMS) Program, funded by a grant from the Bill & Melinda Gates Foundation, was established in 1999 to provide outstanding students with financial need the opportunity to complete an undergraduate college education.",
             "website": "https://www.gatesfoundation.org"},
            
            {"id": 3, "name": "Jack Kent Cooke Foundation Scholarship", "amount": 55000, 
             "organization": "Jack Kent Cooke Foundation", 
             "requirements": {"min_gpa": 3.5, "education": ["undergraduate"], "income": ["low", "med-low"]}, 
             "deadline": "Nov 20, 2025", "available": True,
             "description": "The Jack Kent Cooke Foundation College Scholarship Program is an undergraduate scholarship program available to high-achieving high school seniors with financial need who seek to attend the nation's best four-year colleges and universities.",
             "website": "https://www.jkcf.org"},
            
            # Corporate Scholarships
            {"id": 4, "name": "Coca-Cola Scholars Program", "amount": 20000, 
             "organization": "The Coca-Cola Company", 
             "requirements": {"min_gpa": 3.0, "education": ["undergraduate"]}, 
             "deadline": "Oct 31, 2025", "available": True,
             "description": "The Coca-Cola Scholars Program scholarship is an achievement-based scholarship awarded to graduating high school seniors. Students are recognized for their capacity to lead and serve, as well as their commitment to making a significant impact on their schools and communities.",
             "website": "https://www.coca-colascholarsfoundation.org"},
            
            {"id": 5, "name": "Dell Scholars Program", "amount": 20000, 
             "organization": "Michael & Susan Dell Foundation", 
             "requirements": {"min_gpa": 2.4, "education": ["undergraduate"], "income": ["low", "med-low"]}, 
             "deadline": "Dec 1, 2025", "available": True,
             "description": "The Dell Scholars Program is an initiative of the Michael & Susan Dell Foundation that recognizes students who have overcome significant obstacles to pursue their educations.",
             "website": "https://www.dellscholars.org"},
            
            {"id": 6, "name": "Amazon Future Engineer Scholarship", "amount": 40000, 
             "organization": "Amazon", 
             "requirements": {"min_gpa": 3.0, "education": ["undergraduate"], "majors": ["computer science", "engineering"]}, 
             "deadline": "Jan 31, 2026", "available": True,
             "description": "The Amazon Future Engineer Scholarship program provides students with financial support to help them pursue an education in computer science.",
             "website": "https://www.amazonfutureengineer.com"},
            
            {"id": 7, "name": "Google Lime Scholarship", "amount": 10000, 
             "organization": "Google", 
             "requirements": {"min_gpa": 3.0, "education": ["undergraduate", "graduate"], "majors": ["computer science", "engineering"]}, 
             "deadline": "Dec 5, 2025", "available": True,
             "description": "Google has partnered with Lime Connect to help university students with disabilities pursue their studies in the field of computer science.",
             "website": "https://www.limeconnect.com/programs/page/google-lime-scholarship"},
            
            # STEM-focused scholarships
            {"id": 8, "name": "Society of Women Engineers Scholarship", "amount": 15000, 
             "organization": "Society of Women Engineers", 
             "requirements": {"min_gpa": 3.0, "education": ["undergraduate", "graduate"], "majors": ["engineering"], "gender": "female"}, 
             "deadline": "Feb 15, 2026", "available": True,
             "description": "The SWE Scholarship Program provides financial assistance to those who identify as women and are studying engineering, engineering technology, and computer science.",
             "website": "https://swe.org/scholarships"},
            
            {"id": 9, "name": "Regeneron Science Talent Search", "amount": 250000, 
             "organization": "Society for Science", 
             "requirements": {"education": ["high_school"], "project": True}, 
             "deadline": "Nov 10, 2025", "available": True,
             "description": "The Regeneron Science Talent Search (Regeneron STS) is the nation's oldest and most prestigious science and math competition for high school seniors.",
             "website": "https://www.societyforscience.org/regeneron-sts"},
            
            # Ethnic and diversity scholarships
            {"id": 10, "name": "Hispanic Scholarship Fund", "amount": 5000, 
             "organization": "Hispanic Scholarship Fund", 
             "requirements": {"min_gpa": 3.0, "education": ["undergraduate", "graduate"], "ethnicity": ["hispanic"]}, 
             "deadline": "Feb 15, 2026", "available": True,
             "description": "The Hispanic Scholarship Fund (HSF) is designed to assist students of Hispanic heritage obtain a university degree.",
             "website": "https://www.hsf.net"},
            
            {"id": 11, "name": "UNCF Scholarships", "amount": 10000, 
             "organization": "United Negro College Fund", 
             "requirements": {"min_gpa": 2.5, "education": ["undergraduate"], "ethnicity": ["black"]}, 
             "deadline": "Mar 31, 2026", "available": True,
             "description": "UNCF has helped more than 500,000 students earn their college degrees since its founding.",
             "website": "https://uncf.org/scholarships"},
            
            {"id": 12, "name": "American Indian College Fund", "amount": 6000, 
             "organization": "American Indian College Fund", 
             "requirements": {"min_gpa": 2.0, "education": ["undergraduate", "graduate"], "ethnicity": ["native"]}, 
             "deadline": "May 31, 2026", "available": True,
             "description": "The American Indian College Fund provides scholarships to American Indian and Alaska Native college students.",
             "website": "https://collegefund.org"},
            
            # Arts and Humanities Scholarships
            {"id": 13, "name": "YoungArts Foundation Scholarship", "amount": 10000, 
             "organization": "National YoungArts Foundation", 
             "requirements": {"education": ["high_school"], "majors": ["arts", "music", "dance", "theater"]}, 
             "deadline": "Oct 15, 2025", "available": True,
             "description": "The National YoungArts Foundation identifies and nurtures the most accomplished young artists in the visual, literary, and performing arts.",
             "website": "https://youngarts.org/apply"},
            
            # State-specific scholarships
            {"id": 14, "name": "Florida Bright Futures Scholarship", "amount": 9000, 
             "organization": "Florida Department of Education", 
             "requirements": {"min_gpa": 3.0, "education": ["undergraduate"], "state": "Florida"}, 
             "deadline": "Aug 31, 2025", "available": True,
             "description": "The Florida Bright Futures Scholarship Program establishes lottery-funded scholarships to reward Florida high school graduates for high academic achievement.",
             "website": "https://www.floridastudentfinancialaidsg.org"},
            
            {"id": 15, "name": "Cal Grant", "amount": 12570, 
             "organization": "California Student Aid Commission", 
             "requirements": {"min_gpa": 2.0, "education": ["undergraduate"], "state": "California"}, 
             "deadline": "Mar 2, 2026", "available": True,
             "description": "Cal Grants are free money for college that you don't have to pay back.",
             "website": "https://www.csac.ca.gov/cal-grants"},
            
            {"id": 16, "name": "New York State Excelsior Scholarship", "amount": 5500, 
             "organization": "New York State Higher Education Services Corporation", 
             "requirements": {"education": ["undergraduate"], "state": "New York", "income": ["low", "med-low", "med"]}, 
             "deadline": "Jul 23, 2026", "available": True,
             "description": "The Excelsior Scholarship, in combination with other student financial aid programs, allows eligible students to attend a SUNY or CUNY college tuition-free.",
             "website": "https://www.hesc.ny.gov/excelsior"},
            
            # Athletic Scholarships
            {"id": 17, "name": "NCAA Athletic Scholarship", "amount": 30000, 
             "organization": "National Collegiate Athletic Association", 
             "requirements": {"education": ["undergraduate"], "athletic": True}, 
             "deadline": "Varies", "available": True,
             "description": "NCAA athletic scholarships are awarded to student-athletes based on their athletic abilities.",
             "website": "https://www.ncaa.org/student-athletes"},
            
            # International scholarships
            {"id": 18, "name": "Fulbright Foreign Student Program", "amount": 45000, 
             "organization": "U.S. Department of State", 
             "requirements": {"education": ["graduate", "phd"], "international": True}, 
             "deadline": "Varies", "available": True,
             "description": "The Fulbright Foreign Student Program enables graduate students, young professionals and artists from abroad to study and conduct research in the United States.",
             "website": "https://foreign.fulbrightonline.org"},
            
            # First-generation scholarships
            {"id": 19, "name": "First in Family Scholarship", "amount": 15000, 
             "organization": "First Generation Foundation", 
             "requirements": {"min_gpa": 3.0, "education": ["undergraduate"], "first_gen": True}, 
             "deadline": "Apr 15, 2026", "available": True,
             "description": "This scholarship aims to support students who are the first in their families to attend college.",
             "website": "https://www.firstgenerationfoundation.org"},
            
            # Specialized field scholarships
            {"id": 20, "name": "Tylenol Future Care Scholarship", "amount": 10000, 
             "organization": "Tylenol", 
             "requirements": {"min_gpa": 2.5, "education": ["undergraduate", "graduate"], "majors": ["healthcare", "medicine", "nursing"]}, 
             "deadline": "Jun 30, 2026", "available": True,
             "description": "The Tylenol Future Care Scholarship is awarded to students pursuing careers in healthcare.",
             "website": "https://www.tylenol.com/scholarship"},
            
            # Military scholarships
            {"id": 21, "name": "AMVETS Scholarships", "amount": 4000, 
             "organization": "American Veterans", 
             "requirements": {"min_gpa": 3.0, "education": ["undergraduate", "graduate"], "military": True}, 
             "deadline": "Apr 30, 2026", "available": True,
             "description": "AMVETS offers scholarships to veterans, active duty military, their sons, daughters, or grandchildren.",
             "website": "https://amvets.org/scholarships"},
            
            # Graduate scholarships
            {"id": 22, "name": "Ford Foundation Fellowship Program", "amount": 27000, 
             "organization": "Ford Foundation", 
             "requirements": {"education": ["phd"]}, 
             "deadline": "Dec 17, 2025", "available": True,
             "description": "The Ford Foundation Fellowship Programs aim to increase the diversity of the nation's college and university faculties.",
             "website": "https://sites.nationalacademies.org/PGA/FordFellowships"},
            
            # Community service scholarships
            {"id": 23, "name": "Prudential Spirit of Community Award", "amount": 5000, 
             "organization": "Prudential Financial", 
             "requirements": {"education": ["high_school"], "community_service": True}, 
             "deadline": "Nov 5, 2025", "available": True,
             "description": "The Prudential Spirit of Community Awards program is the United States' largest youth recognition program based exclusively on volunteer community service.",
             "website": "https://spirit.prudential.com"},
            
            # Special interest scholarships
            {"id": 24, "name": "Vegetarian Resource Group Scholarship", "amount": 10000, 
             "organization": "The Vegetarian Resource Group", 
             "requirements": {"education": ["high_school"], "vegetarian": True}, 
             "deadline": "Feb 20, 2026", "available": True,
             "description": "The Vegetarian Resource Group (VRG) annually awards scholarships to graduating U.S. high school students who have promoted vegetarianism in their schools and communities.",
             "website": "https://www.vrg.org/student/scholar.htm"},
            
            # Coming soon / not yet available scholarships
            {"id": 25, "name": "Ron Brown Scholar Program", "amount": 40000, 
             "organization": "Ron Brown Scholar Fund", 
             "requirements": {"min_gpa": 3.0, "education": ["undergraduate"], "ethnicity": ["black"]}, 
             "deadline": "Jan 9, 2026", "available": False, "opens": "Sep 1, 2025",
             "description": "The Ron Brown Scholar Program seeks to identify African-American high school seniors who will make significant contributions to society.",
             "website": "https://www.ronbrown.org"},
            
            {"id": 26, "name": "Buick Achievers Scholarship", "amount": 25000, 
             "organization": "General Motors Foundation", 
             "requirements": {"min_gpa": 3.0, "education": ["undergraduate"], "majors": ["engineering", "technology", "business"]}, 
             "deadline": "Feb 29, 2026", "available": False, "opens": "Dec 1, 2025",
             "description": "The Buick Achievers Scholarship Program is designed to help students who are leaders in both the classroom and their communities, but who may not have the financial means to attend college.",
             "website": "https://www.buickachievers.com"},
            
            {"id": 27, "name": "Davidson Fellows Scholarship", "amount": 50000, 
             "organization": "Davidson Institute", 
             "requirements": {"education": ["high_school"], "project": True}, 
             "deadline": "Feb 12, 2026", "available": False, "opens": "Nov 1, 2025",
             "description": "The Davidson Fellows Scholarship awards scholarships to extraordinary young people who have completed a significant piece of work.",
             "website": "https://www.davidsongifted.org/fellows-scholarship"},
            
            {"id": 28, "name": "Udall Undergraduate Scholarship", "amount": 7000, 
             "organization": "Udall Foundation", 
             "requirements": {"education": ["undergraduate"], "environment": True}, 
             "deadline": "Mar 5, 2026", "available": False, "opens": "Oct 1, 2025",
             "description": "The Udall Undergraduate Scholarship is awarded to college sophomores and juniors for leadership, public service, and commitment to issues related to Native American nations or to the environment.",
             "website": "https://www.udall.gov/OurPrograms/Scholarship/Scholarship.aspx"},
            
            {"id": 29, "name": "Horatio Alger Scholarship", "amount": 25000, 
             "organization": "Horatio Alger Association", 
             "requirements": {"min_gpa": 2.0, "education": ["undergraduate"], "income": ["low", "med-low"], "hardship": True}, 
             "deadline": "Oct 25, 2025", "available": False, "opens": "Aug 1, 2025",
             "description": "The Horatio Alger Scholarship Programs specifically assist high school students who have faced and overcome great obstacles in their young lives.",
             "website": "https://scholars.horatioalger.org"},
            
            {"id": 30, "name": "Thiel Fellowship", "amount": 100000, 
             "organization": "Thiel Foundation", 
             "requirements": {"age": "under 23", "entrepreneur": True}, 
             "deadline": "Dec 31, 2025", "available": False, "opens": "Sep 30, 2025",
             "description": "The Thiel Fellowship gives $100,000 to young people who want to build new things instead of sitting in a classroom.",
             "website": "https://thielfellowship.org"}
        ]
        with open(SCHOLARSHIPS_FILE, 'w') as f:
            json.dump(default_scholarships, f, indent=2)
        return default_scholarships
    
    with open(SCHOLARSHIPS_FILE, 'r') as f:
        return json.load(f)

def load_applications():
    """Load applications from JSON file or create empty list if doesn't exist"""
    if not os.path.exists(APPLICATIONS_FILE):
        with open(APPLICATIONS_FILE, 'w') as f:
            json.dump([], f)
        return []
    
    with open(APPLICATIONS_FILE, 'r') as f:
        return json.load(f)

def save_applications(applications):
    """Save applications to JSON file"""
    with open(APPLICATIONS_FILE, 'w') as f:
        json.dump(applications, f, indent=2)

def send_confirmation_email(email, name, scholarships):
    """Send confirmation email to the user"""
    try:
        msg = MIMEMultipart()
        msg['From'] = EMAIL_USER
        msg['To'] = email
        msg['Subject'] = "Your Scholarship Applications - Confirmation"
        
        # Email body
        body = f"""
        Hello {name},
        
        Thank you for using Scholarship.ai! We've submitted your applications to the following scholarships:
        
        """
        
        for scholarship in scholarships:
            body += f"- {scholarship['name']} (${scholarship['amount']})\n"
            
        body += f"""
        
        Total potential scholarship amount: ${sum(s['amount'] for s in scholarships):,}
        
        We'll notify you of any updates regarding your applications.
        
        Best regards,
        The Scholarship.ai Team
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # For demo purposes, we'll just print instead of actually sending
        print(f"Would send email to {email} with subject: {msg['Subject']}")
        print("Email body:")
        print(body)
        
        # In a real app, uncomment this code to actually send emails:
        """
        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        text = msg.as_string()
        server.sendmail(EMAIL_USER, email, text)
        server.quit()
        """
        
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    # In a real app, you would save this to a database or send an email
    print(f"Contact form submission: {data}")
    return jsonify({"success": True})

@app.route('/api/submit-scholarships', methods=['POST'])
def submit_scholarships():
    user_data = request.json
    
    # Load available scholarships
    scholarships = load_scholarships()
    
    # Find matching scholarships
    matching_scholarships = []
    for scholarship in scholarships:
        # Skip if not available
        if not scholarship.get('available', True):
            continue
            
        # Check requirements
        requirements = scholarship.get('requirements', {})
        
        # Check GPA
        min_gpa = requirements.get('min_gpa', 0)
        if float(user_data.get('gpa', 0)) < min_gpa:
            continue
            
        # Check education level
        education_levels = requirements.get('education', [])
        if education_levels and user_data.get('education') not in education_levels:
            continue
            
        # Check major if specified
        major_requirements = requirements.get('majors', [])
        if major_requirements:
            user_major = user_data.get('major', '').lower()
            if not any(req in user_major.lower() for req in major_requirements):
                continue
                
        # Check state if specified
        state_requirement = requirements.get('state')
        if state_requirement and user_data.get('state') != state_requirement:
            continue
                
        # Check ethnicity if specified
        ethnicity_requirements = requirements.get('ethnicity', [])
        if ethnicity_requirements and user_data.get('ethnicity') not in ethnicity_requirements:
            continue
            
        # Check income if specified
        income_requirements = requirements.get('income', [])
        if income_requirements and user_data.get('income') not in income_requirements:
            continue
            
        # Add to matching scholarships with organization name
        matching_scholarships.append({
            "id": scholarship['id'],
            "name": scholarship['name'],
            "amount": scholarship['amount'],
            "organization": scholarship.get('organization', 'Unknown'),
            "deadline": scholarship.get('deadline', 'N/A'),
            "status": "Applied",
            "description": scholarship.get('description', ''),
            "website": scholarship.get('website', '')
        })
    
    # Sort by amount (highest first) and limit to 20
    matching_scholarships.sort(key=lambda x: x['amount'], reverse=True)
    matching_scholarships = matching_scholarships[:20]
    
    # Get unavailable scholarships for future reference
    unavailable_scholarships = [
        {
            "id": s['id'],
            "name": s['name'],
            "amount": s['amount'],
            "organization": s.get('organization', 'Unknown'),
            "deadline": s.get('deadline', 'N/A'),
            "status": f"Not Available Yet (Opens {s.get('opens', 'soon')})",
            "description": s.get('description', ''),
            "website": s.get('website', '')
        }
        for s in scholarships
        if not s.get('available', True)
    ]
    
    # Sort by amount and limit to 5
    unavailable_scholarships.sort(key=lambda x: x['amount'], reverse=True)
    unavailable_scholarships = unavailable_scholarships[:5]
    
    # Combine the results (applied first, then unavailable)
    result_scholarships = matching_scholarships + unavailable_scholarships
    
    # Save the application
    applications = load_applications()
    applications.append({
        "user": user_data,
        "scholarships": matching_scholarships,
        "date": datetime.now().isoformat()
    })
    save_applications(applications)
    
    # Send confirmation email
    send_confirmation_email(
        user_data['email'], 
        user_data['fullName'], 
        matching_scholarships
    )
    
    return jsonify({
        "success": True,
        "scholarships": result_scholarships
    })

from flask import Flask, request, jsonify, send_from_directory
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json
import os
from datetime import datetime
import random

app = Flask(__name__, static_folder='.')

# Database files
SCHOLARSHIPS_FILE = 'scholarships.json'
APPLICATIONS_FILE = 'applications.json'

# Email configuration (update these values in production)
EMAIL_HOST = 'smtp.example.com'
EMAIL_PORT = 587
EMAIL_USER = 'your-email@example.com'
EMAIL_PASSWORD = 'your-password'

def load_scholarships():
    """Load scholarships from JSON file or create default if doesn't exist"""
    if not os.path.exists(SCHOLARSHIPS_FILE):
        # Create comprehensive scholarship database
        default_scholarships = [
            # National Merit Scholarships
            {"id": 1, "name": "National Merit Scholarship", "amount": 2500, 
             "organization": "National Merit Scholarship Corporation", 
             "requirements": {"min_gpa": 3.8, "education": ["high_school"], "test_scores": True}, 
             "deadline": "Sep 15, 2025", "available": True,
             "description": "The National Merit® Scholarship Program is an academic competition for recognition and scholarships that began in 1955."},
            
            # Large Foundation Scholarships
            {"id": 2, "name": "Gates Millennium Scholars Program", "amount": 40000, 
             "organization": "Bill & Melinda Gates Foundation", 
             "requirements": {"min_gpa": 3.3, "education": ["undergraduate"], "ethnicity": ["black", "hispanic", "native", "pacific"]}, 
             "deadline": "Jan 15, 2026", "available": True,
             "description": "The Gates Millennium Scholars (GMS) Program, funded by a grant from the Bill & Melinda Gates Foundation, was established in 1999 to provide outstanding students with financial need the opportunity to complete an undergraduate college education.",
             "website": "https://www.gatesfoundation.org"},
            
            {"id": 3, "name": "Jack Kent Cooke Foundation Scholarship", "amount": 55000, 
             "organization": "Jack Kent Cooke Foundation", 
             "requirements": {"min_gpa": 3.5, "education": ["undergraduate"], "income": ["low", "med-low"]}, 
             "deadline": "Nov 20, 2025", "available": True,
             "description": "The Jack Kent Cooke Foundation College Scholarship Program is an undergraduate scholarship program available to high-achieving high school seniors with financial need who seek to attend the nation's best four-year colleges and universities.",
             "website": "https://www.jkcf.org"},
            
            # Corporate Scholarships
            {"id": 4, "name": "Coca-Cola Scholars Program", "amount": 20000, 
             "organization": "The Coca-Cola Company", 
             "requirements": {"min_gpa": 3.0, "education": ["undergraduate"]}, 
             "deadline": "Oct 31, 2025", "available": True,
             "description": "The Coca-Cola Scholars Program scholarship is an achievement-based scholarship awarded to graduating high school seniors. Students are recognized for their capacity to lead and serve, as well as their commitment to making a significant impact on their schools and communities.",
             "website": "https://www.coca-colascholarsfoundation.org"},
            
            {"id": 5, "name": "Dell Scholars Program", "amount": 20000, 
             "organization": "Michael & Susan Dell Foundation", 
             "requirements": {"min_gpa": 2.4, "education": ["undergraduate"], "income": ["low", "med-low"]}, 
             "deadline": "Dec 1, 2025", "available": True,
             "description": "The Dell Scholars Program is an initiative of the Michael & Susan Dell Foundation that recognizes students who have overcome significant obstacles to pursue their educations.",
             "website": "https://www.dellscholars.org"},
            
            {"id": 6, "name": "Amazon Future Engineer Scholarship", "amount": 40000, 
             "organization": "Amazon", 
             "requirements": {"min_gpa": 3.0, "education": ["undergraduate"], "majors": ["computer science", "engineering"]}, 
             "deadline": "Jan 31, 2026", "available": True,
             "description": "The Amazon Future Engineer Scholarship program provides students with financial support to help them pursue an education in computer science.",
             "website": "https://www.amazonfutureengineer.com"},
            
            {"id": 7, "name": "Google Lime Scholarship", "amount": 10000, 
             "organization": "Google", 
             "requirements": {"min_gpa": 3.0, "education": ["undergraduate", "graduate"], "majors": ["computer science", "engineering"]}, 
             "deadline": "Dec 5, 2025", "available": True,
             "description": "Google has partnered with Lime Connect to help university students with disabilities pursue their studies in the field of computer science.",
             "website": "https://www.limeconnect.com/programs/page/google-lime-scholarship"},
            
            # STEM-focused scholarships
            {"id": 8, "name": "Society of Women Engineers Scholarship", "amount": 15000, 
             "organization": "Society of Women Engineers", 
             "requirements": {"min_gpa": 3.0, "education": ["undergraduate", "graduate"], "majors": ["engineering"], "gender": "female"}, 
             "deadline": "Feb 15, 2026", "available": True,
             "description": "The SWE Scholarship Program provides financial assistance to those who identify as women and are studying engineering, engineering technology, and computer science.",
             "website": "https://swe.org/scholarships"},
            
            {"id": 9, "name": "Regeneron Science Talent Search", "amount": 250000, 
             "organization": "Society for Science", 
             "requirements": {"education": ["high_school"], "project": True}, 
             "deadline": "Nov 10, 2025", "available": True,
             "description": "The Regeneron Science Talent Search (Regeneron STS) is the nation's oldest and most prestigious science and math competition for high school seniors.",
             "website": "https://www.societyforscience.org/regeneron-sts"},
            
            # Ethnic and diversity scholarships
            {"id": 10, "name": "Hispanic Scholarship Fund", "amount": 5000, 
             "organization": "Hispanic Scholarship Fund", 
             "requirements": {"min_gpa": 3.0, "education": ["undergraduate", "graduate"], "ethnicity": ["hispanic"]}, 
             "deadline": "Feb 15, 2026", "available": True,
             "description": "The Hispanic Scholarship Fund (HSF) is designed to assist students of Hispanic heritage obtain a university degree.",
             "website": "https://www.hsf.net"},
            
            {"id": 11, "name": "UNCF Scholarships", "amount": 10000, 
             "organization": "United Negro College Fund", 
             "requirements": {"min_gpa": 2.5, "education": ["undergraduate"], "ethnicity": ["black"]}, 
             "deadline": "Mar 31, 2026", "available": True,
             "description": "UNCF has helped more than 500,000 students earn their college degrees since its founding.",
             "website": "https://uncf.org/scholarships"},
            
            {"id": 12, "name": "American Indian College Fund", "amount": 6000, 
             "organization": "American Indian College Fund", 
             "requirements": {"min_gpa": 2.0, "education": ["undergraduate", "graduate"], "ethnicity": ["native"]}, 
             "deadline": "May 31, 2026", "available": True,
             "description": "The American Indian College Fund provides scholarships to American Indian and Alaska Native college students.",
             "website": "https://collegefund.org"},
            
            # Arts and Humanities Scholarships
            {"id": 13, "name": "YoungArts Foundation Scholarship", "amount": 10000, 
             "organization": "National YoungArts Foundation", 
             "requirements": {"education": ["high_school"], "majors": ["arts", "music", "dance", "theater"]}, 
             "deadline": "Oct 15, 2025", "available": True,
             "description": "The National YoungArts Foundation identifies and nurtures the most accomplished young artists in the visual, literary, and performing arts.",
             "website": "https://youngarts.org/apply"},
            
            # State-specific scholarships
            {"id": 14, "name": "Florida Bright Futures Scholarship", "amount": 9000, 
             "organization": "Florida Department of Education", 
             "requirements": {"min_gpa": 3.0, "education": ["undergraduate"], "state": "Florida"}, 
             "deadline": "Aug 31, 2025", "available": True,
             "description": "The Florida Bright Futures Scholarship Program establishes lottery-funded scholarships to reward Florida high school graduates for high academic achievement.",
             "website": "https://www.floridastudentfinancialaidsg.org"},
            
            {"id": 15, "name": "Cal Grant", "amount": 12570, 
             "organization": "California Student Aid Commission", 
             "requirements": {"min_gpa": 2.0, "education": ["undergraduate"], "state": "California"}, 
             "deadline": "Mar 2, 2026", "available": True,
             "description": "Cal Grants are free money for college that you don't have to pay back.",
             "website": "https://www.csac.ca.gov/cal-grants"},
            
            {"id": 16, "name": "New York State Excelsior Scholarship", "amount": 5500, 
             "organization": "New York State Higher Education Services Corporation", 
             "requirements": {"education": ["undergraduate"], "state": "New York", "income": ["low", "med-low", "med"]}, 
             "deadline": "Jul 23, 2026", "available": True,
             "description": "The Excelsior Scholarship, in combination with other student financial aid programs, allows eligible students to attend a SUNY or CUNY college tuition-free.",
             "website": "https://www.hesc.ny.gov/excelsior"},
            
            # Athletic Scholarships
            {"id": 17, "name": "NCAA Athletic Scholarship", "amount": 30000, 
             "organization": "National Collegiate Athletic Association", 
             "requirements": {"education": ["undergraduate"], "athletic": True}, 
             "deadline": "Varies", "available": True,
             "description": "NCAA athletic scholarships are awarded to student-athletes based on their athletic abilities.",
             "website": "https://www.ncaa.org/student-athletes"},
            
            # International scholarships
            {"id": 18, "name": "Fulbright Foreign Student Program", "amount": 45000, 
             "organization": "U.S. Department of State", 
             "requirements": {"education": ["graduate", "phd"], "international": True}, 
             "deadline": "Varies", "available": True,
             "description": "The Fulbright Foreign Student Program enables graduate students, young professionals and artists from abroad to study and conduct research in the United States.",
             "website": "https://foreign.fulbrightonline.org"},
            
            # First-generation scholarships
            {"id": 19, "name": "First in Family Scholarship", "amount": 15000, 
             "organization": "First Generation Foundation", 
             "requirements": {"min_gpa": 3.0, "education": ["undergraduate"], "first_gen": True}, 
             "deadline": "Apr 15, 2026", "available": True,
             "description": "This scholarship aims to support students who are the first in their families to attend college.",
             "website": "https://www.firstgenerationfoundation.org"},
            
            # Specialized field scholarships
            {"id": 20, "name": "Tylenol Future Care Scholarship", "amount": 10000, 
             "organization": "Tylenol", 
             "requirements": {"min_gpa": 2.5, "education": ["undergraduate", "graduate"], "majors": ["healthcare", "medicine", "nursing"]}, 
             "deadline": "Jun 30, 2026", "available": True,
             "description": "The Tylenol Future Care Scholarship is awarded to students pursuing careers in healthcare.",
             "website": "https://www.tylenol.com/scholarship"},
            
            # Military scholarships
            {"id": 21, "name": "AMVETS Scholarships", "amount": 4000, 
             "organization": "American Veterans", 
             "requirements": {"min_gpa": 3.0, "education": ["undergraduate", "graduate"], "military": True}, 
             "deadline": "Apr 30, 2026", "available": True,
             "description": "AMVETS offers scholarships to veterans, active duty military, their sons, daughters, or grandchildren.",
             "website": "https://amvets.org/scholarships"},
            
            # Graduate scholarships
            {"id": 22, "name": "Ford Foundation Fellowship Program", "amount": 27000, 
             "organization": "Ford Foundation", 
             "requirements": {"education": ["phd"]}, 
             "deadline": "Dec 17, 2025", "available": True,
             "description": "The Ford Foundation Fellowship Programs aim to increase the diversity of the nation's college and university faculties.",
             "website": "https://sites.nationalacademies.org/PGA/FordFellowships"},
            
            # Community service scholarships
            {"id": 23, "name": "Prudential Spirit of Community Award", "amount": 5000, 
             "organization": "Prudential Financial", 
             "requirements": {"education": ["high_school"], "community_service": True}, 
             "deadline": "Nov 5, 2025", "available": True,
             "description": "The Prudential Spirit of Community Awards program is the United States' largest youth recognition program based exclusively on volunteer community service.",
             "website": "https://spirit.prudential.com"},
            
            # Special interest scholarships
            {"id": 24, "name": "Vegetarian Resource Group Scholarship", "amount": 10000, 
             "organization": "The Vegetarian Resource Group", 
             "requirements": {"education": ["high_school"], "vegetarian": True}, 
             "deadline": "Feb 20, 2026", "available": True,
             "description": "The Vegetarian Resource Group (VRG) annually awards scholarships to graduating U.S. high school students who have promoted vegetarianism in their schools and communities.",
             "website": "https://www.vrg.org/student/scholar.htm"},
            
            # Coming soon / not yet available scholarships
            {"id": 25, "name": "Ron Brown Scholar Program", "amount": 40000, 
             "organization": "Ron Brown Scholar Fund", 
             "requirements": {"min_gpa": 3.0, "education": ["undergraduate"], "ethnicity": ["black"]}, 
             "deadline": "Jan 9, 2026", "available": False, "opens": "Sep 1, 2025",
             "description": "The Ron Brown Scholar Program seeks to identify African-American high school seniors who will make significant contributions to society.",
             "website": "https://www.ronbrown.org"},
            
            {"id": 26, "name": "Buick Achievers Scholarship", "amount": 25000, 
             "organization": "General Motors Foundation", 
             "requirements": {"min_gpa": 3.0, "education": ["undergraduate"], "majors": ["engineering", "technology", "business"]}, 
             "deadline": "Feb 29, 2026", "available": False, "opens": "Dec 1, 2025",
             "description": "The Buick Achievers Scholarship Program is designed to help students who are leaders in both the classroom and their communities, but who may not have the financial means to attend college.",
             "website": "https://www.buickachievers.com"},
            
            {"id": 27, "name": "Davidson Fellows Scholarship", "amount": 50000, 
             "organization": "Davidson Institute", 
             "requirements": {"education": ["high_school"], "project": True}, 
             "deadline": "Feb 12, 2026", "available": False, "opens": "Nov 1, 2025",
             "description": "The Davidson Fellows Scholarship awards scholarships to extraordinary young people who have completed a significant piece of work.",
             "website": "https://www.davidsongifted.org/fellows-scholarship"},
            
            {"id": 28, "name": "Udall Undergraduate Scholarship", "amount": 7000, 
             "organization": "Udall Foundation", 
             "requirements": {"education": ["undergraduate"], "environment": True}, 
             "deadline": "Mar 5, 2026", "available": False, "opens": "Oct 1, 2025",
             "description": "The Udall Undergraduate Scholarship is awarded to college sophomores and juniors for leadership, public service, and commitment to issues related to Native American nations or to the environment.",
             "website": "https://www.udall.gov/OurPrograms/Scholarship/Scholarship.aspx"},
            
            {"id": 29, "name": "Horatio Alger Scholarship", "amount": 25000, 
             "organization": "Horatio Alger Association", 
             "requirements": {"min_gpa": 2.0, "education": ["undergraduate"], "income": ["low", "med-low"], "hardship": True}, 
             "deadline": "Oct 25, 2025", "available": False, "opens": "Aug 1, 2025",
             "description": "The Horatio Alger Scholarship Programs specifically assist high school students who have faced and overcome great obstacles in their young lives.",
             "website": "https://scholars.horatioalger.org"},
            
            {"id": 30, "name": "Thiel Fellowship", "amount": 100000, 
             "organization": "Thiel Foundation", 
             "requirements": {"age": "under 23", "entrepreneur": True}, 
             "deadline": "Dec 31, 2025", "available": False, "opens": "Sep 30, 2025",
             "description": "The Thiel Fellowship gives $100,000 to young people who want to build new things instead of sitting in a classroom.",
             "website": "https://thielfellowship.org"}
        ]
        with open(SCHOLARSHIPS_FILE, 'w') as f:
            json.dump(default_scholarships, f, indent=2)
        return default_scholarships
    
    with open(SCHOLARSHIPS_FILE, 'r') as f:
        return json.load(f)

def load_applications():
    """Load applications from JSON file or create empty list if doesn't exist"""
    if not os.path.exists(APPLICATIONS_FILE):
        with open(APPLICATIONS_FILE, 'w') as f:
            json.dump([], f)
        return []
    
    with open(APPLICATIONS_FILE, 'r') as f:
        return json.load(f)

def save_applications(applications):
    """Save applications to JSON file"""
    with open(APPLICATIONS_FILE, 'w') as f:
        json.dump(applications, f, indent=2)

def send_confirmation_email(email, name, scholarships):
    """Send confirmation email to the user"""
    try:
        msg = MIMEMultipart()
        msg['From'] = EMAIL_USER
        msg['To'] = email
        msg['Subject'] = "Your Scholarship Applications - Confirmation"
        
        # Email body
        body = f"""
        Hello {name},
        
        Thank you for using Scholarship.ai! We've submitted your applications to the following scholarships:
        
        """
        
        for scholarship in scholarships:
            body += f"- {scholarship['name']} (${scholarship['amount']})\n"
            
        body += f"""
        
        Total potential scholarship amount: ${sum(s['amount'] for s in scholarships):,}
        
        We'll notify you of any updates regarding your applications.
        
        Best regards,
        The Scholarship.ai Team
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # For demo purposes, we'll just print instead of actually sending
        print(f"Would send email to {email} with subject: {msg['Subject']}")
        print("Email body:")
        print(body)
        
        # In a real app, uncomment this code to actually send emails:
        """
        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        text = msg.as_string()
        server.sendmail(EMAIL_USER, email, text)
        server.quit()
        """
        
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    # In a real app, you would save this to a database or send an email
    print(f"Contact form submission: {data}")
    return jsonify({"success": True})

@app.route('/api/submit-scholarships', methods=['POST'])
def submit_scholarships():
    user_data = request.json
    
    # Load available scholarships
    scholarships = load_scholarships()
    
    # Find matching scholarships
    matching_scholarships = []
    for scholarship in scholarships:
        # Skip if not available
        if not scholarship.get('available', True):
            continue
            
        # Check requirements
        requirements = scholarship.get('requirements', {})
        
        # Check GPA
        min_gpa = requirements.get('min_gpa', 0)
        if float(user_data.get('gpa', 0)) < min_gpa:
            continue
            
        # Check education level
        education_levels = requirements.get('education', [])
        if education_levels and user_data.get('education') not in education_levels:
            continue
            
        # Check major if specified
        major_requirements = requirements.get('majors', [])
        if major_requirements:
            user_major = user_data.get('major', '').lower()
            if not any(req in user_major.lower() for req in major_requirements):
                continue
                
        # Check state if specified
        state_requirement = requirements.get('state')
        if state_requirement and user_data.get('state') != state_requirement:
            continue
                
        # Check ethnicity if specified
        ethnicity_requirements = requirements.get('ethnicity', [])
        if ethnicity_requirements and user_data.get('ethnicity') not in ethnicity_requirements:
            continue
            
        # Check income if specified
        income_requirements = requirements.get('income', [])
        if income_requirements and user_data.get('income') not in income_requirements:
            continue
            
        # Add to matching scholarships with organization name
        matching_scholarships.append({
            "id": scholarship['id'],
            "name": scholarship['name'],
            "amount": scholarship['amount'],
            "organization": scholarship.get('organization', 'Unknown'),
            "deadline": scholarship.get('deadline', 'N/A'),
            "status": "Applied",
            "description": scholarship.get('description', ''),
            "website": scholarship.get('website', '')
        })
    
    # Sort by amount (highest first) and limit to 20
    matching_scholarships.sort(key=lambda x: x['amount'], reverse=True)
    matching_scholarships = matching_scholarships[:20]
    
    # Get unavailable scholarships for future reference
    unavailable_scholarships = [
        {
            "id": s['id'],
            "name": s['name'],
            "amount": s['amount'],
            "organization": s.get('organization', 'Unknown'),
            "deadline": s.get('deadline', 'N/A'),
            "status": f"Not Available Yet (Opens {s.get('opens', 'soon')})",
            "description": s.get('description', ''),
            "website": s.get('website', '')
        }
        for s in scholarships
        if not s.get('available', True)
    ]
    
    # Sort by amount and limit to 5
    unavailable_scholarships.sort(key=lambda x: x['amount'], reverse=True)
    unavailable_scholarships = unavailable_scholarships[:5]
    
    # Combine the results (applied first, then unavailable)
    result_scholarships = matching_scholarships + unavailable_scholarships
    
    # Save the application
    applications = load_applications()
    applications.append({
        "user": user_data,
        "scholarships": matching_scholarships,
        "date": datetime.now().isoformat()
    })
    save_applications(applications)
    
    # Send confirmation email
    send_confirmation_email(
        user_data['email'], 
        user_data['fullName'], 
        matching_scholarships
    )
    
    return jsonify({
        "success": True,
        "scholarships": result_scholarships
    })