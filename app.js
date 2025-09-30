// Portfolio Website with Admin Panel and PDF Generation - Enhanced JavaScript Implementation

// Global variables and state
let currentData = {
    personalInfo: {},
    workExperience: [],
    projects: [],
    skills: [],
    achievements: [],
    isLoggedIn: false
};

let adminSession = null;
let currentRoute = '/';

// Default data (simulates database content)
const DEFAULT_DATA = {
    personalInfo: {
        name: "Raj Vaibhav Rai",
        title: "Software Developer",
        phone: "+91 8423914735",
        location: "Noida, Uttar Pradesh, India",
        email: "rvrai1998@gmail.com",
        linkedin: "linkedin.com/in/rvrai",
        summary: "Experienced Android developer skilled in developing mobile applications using Java and Kotlin for various Android versions. Proficient in maintaining and updating source code, troubleshooting bugs, and ensuring app quality. Skilled in Android OS operation, UI/UX design, mockups, APIs, and Figma. Experienced with MVVM architecture, Room database, Dependency Injection (Dagger2/Hilt), Firebase, Jetpack libraries, and custom views."
    },
    workExperience: [
        {
            id: 1,
            position: "Software Developer",
            company: "Rupyz Fintech Private Limited",
            location: "Gurugram, Haryana, India",
            start_date: "2024-05-01",
            end_date: null,
            responsibilities: "Developed and maintained Android application using Java/Kotlin, delivering measurable improvements in app performance and user experience. Implemented MVVM architecture with Room database and Dependency Injection, enhancing app data management and scalability for users. Collaborated with cross-functional teams to deliver scalable features."
        },
        {
            id: 2,
            position: "Software Engineer", 
            company: "TechAhead Software Private Limited",
            location: "Noida, Uttar Pradesh, India",
            start_date: "2023-05-01",
            end_date: "2024-05-01",
            responsibilities: "Developed advanced Android features to improve user engagement and performance. Collaborated with design and QA teams to deliver high-quality application releases, ensuring timely delivery and adherence to project standards."
        },
        {
            id: 3,
            position: "Android Developer",
            company: "CEDCOSS Technologies Private Limited",
            location: "Lucknow, Uttar Pradesh, India",
            start_date: "2020-08-01",
            end_date: "2023-05-01",
            responsibilities: "Led Android application development initiatives, resolved bugs, and enhanced performance, achieving measurable improvements in stability and efficiency by 95%."
        },
        {
            id: 4,
            position: "Android Developer",
            company: "Coding Brains Software Solutions Private Limited",
            location: "Lucknow",
            start_date: "2019-09-01",
            end_date: "2020-08-01",
            responsibilities: "Engineered and enhanced application features, optimizing performance and ensuring seamless functionality for existing modules."
        }
    ],
    projects: [
        {
            id: 1,
            name: "Kido Protect Parental Control",
            description: "Parental control app for monitoring screen time, app restrictions, and social media activity.",
            duration: "Nov 2023 - Feb 2024",
            tech_stack: "Android,Kotlin,Firebase,Room Database",
            play_store_link: "https://play.google.com/store/apps/details?id=com.kidoprotect.app&hl=en_IN&gl=US",
            featured: true,
            category: "android social"
        },
        {
            id: 2,
            name: "DolleUp",
            description: "Native Android app blending social media and shopping convenience. Integrated product features into posts and stories for direct purchasing.",
            duration: "Apr 2023 - Feb 2024",
            tech_stack: "Android,Kotlin,Social Media Integration,E-commerce",
            play_store_link: "https://play.google.com/store/apps/details?id=com.app.dolledup&hl=en_IN&gl=US",
            featured: true,
            category: "android ecommerce social"
        },
        {
            id: 3,
            name: "HappyMob",
            description: "Platform for business registration and local search.",
            duration: "Oct 2023 - Dec 2023",
            tech_stack: "Android,Local Search,Business Platform",
            play_store_link: "https://play.google.com/store/apps/details?id=com.app.happy_mob&hl=en-IN",
            featured: false,
            category: "android business"
        },
        {
            id: 4,
            name: "Magenative Shopify App",
            description: "Shopify mobile app builder featuring themes, AR, and push notifications.",
            duration: "01/2021 - Mar 2023",
            tech_stack: "Android,Shopify,AR,Push Notifications",
            play_store_link: "https://play.google.com/store/apps/details?id=com.shopify.shopifyapp&hl=en_IN&gl=US",
            featured: false,
            category: "android ecommerce"
        },
        {
            id: 5,
            name: "Magenative Woo",
            description: "WooCommerce mobile app builder featuring themes, and push notifications.",
            duration: "Jun 2020 - Aug 2022",
            tech_stack: "Android,WooCommerce,App Builder",
            play_store_link: "https://play.google.com/store/apps/details?id=com.magenative.woocommerce",
            featured: false,
            category: "android ecommerce"
        },
        {
            id: 6,
            name: "Rupyz",
            description: "ERP system to manage staff and productivity of industrial sector.",
            duration: "Aug 2024 - Present",
            tech_stack: "Android,ERP,Industrial Management",
            play_store_link: "https://play.google.com/store/apps/details?id=com.app.rupyz",
            featured: true,
            category: "android enterprise"
        }
    ],
    skills: [
        {
            id: 1,
            name: "Android SDK",
            category: "Technical",
            proficiency_level: 95
        },
        {
            id: 2,
            name: "Java",
            category: "Programming",
            proficiency_level: 90
        },
        {
            id: 3,
            name: "Kotlin", 
            category: "Programming",
            proficiency_level: 92
        },
        {
            id: 4,
            name: "MVVM Architecture",
            category: "Technical",
            proficiency_level: 88
        },
        {
            id: 5,
            name: "Room Database",
            category: "Technical",
            proficiency_level: 85
        },
        {
            id: 6,
            name: "Dependency Injection (Dagger2, Hilt)",
            category: "Technical",
            proficiency_level: 82
        },
        {
            id: 7,
            name: "Firebase",
            category: "Technical",
            proficiency_level: 87
        },
        {
            id: 8,
            name: "UI/UX Design",
            category: "Design",
            proficiency_level: 80
        },
        {
            id: 9,
            name: "Figma",
            category: "Design",
            proficiency_level: 75
        }
    ],
    achievements: [
        {
            id: 1,
            title: "Increased app downloads by 50% in six months",
            description: "Successfully implemented marketing strategies and feature improvements",
            date_achieved: "2024-06-01",
            metric: 50
        },
        {
            id: 2,
            title: "Reduced app crash rates by 80% over one year",
            description: "Implemented robust error handling and performance optimizations",
            date_achieved: "2024-01-01",
            metric: 80
        },
        {
            id: 3,
            title: "Improved user engagement by 30% through feature implementation",
            description: "Designed and developed user-centric features",
            date_achieved: "2023-12-01",
            metric: 30
        },
        {
            id: 4,
            title: "Led team to deliver project two months ahead of schedule",
            description: "Successfully managed cross-functional team",
            date_achieved: "2023-10-01",
            metric: 2
        }
    ],
    adminCredentials: {
        username: "admin",
        password: "admin123",
        email: "rvrai1998@gmail.com"
    }
};

