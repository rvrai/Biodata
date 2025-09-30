# Netlify DB Integration Setup Guide

## Database Schema Setup

To integrate your portfolio with Netlify DB (Neon), you'll need to create the following tables in your database:

### 1. Create Tables SQL

```sql
-- Personal Information Table
CREATE TABLE personal_info (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    location VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    linkedin VARCHAR(255),
    summary TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Work Experience Table
CREATE TABLE work_experience (
    id SERIAL PRIMARY KEY,
    position VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE,
    responsibilities TEXT,
    is_current BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Education Table
CREATE TABLE education (
    id SERIAL PRIMARY KEY,
    institution VARCHAR(255) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    field VARCHAR(255),
    location VARCHAR(255),
    start_date DATE,
    end_date DATE,
    gpa DECIMAL(3,2),
    description TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects Table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    duration VARCHAR(100),
    tech_stack TEXT, -- JSON array as text
    play_store_link VARCHAR(500),
    github_link VARCHAR(500),
    image_url VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'completed', -- completed, in-progress, planned
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills Table
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- Technical, Soft, Programming, etc.
    proficiency_level INTEGER CHECK (proficiency_level >= 0 AND proficiency_level <= 100),
    icon VARCHAR(100), -- icon class or name
    years_experience INTEGER,
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Achievements Table
CREATE TABLE achievements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date_achieved DATE,
    category VARCHAR(100), -- performance, leadership, technical, etc.
    metric_value VARCHAR(100), -- e.g., "50%", "80%", "2 months"
    is_featured BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin Users Table
CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Messages Table (Optional)
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    replied BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Insert Initial Data

```sql
-- Insert personal information
INSERT INTO personal_info (name, title, phone, location, email, linkedin, summary) VALUES 
('Raj Vaibhav Rai', 'Software Developer', '+91 8423914735', 'Noida, Uttar Pradesh, India', 'rvrai1998@gmail.com', 'linkedin.com/in/rvrai', 'Experienced Android developer skilled in developing mobile applications using Java and Kotlin for various Android versions. Proficient in maintaining and updating source code, troubleshooting bugs, and ensuring app quality.');

-- Insert work experience
INSERT INTO work_experience (position, company, location, start_date, end_date, responsibilities, is_current, display_order) VALUES 
('Software Developer', 'Rupyz Fintech Private Limited', 'Gurugram, Haryana, India', '2024-05-01', NULL, 'Developed and maintained Android application using Java/Kotlin, delivering measurable improvements in app performance and user experience. Implemented MVVM architecture with Room database and Dependency Injection.', TRUE, 1),
('Software Engineer', 'TechAhead Software Private Limited', 'Noida, Uttar Pradesh, India', '2023-05-01', '2024-05-01', 'Developed advanced Android features to improve user engagement and performance. Collaborated with design and QA teams to deliver high-quality application releases.', FALSE, 2),
('Android Developer', 'CEDCOSS Technologies Private Limited', 'Lucknow, Uttar Pradesh, India', '2020-08-01', '2023-05-01', 'Led Android application development initiatives, resolved bugs, and enhanced performance, achieving 95% improvements in stability and efficiency.', FALSE, 3),
('Android Developer', 'Coding Brains Software Solutions Private Limited', 'Lucknow', '2019-09-01', '2020-08-01', 'Engineered and enhanced application features, optimizing performance and ensuring seamless functionality for existing modules.', FALSE, 4);

