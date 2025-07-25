// filepath: /home/lstpr4/Desktop/scholarship.ai/app.js

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
    
    // Contact form
    contactData: {
      name: '',
      email: '',
      message: ''
    },
    
    // Scholarship form
    scholarshipData: {
      fullName: '',
      email: '',
      education: '',
      major: '',
      gpa: '',
      state: '',
      ethnicity: '',
      income: ''
    },
    
    // Scholarship results
    scholarshipResults: [],
    
    // US States for dropdown
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
    ],
    
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
      phone: '',
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
    
    // Matched scholarships
    matchedScholarships: [],
    totalScholarshipAmount: 0,
    selectedScholarshipsCount: 0,
    
    // Chatbot data
    showChatbot: false,
    userMessage: '',
    chatMessages: []
  },
  
  methods: {
    // Navigation
    scrollToScholarshipForm() {
      document.getElementById('scholarships').scrollIntoView({
        behavior: 'smooth'
      });
    },
    
    // Authentication methods
    login() {
      // Add validation
      if (!this.loginData.email || !this.loginData.password) {
        alert("Please fill in all fields");
        return;
      }
      
      // Show loading state
      const submitButton = document.querySelector('.modal form button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = "Logging in...";
      submitButton.disabled = true;
      
      // Simulate login with timeout
      setTimeout(() => {
        // In a real app, this would be an API call
        console.log('Login attempt with:', this.loginData.email);
        
        // For demo, we'll accept any login
        // Create welcome message
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'success-message fade-in';
        welcomeMessage.innerHTML = `
          <div class="success-content">
            <div class="success-icon">✓</div>
            <h3>Welcome Back!</h3>
            <p>You've successfully logged in to your EduFund account.</p>
          </div>
        `;
        
        // Close modal
        this.showLoginForm = false;
        
        // Show welcome message
        document.body.appendChild(welcomeMessage);
        
        // Remove welcome message after 3 seconds
        setTimeout(() => {
          welcomeMessage.remove();
        }, 3000);
        
        // Reset form data
        this.loginData = {
          email: '',
          password: ''
        };
        
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        
      }, 1500);
    },
    
    signup() {
      // Add validation
      if (!this.signupData.name || !this.signupData.email || !this.signupData.password || !this.signupData.passwordConfirm) {
        alert("Please fill in all fields");
        return;
      }
      
      // Check if passwords match
      if (this.signupData.password !== this.signupData.passwordConfirm) {
        alert("Passwords do not match");
        return;
      }
      
      // Show loading state
      const submitButton = document.querySelector('.modal form button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = "Creating account...";
      submitButton.disabled = true;
      
      // Simulate signup with timeout
      setTimeout(() => {
        // In a real app, this would be an API call
        console.log('Sign up attempt with:', this.signupData.email);
        
        // For demo, create success message
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'success-message fade-in';
        welcomeMessage.innerHTML = `
          <div class="success-content">
            <div class="success-icon">✓</div>
            <h3>Account Created!</h3>
            <p>Welcome to EduFund, ${this.signupData.name}! Your account has been created successfully.</p>
          </div>
        `;
        
        // Close modal
        this.showSignupForm = false;
        
        // Show welcome message
        document.body.appendChild(welcomeMessage);
        
        // Remove welcome message after 3 seconds
        setTimeout(() => {
          welcomeMessage.remove();
        }, 3000);
        
        // Reset form data
        this.signupData = {
          name: '',
          email: '',
          password: '',
          passwordConfirm: ''
        };
        
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        
      }, 1500);
    },
    
    // Contact form submission
    submitContactForm() {
      console.log('Contact form submitted:', this.contactData);
      
      // In a real application, this would send an email to enzolimit99@yahoo.com
      // For demo purposes, we'll just simulate success
      
      // Show success popup
      const popup = document.createElement('div');
      popup.className = 'popup-message';
      popup.innerHTML = `
        <div class="popup-content">
          <div class="popup-icon">✓</div>
          <h3>Message Sent!</h3>
          <p>Thank you for contacting us. We'll get back to you soon at ${this.contactData.email}.</p>
          <p><small>Your message has been forwarded to: enzolimit99@yahoo.com</small></p>
          <button class="btn-primary" onclick="this.parentNode.parentNode.remove()">Close</button>
        </div>
      `;
      
      document.body.appendChild(popup);
      
      // Reset form
      this.contactData = { name: '', email: '', message: '' };
    },
    
    // Scholarship form submission
    submitScholarshipForm() {
      // Show loading state
      const submitButton = document.querySelector('#scholarships button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = "Processing...";
      submitButton.disabled = true;
      
      // Simulate API call with timeout
      setTimeout(() => {
        // Create sample scholarship results for demo purposes
        this.scholarshipResults = [
          {
            id: 1,
            name: "STEM Excellence Scholarship",
            amount: 10000,
            organization: "National Science Foundation",
            deadline: "October 15, 2025",
            status: "Applied",
            description: "Matched based on your " + this.scholarshipData.major + " major and " + this.scholarshipData.gpa + " GPA.",
            website: "https://example.com/stem-scholarship"
          },
          {
            id: 2,
            name: "Future Leaders Award",
            amount: 7500,
            organization: "Global Leadership Foundation",
            deadline: "November 30, 2025",
            status: "Applied",
            description: "Matched based on your academic record and location in " + this.scholarshipData.state + ".",
            website: "https://example.com/leadership-award"
          },
          {
            id: 3,
            name: "Diversity in Education Grant",
            amount: 5000,
            organization: "Education for All Institute",
            deadline: "December 10, 2025",
            status: "Applied",
            description: "You qualify for this diversity-focused scholarship based on your profile.",
            website: "https://example.com/diversity-grant"
          }
        ];
        
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
      }, 2000);
    },
    
    // Get demo scholarship data
    getDemoScholarships() {
      return [
        {
          id: 9,
          name: "Regeneron Science Talent Search",
          amount: 250000,
          organization: "Society for Science",
          deadline: "Nov 10, 2025",
          status: "Applied",
          description: "The Regeneron Science Talent Search is the nation's oldest and most prestigious science competition for high school seniors."
        },
        {
          id: 27,
          name: "Davidson Fellows Scholarship",
          amount: 50000,
          organization: "Davidson Institute",
          deadline: "Feb 12, 2026",
          status: "Not Available Yet (Opens Nov 1, 2025)",
          description: "The Davidson Fellows Scholarship awards scholarships to extraordinary young people who have completed a significant piece of work."
        },
        {
          id: 3,
          name: "Jack Kent Cooke Foundation Scholarship",
          amount: 55000,
          organization: "Jack Kent Cooke Foundation",
          deadline: "Nov 20, 2025",
          status: "Applied",
          description: "The Jack Kent Cooke Foundation College Scholarship Program is an undergraduate scholarship program available to high-achieving high school seniors with financial need who seek to attend the nation's best four-year colleges and universities."
        },
        {
          id: 2,
          name: "Gates Millennium Scholars Program",
          amount: 40000,
          organization: "Bill & Melinda Gates Foundation",
          deadline: "Jan 15, 2026",
          status: "Applied",
          description: "The Gates Millennium Scholars (GMS) Program, funded by a grant from the Bill & Melinda Gates Foundation, was established in 1999 to provide outstanding students with financial need the opportunity to complete an undergraduate college education."
        },
        {
          id: 6,
          name: "Amazon Future Engineer Scholarship",
          amount: 40000,
          organization: "Amazon",
          deadline: "Jan 31, 2026",
          status: "Applied",
          description: "The Amazon Future Engineer Scholarship program provides students with financial support to help them pursue an education in computer science."
        },
        {
          id: 30,
          name: "Thiel Fellowship",
          amount: 100000,
          organization: "Thiel Foundation",
          deadline: "Dec 31, 2025",
          status: "Not Available Yet (Opens Sep 30, 2025)",
          description: "The Thiel Fellowship gives $100,000 to young people who want to build new things instead of sitting in a classroom."
        }
      ];
    },
    
    // Show the scholarship application flow
    showScholarshipApplicationFlow() {
      this.showApplicationFlow = true;
      this.applicationStep = 1;
      this.updateProgress();
      
      // Scroll to the section
      setTimeout(() => {
        document.getElementById('scholarship-application-flow').scrollIntoView({
          behavior: 'smooth'
        });
      }, 100);
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
    
    // Add/remove repeated form items
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
    
    // Generate matching scholarships based on profile
    generateScholarshipMatches() {
      // In a real app, this would make an API call to your backend
      // For demo purposes, we'll generate mock data
      
      // Calculate total possible amount
      let totalAmount = 0;
      
      // Generate 15-20 matching scholarships with various match percentages
      const scholarshipCount = Math.floor(Math.random() * 6) + 15; // 15-20 scholarships
      const mockScholarships = [];
      
      for (let i = 0; i < scholarshipCount; i++) {
        // Create somewhat realistic scholarship data based on user profile
        const matchScore = Math.floor(Math.random() * 30) + 70; // 70-99% match
        const amount = [1000, 2500, 5000, 7500, 10000, 12500, 15000, 20000, 25000, 30000][Math.floor(Math.random() * 10)];
        
        totalAmount += amount;
        
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
          image: `images/scholarship-placeholder.png`
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
            scholarship.selected = false;
          }
        });
        
        // Update counter
        this.selectedScholarshipsCount = 0;
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message fade-in';
        successMessage.innerHTML = `
          <div class="success-content">
            <div class="success-icon">✓</div>
            <h3>Applications Submitted!</h3>
            <p>Your applications have been successfully submitted. You'll receive email updates about their status.</p>
          </div>
        `;
        
        document.body.appendChild(successMessage);
        
        // Remove success message after 3 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 3000);
        
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      }, 2000);
    },
    
    // Submit the entire application
    submitApplication() {
      // In a real app, this would save all the application data
      // For now, just go to the next step to see matches
      this.nextStep();
    },
    
    // Chatbot methods
    toggleChatbot() {
      this.showChatbot = !this.showChatbot;
      
      // Focus on input when chatbot is opened
      if (this.showChatbot) {
        setTimeout(() => {
          const inputEl = document.querySelector('.chatbot-input input');
          if (inputEl) inputEl.focus();
        }, 100);
      }
    },
    
    sendMessage() {
      if (!this.userMessage.trim()) return;
      
      // Add user message
      this.chatMessages.push({
        sender: 'user',
        text: this.userMessage
      });
      
      // Store message to respond to
      const userQuery = this.userMessage.trim().toLowerCase();
      
      // Clear input
      this.userMessage = '';
      
      // Scroll to bottom
      this.$nextTick(() => {
        const chatMessages = this.$refs.chatMessages;
        if (chatMessages) {
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      });
      
      // Simulate thinking
      setTimeout(() => {
        // Generate response based on user query
        let botResponse = this.generateBotResponse(userQuery);
        
        // Add bot response
        this.chatMessages.push({
          sender: 'bot',
          text: botResponse
        });
        
        // Scroll to bottom again
        this.$nextTick(() => {
          const chatMessages = this.$refs.chatMessages;
          if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
          }
        });
      }, 1000);
    },
    
    generateBotResponse(query) {
      // Check for scholarship-related questions
      if (query.includes('scholarship') || query.includes('apply') || query.includes('application')) {
        if (query.includes('how') || query.includes('apply')) {
          return "To apply for scholarships, click the 'Get Started' button at the top of the page. This will guide you through our simple application process.";
        } else if (query.includes('deadline') || query.includes('when')) {
          return "Most scholarships on our platform have different deadlines. You can see specific deadlines on each scholarship listing. Want me to help you find scholarships with upcoming deadlines?";
        } else if (query.includes('eligib') || query.includes('qualify')) {
          return "Eligibility varies by scholarship. Some common requirements include GPA minimums, specific majors, or demographic criteria. To find scholarships you're eligible for, complete your profile through the 'Get Started' button.";
        } else {
          return "We have thousands of scholarships available. Would you like to browse by category, amount, or deadline? Or click 'Get Started' to create your profile and get personalized matches.";
        }
      }
      
      // Check for account-related questions
      else if (query.includes('account') || query.includes('sign up') || query.includes('login') || query.includes('register')) {
        return "You can create an account by clicking the 'Sign up' button in the top right corner of the page. If you already have an account, click 'Log in' instead.";
      }
      
      // Check for contact-related questions
      else if (query.includes('contact') || query.includes('help') || query.includes('support') || query.includes('email')) {
        return "For support, you can reach out through our contact form in the Contact section. Our team will respond to your inquiry within 24-48 hours.";
      }
      
      // Check for how it works questions
      else if (query.includes('how') && query.includes('work')) {
        return "EduFund works in 3 simple steps: 1) Create your profile with academic and personal information, 2) Our AI matches you with relevant scholarships, 3) We automatically submit applications on your behalf. Would you like to know more about any specific step?";
      }
      
      // Default responses for unclear queries
      else {
        const defaultResponses = [
          "I'm not sure I understand your question. Can I help you find scholarships, learn about our application process, or contact support?",
          "Could you rephrase your question? I'm here to help with scholarships, applications, and general information about EduFund.",
          "I'm not sure about that, but I can help you find scholarships that match your profile. Would you like to get started?",
          "I can help with scholarship searches, application processes, and account questions. What specifically do you need help with?"
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
      }
    }
  }
});