// URL Router Class
class Router {
    constructor() {
        this.routes = {
            '/': this.showPortfolio.bind(this),
            '/admin': this.showAdminPanel.bind(this)
        };
        
        // Listen for browser navigation
        window.addEventListener('popstate', (e) => {
            this.handleRoute();
        });
        
        // Listen for hash changes
        window.addEventListener('hashchange', (e) => {
            this.handleRoute();
        });
    }
    
    init() {
        this.handleRoute();
    }
    
    handleRoute() {
        const path = this.getCurrentPath();
        currentRoute = path;
        
        if (this.routes[path]) {
            this.routes[path]();
        } else {
            this.routes['/']();
        }
    }
    
    getCurrentPath() {
        // Check hash first, then pathname
        const hash = window.location.hash;
        if (hash === '#admin' || hash === '#/admin') {
            return '/admin';
        }
        
        const pathname = window.location.pathname;
        if (pathname.endsWith('/admin')) {
            return '/admin';
        }
        
        return '/';
    }
    
    navigateTo(path) {
        if (path === '/admin') {
            window.location.hash = '#admin';
        } else {
            window.location.hash = '';
        }
        currentRoute = path;
        this.handleRoute();
    }
    
    showPortfolio() {
        console.log('Showing portfolio');
        const adminModal = document.getElementById('adminModal');
        if (adminModal) {
            adminModal.classList.add('hidden');
        }
    }
    
    showAdminPanel() {
        console.log('Showing admin panel');
        const adminModal = document.getElementById('adminModal');
        if (adminModal) {
            adminModal.classList.remove('hidden');
            
            if (checkAdminAuth()) {
                showAdminDashboard();
            } else {
                showLoginSection();
            }
        }
    }
}

// Initialize router
const router = new Router();