-- Insert projects
INSERT INTO projects (name, description, duration, tech_stack, play_store_link, featured, display_order) VALUES 
('Kido Protect Parental Control', 'Parental control app for monitoring screen time, app restrictions, and social media activity', 'Nov 2023 - Feb 2024', '["Android", "Kotlin", "Firebase", "Room Database"]', 'https://play.google.com/store/apps/details?id=com.kidoprotect.app&hl=en_IN&gl=US', TRUE, 1),
('Rupyz', 'ERP system to manage staff and productivity of industrial sector', 'Aug 2024 - Present', '["Android", "ERP", "Industrial Management"]', 'https://play.google.com/store/apps/details?id=com.app.rupyz', TRUE, 2),
('DolleUp', 'Native Android app blending social media and shopping convenience. Integrated product features into posts and stories for direct purchasing.', 'Apr 2023 - Feb 2024', '["Android", "Kotlin", "Social Media", "E-commerce"]', 'https://play.google.com/store/apps/details?id=com.app.dolledup&hl=en_IN&gl=US', TRUE, 3),
('HappyMob', 'Platform for business registration and local search', 'Oct 2023 - Dec 2023', '["Android", "Local Search", "Business Platform"]', 'https://play.google.com/store/apps/details?id=com.app.happy_mob&hl=en-IN', FALSE, 4),
('Magenative Shopify App', 'Shopify mobile app builder featuring themes, AR, and push notifications', 'Jan 2021 - Mar 2023', '["Android", "Shopify", "AR", "Push Notifications"]', 'https://play.google.com/store/apps/details?id=com.shopify.shopifyapp&hl=en_IN&gl=US', FALSE, 5),
('Magenative Woo', 'WooCommerce mobile app builder featuring themes, and push notifications', 'Jun 2020 - Aug 2022', '["Android", "WooCommerce", "App Builder"]', 'https://play.google.com/store/apps/details?id=com.magenative.woocommerce', FALSE, 6);

-- Insert skills
INSERT INTO skills (name, category, proficiency_level, icon, display_order) VALUES 
('Android SDK', 'Technical', 95, 'android', 1),
('Java', 'Programming', 90, 'java', 2),
('Kotlin', 'Programming', 92, 'kotlin', 3),
('MVVM Architecture', 'Technical', 88, 'architecture', 4),
('Room Database', 'Technical', 85, 'database', 5),
('Firebase', 'Technical', 87, 'firebase', 6),
('UI/UX Design', 'Design', 80, 'design', 7),
('Problem Solving', 'Soft', 95, 'puzzle', 8),
('Team Leadership', 'Soft', 85, 'leadership', 9);

-- Insert achievements
INSERT INTO achievements (title, description, date_achieved, metric_value, display_order) VALUES 
('Increased app downloads by 50% in six months', 'Successfully implemented marketing strategies and feature improvements that resulted in significant user growth', '2024-06-01', '50%', 1),
('Reduced app crash rates by 80% over one year', 'Implemented robust error handling and performance optimizations across multiple applications', '2024-01-01', '80%', 2),
('Improved user engagement by 30% through feature implementation', 'Designed and developed user-centric features that significantly enhanced user interaction and retention', '2023-12-01', '30%', 3),
('Led team to deliver project two months ahead of schedule', 'Successfully managed cross-functional team and optimized development processes to achieve early delivery', '2023-10-01', '2 months', 4);

-- Insert admin user (password should be hashed in production)
INSERT INTO admin_users (username, email, password_hash, role) VALUES 
('admin', 'rvrai1998@gmail.com', '$2b$10$example_hash_replace_with_real_hash', 'admin');
```

## Netlify Functions Setup

Create the following Netlify Functions in your `.netlify/functions/` directory:

### 3. Database Connection Function
File: `.netlify/functions/db-connection.js`

```javascript
import { neon } from '@netlify/neon';

const sql = neon(); // automatically uses NETLIFY_DATABASE_URL

export { sql };
```

### 4. API Endpoints

#### Personal Info API
File: `.netlify/functions/personal-info.js`

```javascript
import { sql } from './db-connection.js';

export async function handler(event, context) {
    const { httpMethod } = event;
    
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Content-Type': 'application/json'
    };

    if (httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        switch (httpMethod) {
            case 'GET':
                const [personalInfo] = await sql`SELECT * FROM personal_info ORDER BY id DESC LIMIT 1`;
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify(personalInfo || {})
                };

            case 'PUT':
                const data = JSON.parse(event.body);
                const [updated] = await sql`
                    UPDATE personal_info 
                    SET name = ${data.name}, 
                        title = ${data.title}, 
                        phone = ${data.phone}, 
                        location = ${data.location}, 
                        email = ${data.email}, 
                        linkedin = ${data.linkedin}, 
                        summary = ${data.summary},
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = (SELECT id FROM personal_info ORDER BY id DESC LIMIT 1)
                    RETURNING *
                `;
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify(updated)
                };

            default:
                return {
                    statusCode: 405,
                    headers,
                    body: JSON.stringify({ error: 'Method not allowed' })
                };
        }
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
}
```

#### Projects API
File: `.netlify/functions/projects.js`

```javascript
import { sql } from './db-connection.js';

