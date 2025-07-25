new Vue({
  el: '#app',
  data: {
    // Authentication
    showLoginForm: false,
    showSignupForm: false,
    loginData: {
      email: '',
      password: ''
    },
    signupData: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
    },
    
    // Application flow
    showApplicationFlow: false,
    applicationStep: 1,
    applicationProgress: 20,
    applicationProgressText: 'Step 1 of 5: Personal Information',
    
    // Comprehensive application data
    applicationData: {
      fullName: '',
      email: '',
      dob: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      ethnicity: '',
      gender: '',
      
      education: {
        level: '',
        schoolName: '',
        major: '',
        minor: '',
        gpa: '',
        classRank: '',
        graduationDate: '',
        careerGoals: ''
      },
      
      activities: [
        { name: '', role: '', description: '', years: '' }
      ],
      
      leadership: [
        { role: '', organization: '', description: '', years: '' }
      ],
      
      projects: [
        { name: '', description: '', skills: '', url: '' }
      ],
      
      skills: '',
      languages: '',
      certifications: '',
      
      awards: [
        { name: '', issuer: '', date: '', description: '' }
      ],
      
      financialInfo: {
        income: '',
        fafsa: '',
        firstGeneration: '',
        dependents: 0
      },
      
      essays: {
        personalStatement: '',
        challenge: '',
        goals: '',
        community: ''
      }
    },
    
    scholarshipData: {
      fullName: '',
      email: '',
      address: '',  // Added address field
      city: '',     // Added city field
      education: '',
      major: '',
      gpa: '',
      state: '',
      ethnicity: '',
      income: ''
    },
    
    // Matched scholarships
    matchedScholarships: [],
    totalScholarshipAmount: 0,
    selectedScholarshipsCount: 0,
    
    // US States
    usStates: [
      'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 
      'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 
      'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 
      'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 
      'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 
      'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 
      'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 
      'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
      'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 
      'West Virginia', 'Wisconsin', 'Wyoming'
    ]
  },
  
  methods: {
    // Authentication methods
    login() {
      // Simple login functionality for demo
      alert('Login successful!');
      this.showLoginForm = false;
    },
    
    signup() {
      if (this.signupData.password !== this.signupData.passwordConfirm) {
        alert('Passwords do not match!');
        return;
      }
      alert('Account created successfully!');
      this.showSignupForm = false;
    },
    
    // Application flow navigation
    nextStep() {
      if (this.applicationStep < 6) {
        this.applicationStep++;
        this.updateProgress();
        window.scrollTo(0, 0);
      }
      
      // If we've reached the final step, generate scholarship matches
      if (this.applicationStep === 6) {
        this.generateScholarshipMatches();
      }
    },
    
    prevStep() {
      if (this.applicationStep > 1) {
        this.applicationStep--;
        this.updateProgress();
        window.scrollTo(0, 0);
      }
    },
    
    // Update progress bar and text
    updateProgress() {
      const stepPercentages = [20, 40, 60, 80, 100, 100];
      const stepTexts = [
        'Step 1 of 5: Personal Information',
        'Step 2 of 5: Education',
        'Step 3 of 5: Achievements & Activities',
        'Step 4 of 5: Skills & Financial',
        'Step 5 of 5: Essay Questions',
        'Complete: Matching Scholarships'
      ];
      
      this.applicationProgress = stepPercentages[this.applicationStep - 1];
      this.applicationProgressText = stepTexts[this.applicationStep - 1];
    },
    
    // Helper methods for form manipulation
    addActivity() {
      this.applicationData.activities.push({ name: '', role: '', description: '', years: '' });
    },
    
    removeActivity(index) {
      this.applicationData.activities.splice(index, 1);
    },
    
    addLeadership() {
      this.applicationData.leadership.push({ role: '', organization: '', description: '', years: '' });
    },
    
    removeLeadership(index) {
      this.applicationData.leadership.splice(index, 1);
    },
    
    addProject() {
      this.applicationData.projects.push({ name: '', description: '', skills: '', url: '' });
    },
    
    removeProject(index) {
      this.applicationData.projects.splice(index, 1);
    },
    
    addAward() {
      this.applicationData.awards.push({ name: '', issuer: '', date: '', description: '' });
    },
    
    removeAward(index) {
      this.applicationData.awards.splice(index, 1);
    },
    
    // Count words in essays
    countWords(text) {
      return text ? text.split(/\s+/).filter(word => word.length > 0).length : 0;
    },
    
    // Generate scholarship matches with real images
    generateScholarshipMatches() {
      const scholarshipImages = [
        'images/scholarships/stem-scholarship.jpg',
        'images/scholarships/business-scholarship.jpg',
        'images/scholarships/arts-scholarship.jpg',
        'images/scholarships/engineering-scholarship.jpg',
        'images/scholarships/healthcare-scholarship.jpg',
        'images/scholarships/leadership-scholarship.jpg',
        'images/scholarships/community-scholarship.jpg',
        'images/scholarships/international-scholarship.jpg',
        'images/scholarships/education-scholarship.jpg',
        'images/scholarships/technology-scholarship.jpg'
      ];
      
      // Generate 15-20 matching scholarships with various match percentages
      const scholarshipCount = Math.floor(Math.random() * 6) + 15; // 15-20 scholarships
      const mockScholarships = [];
      let totalAmount = 0;
      
      for (let i = 0; i < scholarshipCount; i++) {
        // Create somewhat realistic scholarship data based on user profile
        const matchScore = Math.floor(Math.random() * 30) + 70; // 70-99% match
        const amount = [1000, 2500, 5000, 7500, 10000, 12500, 15000, 20000, 25000, 30000][Math.floor(Math.random() * 10)];
        
        totalAmount += amount;
        
        // Use an image from our array (cycling through them)
        const imageIndex = i % scholarshipImages.length;
        
        // Generate a scholarship that somewhat matches the user's profile
        const scholarship = {
          id: i + 1,
          name: this.generateScholarshipName(this.applicationData.education.major),
          amount: amount,
          organization: this.generateOrganizationName(),
          deadline: this.generateDeadline(),
          matchScore: matchScore,
          description: this.generateScholarshipDescription(this.applicationData.education.major),
          requirements: this.generateRequirements(this.applicationData.education.gpa),
          status: 'Not Applied',
          selected: false,
          image: scholarshipImages[imageIndex]
        };
        
        mockScholarships.push(scholarship);
      }
      
      // Sort by match score (highest first)
      mockScholarships.sort((a, b) => b.matchScore - a.matchScore);
      
      this.matchedScholarships = mockScholarships;
      this.totalScholarshipAmount = totalAmount;
      this.selectedScholarshipsCount = 0;
    },
    
    // Helper methods for generating realistic scholarship data
    generateScholarshipName(major) {
      const prefixes = [
        "Excellence in", "Future Leaders in", "Innovation", "Achievement", "Merit", 
        "Heritage", "Community", "Global", "Emerging", "Visionary"
      ];
      
      const fields = [
        "STEM", "Arts", "Humanities", "Business", "Leadership", 
        "Technology", "Science", "Engineering", "Healthcare", "Education"
      ];
      
      const suffixes = [
        "Scholarship", "Award", "Fellowship", "Grant", "Foundation Award", 
        "Fund", "Opportunity Grant", "Achievement Award", "Scholar Program", "Excellence Award"
      ];
      
      // Try to match with the user's major if provided
      let field = fields[Math.floor(Math.random() * fields.length)];
      if (major) {
        if (major.toLowerCase().includes('computer') || major.toLowerCase().includes('tech')) field = "Technology";
        if (major.toLowerCase().includes('engineer')) field = "Engineering";
        if (major.toLowerCase().includes('art') || major.toLowerCase().includes('design')) field = "Arts";
        if (major.toLowerCase().includes('business') || major.toLowerCase().includes('finance')) field = "Business";
        if (major.toLowerCase().includes('health') || major.toLowerCase().includes('med')) field = "Healthcare";
        if (major.toLowerCase().includes('edu')) field = "Education";
      }
      
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      
      return `${prefix} ${field} ${suffix}`;
    },
    
    generateOrganizationName() {
      const prefixes = [
        "National", "American", "International", "Global", "United", 
        "Universal", "Worldwide", "Regional", "Progressive", "Heritage"
      ];
      
      const mids = [
        "Education", "Academic", "Scholarship", "Achievement", "Excellence", 
        "Leadership", "Future", "Community", "Innovation", "Development"
      ];
      
      const suffixes = [
        "Foundation", "Association", "Society", "Fund", "Institute", 
        "Organization", "Alliance", "Council", "Trust", "Cooperative"
      ];
      
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const mid = mids[Math.floor(Math.random() * mids.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      
      return `${prefix} ${mid} ${suffix}`;
    },
    
    generateDeadline() {
      // Generate a deadline between 1-6 months from now
      const today = new Date();
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monthsAhead = Math.floor(Math.random() * 6) + 1;
      
      let futureDate = new Date(today);
      futureDate.setMonth(today.getMonth() + monthsAhead);
      
      const day = Math.floor(Math.random() * 28) + 1; // Avoid invalid dates
      futureDate.setDate(day);
      
      return `${months[futureDate.getMonth()]} ${futureDate.getDate()}, ${futureDate.getFullYear()}`;
    },
    
    generateScholarshipDescription(major) {
      const descriptions = [
        `This scholarship supports outstanding students pursuing degrees in various fields with demonstrated academic excellence.`,
        `Awarded to students who demonstrate exceptional promise in their field of study and commitment to community service.`,
        `For students with strong academic records and leadership potential who are seeking to make a positive impact in their communities.`,
        `Recognizing exceptional students who have demonstrated innovation, creativity, and dedication to their academic pursuits.`,
        `Supporting the next generation of leaders who show promise in addressing global challenges through their chosen field.`
      ];
      
      // Add major-specific text if provided
      if (major) {
        return `${descriptions[Math.floor(Math.random() * descriptions.length)]} Particularly focused on students in ${major} and related fields.`;
      }
      
      return descriptions[Math.floor(Math.random() * descriptions.length)];
    },
    
    generateRequirements(gpa) {
      // Generate requirements that the user meets (if they provided a GPA)
      const minGpa = gpa ? (Math.floor(parseFloat(gpa) * 10) / 10 - 0.2).toFixed(1) : "3.0";
      
      const requirements = [
        `Minimum GPA of ${minGpa}, full-time enrollment, and U.S. citizenship or permanent residency.`,
        `${minGpa} GPA or higher, demonstrated leadership experience, and community involvement.`,
        `Must maintain a ${minGpa} GPA and be enrolled in an accredited institution.`,
        `Open to students with at least a ${minGpa} GPA who can demonstrate financial need.`,
        `Requires ${minGpa}+ GPA, essay submission, and proof of enrollment in an accredited program.`
      ];
      
      return requirements[Math.floor(Math.random() * requirements.length)];
    },
    
    // Toggle scholarship selection
    toggleScholarship(index) {
      this.matchedScholarships[index].selected = !this.matchedScholarships[index].selected;
      this.selectedScholarshipsCount = this.matchedScholarships.filter(s => s.selected).length;
    },
    
    // Submit selected scholarships
    submitSelectedScholarships() {
      if (this.selectedScholarshipsCount === 0) {
        return;
      }
      
      // Show loading state
      const submitButton = document.querySelector('.submit-selections button');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = "Submitting Applications...";
      submitButton.disabled = true;
      
      // Simulate API call with timeout
      setTimeout(() => {
        // Mark selected scholarships as applied
        this.matchedScholarships.forEach(scholarship => {
          if (scholarship.selected) {
            scholarship.status = 'Applied';
          }
        });
        
        // Show success message with more details
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message fade-in';
        successMessage.innerHTML = `
          <div class="success-content">
            <div class="success-icon">✓</div>
            <h3>Applications Submitted!</h3>
            <p>Your applications have been submitted to ${this.selectedScholarshipsCount} scholarships worth up to ${this.totalScholarshipAmount}.</p>
            <p>You'll receive email confirmations and updates about your applications.</p>
            <div class="success-links">
              <p><small>For additional information, visit these scholarship websites:</small></p>
              <ul>
                ${this.matchedScholarships.filter(s => s.selected).map(s => 
                  `<li><a href="${s.website}" target="_blank">${s.organization}</a></li>`
                ).join('')}
              </ul>
            </div>
          </div>
        `;
        
        document.body.appendChild(successMessage);
        
        // Update the UI
        document.querySelector('.scholarship-results-header h3').textContent = 
          `Your Applications (${this.selectedScholarshipsCount})`;
        
        // Reset selection count
        this.selectedScholarshipsCount = 0;
        
        // Remove success message after 8 seconds (longer to allow reading the links)
        setTimeout(() => {
          successMessage.remove();
        }, 8000);
        
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      }, 2000);
    },
    
    // Contact form submission
    submitContactForm() {
      // Show loading state
      const submitButton = document.querySelector('#contact button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      // Send form data to your email service
      fetch('https://formsubmit.co/your-email@example.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: this.contactData.name,
          email: this.contactData.email,
          message: this.contactData.message
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.innerHTML = `
          <div class="success-content">
            <div class="success-icon">✓</div>
            <h3>Message Sent!</h3>
            <p>Thank you for reaching out. We'll get back to you soon.</p>
          </div>
        `;
        
        const formCard = document.querySelector('#contact .card');
        formCard.parentNode.insertBefore(successMsg, formCard.nextSibling);
        
        // Reset form
        this.contactData = {
          name: '',
          email: '',
          message: ''
        };
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Remove success message after delay
        setTimeout(() => {
          successMsg.remove();
        }, 5000);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again.');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      });
    },
    
    // Update the scholarship search functionality with real scholarships

    submitScholarshipForm() {
      // Show loading state
      const submitButton = document.querySelector('#scholarships button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = "Processing...";
      submitButton.disabled = true;
      
      // Simulate API call with timeout
      setTimeout(() => {
        // Create real scholarship results (unchanged)
        this.scholarshipResults = [
          {
            id: 1,
            name: "The Gates Scholarship",
            amount: 20000,
            organization: "Bill & Melinda Gates Foundation",
            deadline: "September 15, 2025",
            status: "Match",
            description: "For exceptional high school seniors from minority backgrounds with financial need, seeking a full-time bachelor's degree.",
            website: "https://www.thegatesscholarship.org/scholarship"
          },
          {
            id: 2,
            name: "Hispanic Scholarship Fund",
            amount: 5000,
            organization: "Hispanic Scholarship Fund",
            deadline: "February 15, 2026",
            status: "Match",
            description: "For students of Hispanic heritage with a minimum 3.0 GPA pursuing higher education.",
            website: "https://www.hsf.net/scholarship"
          },
          {
            id: 3,
            name: "Coca-Cola Scholars Program",
            amount: 20000,
            organization: "The Coca-Cola Foundation",
            deadline: "October 31, 2025",
            status: "Match",
            description: "For high achieving high school seniors with a focus on leadership, service, and civic engagement.",
            website: "https://www.coca-colascholarsfoundation.org/apply/"
          },
          {
            id: 4,
            name: "Jack Kent Cooke Foundation Scholarship",
            amount: 55000,
            organization: "Jack Kent Cooke Foundation",
            deadline: "November 18, 2025",
            status: "Match",
            description: "For high-achieving students with financial need seeking to attend the nation's best colleges and universities.",
            website: "https://www.jkcf.org/our-scholarships/"
          },
          {
            id: 5,
            name: "Questbridge National College Match",
            amount: "Full Ride",
            organization: "Questbridge",
            deadline: "September 27, 2025",
            status: "Match",
            description: "Connects high-achieving students from low-income backgrounds with full scholarships to top colleges.",
            website: "https://www.questbridge.org/high-school-students/national-college-match"
          },
          {
            id: 6,
            name: "Horatio Alger Association Scholarships",
            amount: 25000,
            organization: "Horatio Alger Association",
            deadline: "October 25, 2025",
            status: "Match",
            description: "For students who have overcome significant adversity while demonstrating strength of character and academic potential.",
            website: "https://scholars.horatioalger.org/scholarships/"
          },
          {
            id: 7,
            name: "Dell Scholars Program",
            amount: 20000,
            organization: "Michael & Susan Dell Foundation",
            deadline: "December 1, 2025",
            status: "Match",
            description: "Recognizes students who have overcome significant obstacles to pursue their education and demonstrated grit, potential, and ambition.",
            website: "https://www.dellscholars.org/scholarship/"
          },
          {
            id: 8,
            name: "Thurgood Marshall College Fund",
            amount: 15000,
            organization: "Thurgood Marshall College Fund",
            deadline: "January 10, 2026",
            status: "Match",
            description: "For students attending Historically Black Colleges and Universities (HBCUs) who demonstrate leadership and financial need.",
            website: "https://www.tmcf.org/students-alumni/scholarship/"
          },
          {
            id: 9,
            name: "Ron Brown Scholar Program",
            amount: 40000,
            organization: "Ron Brown Scholar Program",
            deadline: "January 9, 2026",
            status: "Match",
            description: "For African American high school seniors who excel academically and demonstrate leadership and social commitment.",
            website: "https://www.ronbrown.org/section/apply/program-description"
          },
          {
            id: 10,
            name: "STEM Scholarships for Minorities",
            amount: 10000,
            organization: "National Action Council for Minorities in Engineering (NACME)",
            deadline: "March 15, 2026",
            status: "Match",
            description: "For underrepresented minority students pursuing degrees in STEM fields at partner institutions.",
            website: "https://www.nacme.org/scholarships"
          },
          {
            id: 11,
            name: "United Negro College Fund Scholarships",
            amount: "Varies",
            organization: "UNCF",
            deadline: "Multiple Dates",
            status: "Match",
            description: "Various scholarship opportunities for minority students with financial need attending UNCF member colleges or other institutions.",
            website: "https://uncf.org/scholarships"
          },
          {
            id: 12,
            name: "APIASF General Scholarship Program",
            amount: "2,500-15,000",
            organization: "Asian & Pacific Islander American Scholarship Fund",
            deadline: "January 18, 2026",
            status: "Match",
            description: "For Asian American and Pacific Islander students with emphasis on first-generation college students and those from low-income backgrounds.",
            website: "https://apiascholars.org/scholarship/apia-scholarship/"
          },
          {
            id: 13,
            name: "American Indian Graduate Center Scholarships",
            amount: "Varies",
            organization: "American Indian Graduate Center",
            deadline: "Multiple Dates",
            status: "Match",
            description: "For Native American and Alaska Native students pursuing undergraduate, graduate, and professional degrees.",
            website: "https://www.aigcs.org/scholarships-fellowships/"
          },
          {
            id: 14,
            name: "TheDream.US National Scholarship",
            amount: 33000,
            organization: "TheDream.US",
            deadline: "February 28, 2026",
            status: "Match",
            description: "For DREAMers (undocumented students with DACA or TPS status) who demonstrate significant financial need.",
            website: "https://www.thedream.us/scholarships/national-scholarship/"
          },
          {
            id: 15,
            name: "Point Foundation Scholarship",
            amount: "Up to 10,000",
            organization: "Point Foundation",
            deadline: "January 25, 2026",
            status: "Match",
            description: "For LGBTQ+ students who demonstrate academic excellence, leadership, and financial need.",
            website: "https://pointfoundation.org/point-apply/apply-now/"
          },
          {
            id: 16,
            name: "Daughters of the American Revolution Scholarships",
            amount: "Varies",
            organization: "DAR",
            deadline: "January 31, 2026",
            status: "Match",
            description: "Multiple scholarships for students in various fields of study based on academic achievement and financial need.",
            website: "https://www.dar.org/national-society/scholarships"
          },
          {
            id: 17,
            name: "Elks National Foundation Most Valuable Student Competition",
            amount: "4,000-50,000",
            organization: "Elks National Foundation",
            deadline: "November 14, 2025",
            status: "Match",
            description: "For high school seniors based on academics, leadership, service, and financial need.",
            website: "https://www.elks.org/scholars/scholarships/MVS.cfm"
          },
          {
            id: 18,
            name: "Jackie Robinson Foundation Scholarship",
            amount: 30000,
            organization: "Jackie Robinson Foundation",
            deadline: "January 12, 2026",
            status: "Match",
            description: "For minority high school students showing leadership potential and financial need.",
            website: "https://www.jackierobinson.org/apply/"
          },
          {
            id: 19,
            name: "Jeannette Rankin Women's Scholarship Fund",
            amount: 10000,
            organization: "Jeannette Rankin Foundation",
            deadline: "February 26, 2026",
            status: "Match",
            description: "For low-income women ages 35 and older who are pursuing technical/vocational education, associate's or bachelor's degrees.",
            website: "https://rankinfoundation.org/apply-for-scholarships/"
          },
          {
            id: 20,
            name: "Davis-Putter Scholarship Fund",
            amount: 15000,
            organization: "Davis-Putter Scholarship Fund",
            deadline: "April 1, 2026",
            status: "Match",
            description: "For students actively working for peace and justice who demonstrate financial need.",
            website: "https://davisputter.org/apply-for-scholarships/"
          }
        ];
        
        // Calculate total potential funding
        this.totalScholarshipAmount = this.scholarshipResults.reduce((total, scholarship) => {
          // Handle non-numeric amounts like "Full Ride" or "Varies"
          if (typeof scholarship.amount === 'number') {
            return total + scholarship.amount;
          }
          // For "Varies" or other text values, estimate a conservative amount
          return total + 5000; // Conservative estimate for non-specific amounts
        }, 0);
        
        // Format as currency
        this.totalScholarshipAmount = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0
        }).format(this.totalScholarshipAmount);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message fade-in';
        successMessage.innerHTML = `
          <div class="success-content">
            <div class="success-icon">✓</div>
            <h3>Applications Submitted!</h3>
            <p>We've successfully submitted your profile to 20 matching scholarships totaling $22,500 in potential funding.</p>
            <p>Scroll down to see the details of your applications.</p>
          </div>
        `;
        
        // Insert success message after the form
        const formCard = document.querySelector('#scholarships .card');
        formCard.parentNode.insertBefore(successMessage, formCard.nextSibling);
        
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        
        // Scroll to results
        setTimeout(() => {
          document.querySelector('#scholarships .mt-8').scrollIntoView({behavior: 'smooth'});
        }, 1000);
        
        // Show special thank you message for demo purposes
        setTimeout(() => {
          const demoMessage = document.createElement('div');
          demoMessage.className = 'modal-overlay';
          demoMessage.style.zIndex = '2000';
          demoMessage.innerHTML = `
            <div class="modal border-gradient" style="max-width: 550px; text-align: center;">
              <h3 class="modal-title" style="margin-bottom: 1rem;">Thank You for Viewing My Front-End Application Demo!</h3>
              <div style="margin-bottom: 1.5rem;">
                <div class="success-icon" style="margin: 0 auto 1.5rem;">🎓</div>
                <p style="font-size: 1.1rem; margin-bottom: 1rem;">I hope you enjoyed this demonstration of my front-end development skills.</p>
                <p>I'm passionate about creating intuitive user experiences and look forward to expanding my knowledge to become a full-stack developer!</p>
              </div>
              <button class="btn-primary" style="padding: 0.75rem 2rem;" onclick="this.parentNode.parentNode.remove()">Close</button>
            </div>
          `;
          document.body.appendChild(demoMessage);
        }, 3000);
      }, 2000);
    },
    
    // Update the startApplicationFlow method to include real scholarships

    startApplicationFlow() {
      this.showApplicationFlow = true;
      this.applicationStep = 1;
      this.updateApplicationProgress();
      
      // Scroll to top of application
      window.scrollTo(0, 0);
      
      // Disable body scrolling
      document.body.style.overflow = 'hidden';
      
      // Pre-populate with any existing data
      if (this.scholarshipData.fullName) {
        this.applicationData.fullName = this.scholarshipData.fullName;
      }
      
      if (this.scholarshipData.email) {
        this.applicationData.email = this.scholarshipData.email;
      }
    },
    
    finalizeApplication() {
      this.applicationStep = 6;
      this.applicationProgress = 100;
      this.applicationProgressText = 'Application Complete';
      
      // Generate matched scholarships based on user profile
      this.matchedScholarships = [
        {
          id: 1,
          name: "The Gates Scholarship",
          amount: 20000,
          deadline: "September 15, 2025",
          organization: "Bill & Melinda Gates Foundation",
          description: "For exceptional high school seniors from minority backgrounds with financial need.",
          logo: "https://www.thegatesscholarship.org/assets/images/logo.png",
          match: 98,
          selected: true,
          website: "https://www.thegatesscholarship.org/scholarship"
        },
        {
          id: 2,
          name: "Hispanic Scholarship Fund",
          amount: 5000,
          deadline: "February 15, 2026",
          organization: "Hispanic Scholarship Fund",
          description: "For students of Hispanic heritage with a minimum 3.0 GPA.",
          logo: "https://www.hsf.net/images/default-source/default-album/hsf-logo.png",
          match: 95,
          selected: true,
          website: "https://www.hsf.net/scholarship"
        },
        {
          id: 3,
          name: "Coca-Cola Scholars Program",
          amount: 20000,
          deadline: "October 31, 2025",
          organization: "The Coca-Cola Foundation",
          description: "For high achieving students with a focus on leadership and service.",
          logo: "https://www.coca-colascholarsfoundation.org/wp-content/themes/ccsf/assets/images/logo_ccsf.png",
          match: 92,
          selected: true,
          website: "https://www.coca-colascholarsfoundation.org/apply/"
        },
        {
          id: 4,
          name: "Jack Kent Cooke Foundation Scholarship",
          amount: 55000,
          deadline: "November 18, 2025",
          organization: "Jack Kent Cooke Foundation",
          description: "For high-achieving students with financial need.",
          logo: "https://www.jkcf.org/wp-content/themes/jkcf2019/assets/images/jkcf-logo.svg",
          match: 90,
          selected: true,
          website: "https://www.jkcf.org/our-scholarships/"
        },
        {
          id: 5,
          name: "Questbridge National College Match",
          amount: 200000,
          deadline: "September 27, 2025",
          organization: "Questbridge",
          description: "Full four-year scholarships to top colleges for low-income students.",
          logo: "https://www.questbridge.org/sites/all/themes/questbridge/logo.png",
          match: 89,
          selected: true,
          website: "https://www.questbridge.org/high-school-students/national-college-match"
        }
      ];
      
      // Set initial count of selected scholarships
      this.selectedScholarshipsCount = this.matchedScholarships.filter(s => s.selected).length;
      
      // Calculate total potential scholarship amount
      this.totalScholarshipAmount = this.matchedScholarships.reduce((total, scholarship) => {
        return scholarship.selected ? total + scholarship.amount : total;
      }, 0);
      
      // Format as currency
      this.totalScholarshipAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(this.totalScholarshipAmount);
    }
  }
});