// PDF Generation Functions
async function generateResumePDF() {
    try {
        showNotification('Generating your resume PDF...', 'info');
        
        // Import jsPDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        
        const info = currentData.personalInfo;
        const workExp = currentData.workExperience;
        const projects = currentData.projects;
        const skills = currentData.skills;
        const achievements = currentData.achievements;
        
        // PDF styling variables
        const margin = 20;
        const pageWidth = pdf.internal.pageSize.width;
        const pageHeight = pdf.internal.pageSize.height;
        let yPosition = margin;
        
        // Helper function to add text with word wrap
        function addText(text, x, y, maxWidth = pageWidth - 2 * margin, fontSize = 10) {
            pdf.setFontSize(fontSize);
            const lines = pdf.splitTextToSize(text, maxWidth);
            pdf.text(lines, x, y);
            return y + (lines.length * fontSize * 0.4);
        }
        
        // Helper function for section headers
        function addSectionHeader(title, y) {
            pdf.setFontSize(14);
            pdf.setFont(undefined, 'bold');
            pdf.setTextColor(72, 61, 139); // Dark slate blue
            const newY = addText(title, margin, y, pageWidth - 2 * margin, 14);
            
            // Add underline
            pdf.setDrawColor(72, 61, 139);
            pdf.line(margin, newY + 2, pageWidth - margin, newY + 2);
            
            pdf.setFont(undefined, 'normal');
            pdf.setTextColor(0, 0, 0);
            return newY + 8;
        }
        
        // Header Section
        pdf.setFontSize(20);
        pdf.setFont(undefined, 'bold');
        pdf.setTextColor(72, 61, 139);
        yPosition = addText(info.name, margin, yPosition, pageWidth - 2 * margin, 20);
        
        pdf.setFontSize(14);
        pdf.setFont(undefined, 'normal');
        pdf.setTextColor(100, 100, 100);
        yPosition = addText(info.title, margin, yPosition + 5, pageWidth - 2 * margin, 14);
        
        // Contact Information
        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);
        const contactInfo = `📧 ${info.email} | 📱 ${info.phone} | 📍 ${info.location}`;
        yPosition = addText(contactInfo, margin, yPosition + 8, pageWidth - 2 * margin, 10);
        
        if (info.linkedin) {
            yPosition = addText(`LinkedIn: ${info.linkedin}`, margin, yPosition + 4, pageWidth - 2 * margin, 10);
        }
        
        yPosition += 10;
        
        // Professional Summary
        yPosition = addSectionHeader('PROFESSIONAL SUMMARY', yPosition);
        yPosition = addText(info.summary, margin, yPosition);
        yPosition += 10;
        
        // Work Experience
        yPosition = addSectionHeader('WORK EXPERIENCE', yPosition);
        
        workExp.forEach((exp, index) => {
            if (yPosition > pageHeight - 60) {
                pdf.addPage();
                yPosition = margin;
            }
            
            // Job title and company
            pdf.setFont(undefined, 'bold');
            yPosition = addText(`${exp.position} - ${exp.company}`, margin, yPosition, pageWidth - 2 * margin, 12);
            
            pdf.setFont(undefined, 'normal');
            pdf.setTextColor(100, 100, 100);
            
            // Date and location
            const startDate = new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            const endDate = exp.end_date ? new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present';
            const dateLocation = `${startDate} - ${endDate} | ${exp.location}`;
            yPosition = addText(dateLocation, margin, yPosition + 2, pageWidth - 2 * margin, 10);
            
            pdf.setTextColor(0, 0, 0);
            // Responsibilities
            yPosition = addText(`• ${exp.responsibilities}`, margin, yPosition + 4, pageWidth - 2 * margin, 10);
            yPosition += 8;
        });
        
        // Projects
        if (yPosition > pageHeight - 100) {
            pdf.addPage();
            yPosition = margin;
        }
        
        yPosition = addSectionHeader('KEY PROJECTS', yPosition);
        
        const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
        featuredProjects.forEach((project, index) => {
            if (yPosition > pageHeight - 60) {
                pdf.addPage();
                yPosition = margin;
            }
            
            pdf.setFont(undefined, 'bold');
            yPosition = addText(project.name, margin, yPosition, pageWidth - 2 * margin, 11);
            
            pdf.setFont(undefined, 'normal');
            pdf.setTextColor(100, 100, 100);
            yPosition = addText(project.duration, margin, yPosition + 2, pageWidth - 2 * margin, 9);
            
            pdf.setTextColor(0, 0, 0);
            yPosition = addText(`• ${project.description}`, margin, yPosition + 4, pageWidth - 2 * margin, 10);
            
            if (project.tech_stack) {
                const techStack = project.tech_stack.split(',').join(', ');
                pdf.setTextColor(72, 61, 139);
                yPosition = addText(`Technologies: ${techStack}`, margin, yPosition + 3, pageWidth - 2 * margin, 9);
                pdf.setTextColor(0, 0, 0);
            }
            
            yPosition += 8;
        });
        
        // Skills
        if (yPosition > pageHeight - 100) {
            pdf.addPage();
            yPosition = margin;
        }
        
        yPosition = addSectionHeader('TECHNICAL SKILLS', yPosition);
        
        const skillsByCategory = skills.reduce((acc, skill) => {
            if (!acc[skill.category]) {
                acc[skill.category] = [];
            }
            acc[skill.category].push(skill);
            return acc;
        }, {});
        
        Object.entries(skillsByCategory).forEach(([category, categorySkills]) => {
            pdf.setFont(undefined, 'bold');
            yPosition = addText(`${category}:`, margin, yPosition, pageWidth - 2 * margin, 11);
            
            pdf.setFont(undefined, 'normal');
            const skillNames = categorySkills.map(s => s.name).join(', ');
            yPosition = addText(skillNames, margin + 15, yPosition - 4, pageWidth - 2 * margin - 15, 10);
            yPosition += 6;
        });
        
        // Key Achievements
        if (yPosition > pageHeight - 80) {
            pdf.addPage();
            yPosition = margin;
        }
        
        yPosition = addSectionHeader('KEY ACHIEVEMENTS', yPosition);
        
        achievements.forEach((achievement, index) => {
            if (yPosition > pageHeight - 40) {
                pdf.addPage();
                yPosition = margin;
            }
            
            yPosition = addText(`• ${achievement.title}`, margin, yPosition, pageWidth - 2 * margin, 10);
            yPosition += 2;
        });
        
        // Save the PDF
        pdf.save('RVR_Resume.pdf');
        showNotification('Resume PDF generated successfully!', 'success');
        
    } catch (error) {
        console.error('PDF generation error:', error);
        showNotification('Failed to generate PDF. Please try again.', 'error');
    }
}