export async function handler(event, context) {
    const { httpMethod, path } = event;
    
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Content-Type': 'application/json'
    };

    if (httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        switch (httpMethod) {
            case 'GET':
                const projects = await sql`
                    SELECT * FROM projects 
                    ORDER BY display_order ASC, created_at DESC
                `;
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify(projects)
                };

            case 'POST':
                const newProject = JSON.parse(event.body);
                const [created] = await sql`
                    INSERT INTO projects (name, description, duration, tech_stack, play_store_link, github_link, image_url, featured, status, display_order)
                    VALUES (${newProject.name}, ${newProject.description}, ${newProject.duration}, ${newProject.tech_stack}, ${newProject.play_store_link}, ${newProject.github_link}, ${newProject.image_url}, ${newProject.featured}, ${newProject.status}, ${newProject.display_order})
                    RETURNING *
                `;
                return {
                    statusCode: 201,
                    headers,
                    body: JSON.stringify(created)
                };

            case 'PUT':
                const updatedProject = JSON.parse(event.body);
                const projectId = event.pathParameters?.id;
                const [updated] = await sql`
                    UPDATE projects 
                    SET name = ${updatedProject.name}, 
                        description = ${updatedProject.description}, 
                        duration = ${updatedProject.duration}, 
                        tech_stack = ${updatedProject.tech_stack}, 
                        play_store_link = ${updatedProject.play_store_link}, 
                        github_link = ${updatedProject.github_link}, 
                        image_url = ${updatedProject.image_url}, 
                        featured = ${updatedProject.featured}, 
                        status = ${updatedProject.status}, 
                        display_order = ${updatedProject.display_order},
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = ${projectId}
                    RETURNING *
                `;
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify(updated)
                };

            case 'DELETE':
                const deleteId = event.pathParameters?.id;
                await sql`DELETE FROM projects WHERE id = ${deleteId}`;
                return {
                    statusCode: 204,
                    headers,
                    body: ''
                };

            default:
                return {
                    statusCode: 405,
                    headers,
                    body: JSON.stringify({ error: 'Method not allowed' })
                };
        }
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
}
```

### 5. Frontend Integration

Update your `app.js` to use the actual Netlify Functions:

```javascript
// Database API calls
const API_BASE = '/.netlify/functions';

class DatabaseAPI {
    async get(endpoint) {
        const response = await fetch(`${API_BASE}/${endpoint}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
    }

    async post(endpoint, data) {
        const response = await fetch(`${API_BASE}/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
    }

    async put(endpoint, data) {
        const response = await fetch(`${API_BASE}/${endpoint}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
    }

    async delete(endpoint) {
        const response = await fetch(`${API_BASE}/${endpoint}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    }
}

const db = new DatabaseAPI();

// Load data from database
async function loadPortfolioData() {
    try {
        const [personalInfo, projects, skills, workExperience, achievements] = await Promise.all([
            db.get('personal-info'),
            db.get('projects'),
            db.get('skills'),
            db.get('work-experience'),
            db.get('achievements')
        ]);

        currentData = {
            personalInfo,
            projects,
            skills,
            workExperience,
            achievements
        };

        renderPortfolio();
    } catch (error) {
        console.error('Error loading portfolio data:', error);
        // Fallback to default data if database fails
        currentData = DEFAULT_DATA;
        renderPortfolio();
    }
}
```

## Deployment Steps

1. **Set up your database schema** by running the SQL commands in your Neon database console
2. **Create the Netlify Functions** in your project's `.netlify/functions/` directory
3. **Update your frontend code** to use the real API endpoints
4. **Deploy to Netlify** - the environment variables are already configured
5. **Test the admin panel** using credentials: admin/admin123

## Security Notes

- Change the default admin password immediately
- Implement proper password hashing (bcrypt)
- Add rate limiting for API endpoints
- Validate and sanitize all user inputs
- Use HTTPS only for production

The admin panel allows you to:
- Edit personal information
- Add/edit/delete projects
- Manage skills and proficiency levels
- Update work experience
- Modify achievements
- All changes are instantly reflected on the portfolio

Your portfolio is now completely dynamic and powered by Netlify DB!