// Simulated Database API
class DatabaseAPI {
    constructor() {
        this.data = this.loadFromLocalStorage() || DEFAULT_DATA;
        console.log('Database initialized with data:', this.data);
    }

    saveToLocalStorage() {
        try {
            // Note: localStorage is not available in sandbox, but we'll keep this for completeness
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('portfolioDB', JSON.stringify(this.data));
            }
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    }

    loadFromLocalStorage() {
        try {
            if (typeof localStorage !== 'undefined') {
                const saved = localStorage.getItem('portfolioDB');
                return saved ? JSON.parse(saved) : null;
            }
            return null;
        } catch (error) {
            console.error('Failed to load from localStorage:', error);
            return null;
        }
    }

    async connect() {
        console.log('Database connection established');
        return true;
    }

    async select(table) {
        await this.simulateDelay(100);
        
        switch (table) {
            case 'personal_info':
                return [this.data.personalInfo];
            case 'work_experience':
                return this.data.workExperience;
            case 'projects':
                return this.data.projects;
            case 'skills':
                return this.data.skills;
            case 'achievements':
                return this.data.achievements;
            default:
                return [];
        }
    }

    async insert(table, data) {
        await this.simulateDelay(100);
        const newItem = { ...data, id: Date.now() };
        
        switch (table) {
            case 'work_experience':
                this.data.workExperience.push(newItem);
                break;
            case 'projects':
                this.data.projects.push(newItem);
                break;
            case 'skills':
                this.data.skills.push(newItem);
                break;
            case 'achievements':
                this.data.achievements.push(newItem);
                break;
        }
        
        this.saveToLocalStorage();
        return newItem;
    }

    async update(table, id, data) {
        await this.simulateDelay(100);
        
        switch (table) {
            case 'personal_info':
                this.data.personalInfo = { ...this.data.personalInfo, ...data };
                break;
            case 'work_experience':
                const expIndex = this.data.workExperience.findIndex(item => item.id == id);
                if (expIndex !== -1) {
                    this.data.workExperience[expIndex] = { ...this.data.workExperience[expIndex], ...data };
                }
                break;
            case 'projects':
                const projIndex = this.data.projects.findIndex(item => item.id == id);
                if (projIndex !== -1) {
                    this.data.projects[projIndex] = { ...this.data.projects[projIndex], ...data };
                }
                break;
            case 'skills':
                const skillIndex = this.data.skills.findIndex(item => item.id == id);
                if (skillIndex !== -1) {
                    this.data.skills[skillIndex] = { ...this.data.skills[skillIndex], ...data };
                }
                break;
            case 'achievements':
                const achIndex = this.data.achievements.findIndex(item => item.id == id);
                if (achIndex !== -1) {
                    this.data.achievements[achIndex] = { ...this.data.achievements[achIndex], ...data };
                }
                break;
        }
        
        this.saveToLocalStorage();
        return true;
    }

    async delete(table, id) {
        await this.simulateDelay(100);
        
        switch (table) {
            case 'work_experience':
                this.data.workExperience = this.data.workExperience.filter(item => item.id != id);
                break;
            case 'projects':
                this.data.projects = this.data.projects.filter(item => item.id != id);
                break;
            case 'skills':
                this.data.skills = this.data.skills.filter(item => item.id != id);
                break;
            case 'achievements':
                this.data.achievements = this.data.achievements.filter(item => item.id != id);
                break;
        }
        
        this.saveToLocalStorage();
        return true;
    }

    simulateDelay(ms = 100) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize database
const db = new DatabaseAPI();

// Notification system
function showNotification(message, type = 'info', duration = 3000) {
    const container = document.getElementById('notifications');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    container.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutToRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Authentication functions
function checkAdminAuth() {
    try {
        if (typeof sessionStorage !== 'undefined') {
            const session = sessionStorage.getItem('adminSession');
            if (session) {
                adminSession = JSON.parse(session);
                return adminSession.isLoggedIn;
            }
        }
    } catch (error) {
        console.error('Auth check error:', error);
    }
    return false;
}

function adminLogin(username, password) {
    const credentials = DEFAULT_DATA.adminCredentials;
    if (username === credentials.username && password === credentials.password) {
        adminSession = {
            username: username,
            isLoggedIn: true,
            loginTime: Date.now()
        };
        
        try {
            if (typeof sessionStorage !== 'undefined') {
                sessionStorage.setItem('adminSession', JSON.stringify(adminSession));
            }
        } catch (error) {
            console.error('Failed to save session:', error);
        }
        
        return true;
    }
    return false;
}

function adminLogout() {
    adminSession = null;
    try {
        if (typeof sessionStorage !== 'undefined') {
            sessionStorage.removeItem('adminSession');
        }
    } catch (error) {
        console.error('Failed to clear session:', error);
    }
    
    // Redirect to main portfolio
    router.navigateTo('/');
    showNotification('Logged out successfully', 'success');
}

// Data loading functions
async function loadAllData() {
    try {
        console.log('Loading all data...');
        
        await db.connect();
        
        const [personalInfo, workExperience, projects, skills, achievements] = await Promise.all([
            db.select('personal_info'),
            db.select('work_experience'),
            db.select('projects'),
            db.select('skills'),
            db.select('achievements')
        ]);

        currentData = {
            personalInfo: personalInfo[0] || DEFAULT_DATA.personalInfo,
            workExperience: workExperience || DEFAULT_DATA.workExperience,
            projects: projects || DEFAULT_DATA.projects,
            skills: skills || DEFAULT_DATA.skills,
            achievements: achievements || DEFAULT_DATA.achievements,
            isLoggedIn: checkAdminAuth()
        };

        console.log('Data loaded:', currentData);
        renderAllContent();
        
    } catch (error) {
        console.error('Failed to load data:', error);
        showNotification('Failed to load portfolio data', 'error');
        currentData = DEFAULT_DATA;
        renderAllContent();
    }
}

// Content rendering functions
function renderAllContent() {
    console.log('Rendering all content...');
    
    try {
        renderPersonalInfo();
        renderProjects();
        renderSkills();
        renderAchievements();
        renderContactInfo();
        console.log('All content rendered successfully');
    } catch (error) {
        console.error('Error rendering content:', error);
    }
}

function renderPersonalInfo() {
    const info = currentData.personalInfo;
    console.log('Rendering personal info:', info);
    
    // Helper function to safely set text content
    const safeSetText = (id, text) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = text;
        }
    };

    // Desktop elements
    safeSetText('heroName', info.name);
    safeSetText('heroTitle', info.title);
    safeSetText('heroLocation', `📍 ${info.location}`);
    safeSetText('heroContact', `📧 ${info.email} | 📱 ${info.phone}`);
    safeSetText('aboutSummary', info.summary);

    // Mobile elements
    safeSetText('mobileHeroName', info.name);
    safeSetText('mobileHeroTitle', info.title);
    safeSetText('mobileHeroLocation', `📍 ${info.location}`);
    safeSetText('mobileHeroContact', `📧 ${info.email} | 📱 ${info.phone}`);
    safeSetText('mobileAboutSummary', info.summary);
}

function renderProjects() {
    const projects = currentData.projects;
    console.log('Rendering projects:', projects);
    
    // Get unique categories
    const categories = [...new Set(projects.flatMap(p => 
        p.category ? p.category.split(' ') : ['android']
    ))];
    
    // Render filter buttons
    renderFilterButtons(categories);
    
    // Render projects grid
    renderProjectsGrid(projects);
}

function renderFilterButtons(categories) {
    const filterContainers = ['filterButtons', 'mobileFilterButtons'];
    
    filterContainers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Clear existing buttons
        container.innerHTML = '';
        
        // Add "All" button
        const allBtn = document.createElement('button');
        allBtn.className = 'filter-btn active px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium transition-all duration-300';
        allBtn.dataset.filter = 'all';
        allBtn.textContent = 'All';
        container.appendChild(allBtn);
        
        // Add category buttons
        categories.forEach(category => {
            if (category && category !== 'all') {
                const btn = document.createElement('button');
                btn.className = 'filter-btn px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white font-medium transition-all duration-300';
                btn.dataset.filter = category;
                btn.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                container.appendChild(btn);
            }
        });
    });
}

function renderProjectsGrid(projects) {
    const gridContainers = ['projectsGrid', 'mobileProjectsGrid'];
    
    gridContainers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        
        projects.forEach(project => {
            const projectCard = createProjectCard(project);
            container.appendChild(projectCard);
        });
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card glass-card p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20';
    card.dataset.category = project.category || 'all';
    
    const techStack = project.tech_stack ? project.tech_stack.split(',') : [];
    const initials = project.name.split(' ').map(word => word[0]).join('').substring(0, 2);
    
    const colors = [
        'from-purple-500 to-pink-500',
        'from-blue-500 to-cyan-500',
        'from-green-500 to-teal-500',
        'from-orange-500 to-red-500',
        'from-indigo-500 to-purple-500'
    ];
    const colorClass = colors[project.id % colors.length];
    
    card.innerHTML = `
        <div class="project-icon mb-4">
            <div class="w-12 h-12 bg-gradient-to-r ${colorClass} rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-xl">${initials}</span>
            </div>
        </div>
        <h3 class="text-xl font-semibold text-white mb-3">${project.name}</h3>
        <p class="text-gray-300 mb-4 text-sm">${project.description}</p>
        <div class="tech-stack flex flex-wrap gap-2 mb-4">
            ${techStack.map(tech => `
                <span class="tech-chip px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-xs">${tech.trim()}</span>
            `).join('')}
        </div>
        <div class="flex justify-between items-center">
            <span class="text-sm text-gray-400">${project.duration}</span>
            ${project.play_store_link ? `
                <a href="${project.play_store_link}" target="_blank" class="text-purple-400 hover:text-purple-300 transition-colors duration-300" onclick="event.stopPropagation();">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </a>
            ` : ''}
        </div>
    `;
    
    // Add click handler for the card
    card.addEventListener('click', (e) => {
        if (!e.target.closest('a') && project.play_store_link) {
            window.open(project.play_store_link, '_blank');
        }
    });
    
    return card;
}

function renderSkills() {
    const skills = currentData.skills;
    console.log('Rendering skills:', skills);
    
    const skillsByCategory = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {});
    
    const containers = ['skillsContainer', 'mobileSkillsContainer'];
    
    containers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        
        Object.entries(skillsByCategory).forEach(([category, categorySkills]) => {
            const categoryDiv = createSkillsCategory(category, categorySkills);
            container.appendChild(categoryDiv);
        });
    });
}

function createSkillsCategory(category, skills) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'skills-category';
    
    const gradientColors = {
        'Technical': 'from-purple-500 to-pink-500',
        'Programming': 'from-blue-500 to-cyan-500',
        'Design': 'from-green-500 to-teal-500'
    };
    
    const gradientClass = gradientColors[category] || 'from-green-500 to-teal-500';
    
    categoryDiv.innerHTML = `
        <h3 class="text-2xl font-semibold text-white mb-8 flex items-center">
            <span class="w-8 h-8 bg-gradient-to-r ${gradientClass} rounded-lg mr-3 flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </span>
            ${category} Skills
        </h3>
        <div class="skills-grid space-y-4">
            ${skills.map((skill, index) => `
                <div class="skill-item">
                    <div class="flex justify-between mb-2">
                        <span class="text-gray-300">${skill.name}</span>
                        <span class="text-purple-400">${skill.proficiency_level}%</span>
                    </div>
                    <div class="skill-bar bg-gray-700 rounded-full h-2">
                        <div class="skill-progress bg-gradient-to-r ${gradientClass} h-2 rounded-full" data-width="${skill.proficiency_level}"></div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    return categoryDiv;
}

function renderAchievements() {
    const achievements = currentData.achievements;
    console.log('Rendering achievements:', achievements);
    
    const containers = ['achievementsGrid', 'mobileAchievementsGrid'];
    
    containers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        
        achievements.forEach((achievement, index) => {
            const card = document.createElement('div');
            card.className = 'achievement-card glass-card p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-center';
            
            const colors = ['text-purple-400', 'text-pink-400', 'text-blue-400', 'text-green-400'];
            const colorClass = colors[index % colors.length];
            
            card.innerHTML = `
                <div class="text-3xl font-bold ${colorClass} mb-2 counter" data-target="${achievement.metric || 0}">${achievement.metric || 0}</div>
                <div class="text-sm text-gray-300">${achievement.title.split(' ').slice(0, 3).join(' ')}</div>
            `;
            
            container.appendChild(card);
        });
    });
}

function renderContactInfo() {
    const info = currentData.personalInfo;
    console.log('Rendering contact info:', info);
    
    const containers = ['contactInfo', 'mobileContactInfo'];
    
    containers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = `
            <div class="contact-item">
                <div class="contact-icon bg-gradient-to-r from-purple-500 to-pink-500">
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                </div>
                <div>
                    <div class="text-white font-medium">Email</div>
                    <div class="text-gray-400">${info.email}</div>
                </div>
            </div>
            <div class="contact-item">
                <div class="contact-icon bg-gradient-to-r from-blue-500 to-cyan-500">
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                    </svg>
                </div>
                <div>
                    <div class="text-white font-medium">Phone</div>
                    <div class="text-gray-400">${info.phone}</div>
                </div>
            </div>
            <div class="contact-item">
                <div class="contact-icon bg-gradient-to-r from-green-500 to-teal-500">
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                    </svg>
                </div>
                <div>
                    <div class="text-white font-medium">Location</div>
                    <div class="text-gray-400">${info.location}</div>
                </div>
            </div>
        `;
    });
    
    // Render social links
    const socialContainers = ['socialLinks', 'mobileSocialLinks'];
    socialContainers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = `
            <a href="https://${info.linkedin}" target="_blank" class="w-12 h-12 bg-white/5 border border-white/10 backdrop-blur-md rounded-lg flex items-center justify-center text-white hover:scale-110 transition-all duration-300">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
            </a>
            <a href="mailto:${info.email}" target="_blank" class="w-12 h-12 bg-white/5 border border-white/10 backdrop-blur-md rounded-lg flex items-center justify-center text-white hover:scale-110 transition-all duration-300">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
            </a>
            <a href="tel:${info.phone}" target="_blank" class="w-12 h-12 bg-white/5 border border-white/10 backdrop-blur-md rounded-lg flex items-center justify-center text-white hover:scale-110 transition-all duration-300">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
            </a>
        `;
    });
}

// Admin Panel Functions
function initAdminPanel() {
    console.log('Initializing admin panel...');
    
    const closeAdmin = document.getElementById('closeAdmin');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');

    // Close admin modal
    if (closeAdmin) {
        closeAdmin.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            router.navigateTo('/');
        });
    }

    // Close on backdrop click
    const adminModal = document.getElementById('adminModal');
    if (adminModal) {
        adminModal.addEventListener('click', (e) => {
            if (e.target === adminModal) {
                router.navigateTo('/');
            }
        });
    }

    // Login form
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Login form submitted');
            
            const username = document.getElementById('adminUsername')?.value;
            const password = document.getElementById('adminPassword')?.value;
            
            if (adminLogin(username, password)) {
                showNotification('Login successful!', 'success');
                showAdminDashboard();
                await loadAdminData();
            } else {
                showNotification('Invalid credentials', 'error');
            }
        });
    }

    // Logout button
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            adminLogout();
        });
    }

    // Initialize admin tabs
    initAdminTabs();
}

function showLoginSection() {
    const loginSection = document.getElementById('loginSection');
    const adminDashboard = document.getElementById('adminDashboard');
    
    if (loginSection) loginSection.classList.remove('hidden');
    if (adminDashboard) adminDashboard.classList.add('hidden');
}

function showAdminDashboard() {
    const loginSection = document.getElementById('loginSection');
    const adminDashboard = document.getElementById('adminDashboard');
    
    if (loginSection) loginSection.classList.add('hidden');
    if (adminDashboard) adminDashboard.classList.remove('hidden');
}

function initAdminTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const tabName = btn.dataset.tab;

            // Update active tab button
            tabBtns.forEach(b => {
                b.classList.remove('active');
                b.classList.add('text-gray-400');
                b.classList.remove('text-white', 'border-purple-500');
            });
            btn.classList.add('active', 'text-white');
            btn.classList.remove('text-gray-400');

            // Show corresponding tab content
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });
            const targetContent = document.getElementById(`${tabName}Tab`);
            if (targetContent) {
                targetContent.classList.remove('hidden');
            }

            // Load specific tab data
            loadTabData(tabName);
        });
    });
}

async function loadAdminData() {
    await loadAllData();
    loadTabData('personal');
}

function loadTabData(tabName) {
    switch (tabName) {
        case 'personal':
            loadPersonalTab();
            break;
        case 'experience':
            loadExperienceTab();
            break;
        case 'projects':
            loadProjectsTab();
            break;
        case 'skills':
            loadSkillsTab();
            break;
        case 'achievements':
            loadAchievementsTab();
            break;
    }
}

function loadPersonalTab() {
    const info = currentData.personalInfo;
    
    const setFormValue = (id, value) => {
        const element = document.getElementById(id);
        if (element) element.value = value || '';
    };
    
    setFormValue('personalName', info.name);
    setFormValue('personalTitle', info.title);
    setFormValue('personalEmail', info.email);
    setFormValue('personalPhone', info.phone);
    setFormValue('personalLocation', info.location);
    setFormValue('personalLinkedin', info.linkedin);
    setFormValue('personalSummary', info.summary);

    // Personal form submit
    const personalForm = document.getElementById('personalForm');
    if (personalForm) {
        personalForm.onsubmit = async (e) => {
            e.preventDefault();
            
            const updatedInfo = {
                name: document.getElementById('personalName').value,
                title: document.getElementById('personalTitle').value,
                email: document.getElementById('personalEmail').value,
                phone: document.getElementById('personalPhone').value,
                location: document.getElementById('personalLocation').value,
                linkedin: document.getElementById('personalLinkedin').value,
                summary: document.getElementById('personalSummary').value
            };

            try {
                await db.update('personal_info', null, updatedInfo);
                currentData.personalInfo = { ...currentData.personalInfo, ...updatedInfo };
                renderPersonalInfo();
                showNotification('Personal information updated successfully!', 'success');
            } catch (error) {
                showNotification('Failed to update personal information', 'error');
            }
        };
    }
}

function loadExperienceTab() {
    const container = document.getElementById('experienceList');
    if (!container) return;
    
    container.innerHTML = '';
    container.innerHTML = '<p class="text-gray-400">Experience management features will be available in the full version.</p>';
}

function loadProjectsTab() {
    const container = document.getElementById('projectsList');
    if (!container) return;
    
    container.innerHTML = '';
    container.innerHTML = '<p class="text-gray-400">Project management features will be available in the full version.</p>';
}

function loadSkillsTab() {
    const container = document.getElementById('skillsList');
    if (!container) return;
    
    container.innerHTML = '';
    container.innerHTML = '<p class="text-gray-400">Skills management features will be available in the full version.</p>';
}

function loadAchievementsTab() {
    const container = document.getElementById('achievementsList');
    if (!container) return;
    
    container.innerHTML = '';
    container.innerHTML = '<p class="text-gray-400">Achievements management features will be available in the full version.</p>';
}

// Navigation Functions
function initNavigation() {
    console.log('Initializing navigation...');
    
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Update active nav link on scroll
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Navbar background on scroll
    function updateNavBackground() {
        const navs = document.querySelectorAll('nav');
        navs.forEach(nav => {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }
    
    window.addEventListener('scroll', () => {
        updateActiveNav();
        updateNavBackground();
    });
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            closeMobileMenu();
        });
    });
    
    // Initial call
    updateActiveNav();
}

function initMobileMenu() {
    console.log('Initializing mobile menu...');
    
    const hamburgerBtns = document.querySelectorAll('.hamburger-btn');
    const mobileMenus = document.querySelectorAll('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    hamburgerBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger button clicked');
            
            mobileMenus.forEach(menu => {
                menu.classList.toggle('hidden');
                menu.classList.toggle('active');
            });
        });
    });
    
    // Close mobile menu when clicking on nav link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-menu') && !e.target.closest('.hamburger-btn')) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const mobileMenus = document.querySelectorAll('.mobile-menu');
    mobileMenus.forEach(menu => {
        menu.classList.add('hidden');
        menu.classList.remove('active');
    });
}

function initProjectFiltering() {
    console.log('Initializing project filtering...');
    
    // Use event delegation for dynamically created filter buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            e.preventDefault();
            console.log('Filter button clicked:', e.target.dataset.filter);
            
            const filter = e.target.getAttribute('data-filter');
            const container = e.target.closest('.text-center, .mb-12');
            const filterBtns = container ? container.querySelectorAll('.filter-btn') : [];
            const projectCards = document.querySelectorAll('.project-card');
            
            // Update active button
            filterBtns.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.remove('bg-gradient-to-r', 'from-purple-600', 'to-pink-600');
                btn.classList.add('bg-white/10', 'border', 'border-white/20');
            });
            
            e.target.classList.add('active');
            e.target.classList.remove('bg-white/10', 'border', 'border-white/20');
            e.target.classList.add('bg-gradient-to-r', 'from-purple-600', 'to-pink-600');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        }
    });
}

function initScrollAnimations() {
    console.log('Initializing scroll animations...');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger specific animations based on element
                if (entry.target.classList.contains('achievement-card')) {
                    const counter = entry.target.querySelector('.counter');
                    if (counter) animateCounter(counter);
                }
                
                if (entry.target.classList.contains('skills-category')) {
                    animateSkills(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe sections and cards after DOM is ready
    setTimeout(() => {
        const elementsToObserve = document.querySelectorAll('section, .achievement-card, .project-card, .skills-category');
        elementsToObserve.forEach(el => observer.observe(el));
    }, 1000);
}

function animateCounter(counter) {
    if (counter.dataset.animated) return;
    
    const target = parseInt(counter.dataset.target) || 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current);
        }
    }, 16);
    
    counter.dataset.animated = 'true';
}

function animateSkills(skillsSection) {
    if (skillsSection.dataset.animated) return;
    
    const skillItems = skillsSection.querySelectorAll('.skill-item');
    const skillProgresses = skillsSection.querySelectorAll('.skill-progress');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, index * 200);
    });
    
    skillProgresses.forEach((progress, index) => {
        setTimeout(() => {
            const width = progress.dataset.width;
            progress.style.width = width + '%';
        }, index * 200 + 500);
    });
    
    skillsSection.dataset.animated = 'true';
}

function initContactForm() {
    console.log('Initializing contact forms...');
    
    const contactForms = document.querySelectorAll('#contactForm, #mobileContactForm');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Contact form submitted');
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success message
                showNotification('Message sent successfully!', 'success');
                form.reset();
                
            } catch (error) {
                // Show error message
                showNotification('Failed to send message. Please try again.', 'error');
            }
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
}

function initHeroButtons() {
    console.log('Initializing hero buttons...');
    
    // View Work buttons
    const viewWorkBtns = document.querySelectorAll('#viewWorkBtn, #mobileViewWorkBtn');
    viewWorkBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('View work button clicked');
                const projectsSection = document.querySelector('#projects');
                if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    });
    
    // Download CV buttons  
    const downloadCvBtns = document.querySelectorAll('#downloadCvBtn, #mobileDownloadCvBtn, #downloadCvBtn2, #mobileDownloadCvBtn2');
    downloadCvBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                console.log('Download CV button clicked');
                
                // Add loading state
                const originalText = btn.textContent;
                btn.classList.add('pdf-generating');
                btn.disabled = true;
                
                try {
                    await generateResumePDF();
                } catch (error) {
                    console.error('PDF generation failed:', error);
                    showNotification('Failed to generate PDF. Please try again.', 'error');
                } finally {
                    // Reset button state
                    btn.classList.remove('pdf-generating');
                    btn.disabled = false;
                    btn.textContent = originalText;
                }
            });
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    console.log('=== Portfolio Website Initializing ===');
    
    try {
        // Initialize router first
        router.init();
        
        // Initialize all functionality
        initNavigation();
        initMobileMenu();
        initProjectFiltering();
        initScrollAnimations();
        initContactForm();
        initHeroButtons();
        initAdminPanel();
        
        // Load all data from database
        console.log('Loading data...');
        await loadAllData();
        
        // Remove loading screen after a delay
        setTimeout(() => {
            const loading = document.querySelector('.loading');
            if (loading) {
                loading.style.opacity = '0';
                setTimeout(() => {
                    loading.classList.add('hidden');
                }, 500);
            }
        }, 500);
        
        console.log('=== Portfolio Website Initialized Successfully ===');
        
    } catch (error) {
        console.error('Initialization error:', error);
        showNotification('Error initializing website', 'error');
    }
});

// Add some debugging
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

// Export for debugging
window.portfolioDebug = {
    currentData,
    db,
    loadAllData,
    renderAllContent,
    showNotification,
    router,
    generateResumePDF
};