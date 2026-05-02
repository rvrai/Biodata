from django.core.management.base import BaseCommand
from portfolio.models import SiteConfig, Section, Profile, Skill, Experience, Project, Education, Achievement, SocialLink
import json

class Command(BaseCommand):
    help = 'Seeds the database with initial portfolio data'

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding database...")

        # Site Config
        SiteConfig.objects.update_or_create(
            id=1,
            defaults={
                'site_name': 'Raj Vaibhav Rai',
                'site_title': 'Raj Vaibhav Rai | Senior Android Developer',
                'meta_description': 'Senior Android Developer with 5+ years of experience building scalable, high-performance mobile applications.',
                'meta_keywords': 'Android, Kotlin, Java, Jetpack, MVVM, Developer',
                'primary_color': '#00d9ff',
                'secondary_color': '#ff6b35',
                'background_color': '#030712',
            }
        )

        # Profile
        Profile.objects.get_or_create(
            name="Raj Vaibhav Rai",
            title="Senior Android Developer",
            tagline="Senior Android Developer with 5+ years of experience building scalable, high-performance mobile applications using Kotlin and Java.",
            bio="Expertise in MVVM, Clean Architecture, Coroutines, Flow, Jetpack, Room, Hilt, Firebase, REST APIs, and modern Android development practices. Experienced in performance optimization, crash reduction, CI/CD collaboration, and delivering user-centric products in agile cross-functional teams.",
            phone="+91-8423914735",
            email="rvrai1998@gmail.com",
            location="Noida, INDIA",
            experience_years="5 Years 5 Months",
            is_active=True
        )

        # Sections
        sections = [
            ('hero', 'Hero', 'Raj Vaibhav Rai', 'Senior Android Developer'),
            ('about', 'About Me', 'About', 'Get to know me'),
            ('skills', 'Skills', 'My Skills', 'What I bring to the table'),
            ('experience', 'Experience', 'Experience', 'My professional journey'),
            ('projects', 'Projects', 'Featured Work', 'Apps I have built'),
            ('education', 'Education', 'Education', 'My academic background'),
            ('achievements', 'Achievements', 'Achievements', 'Milestones'),
            ('contact', 'Contact', 'Reach Out', 'Let us connect'),
        ]
        
        for i, (stype, name, title, sub) in enumerate(sections):
            Section.objects.update_or_create(
                section_type=stype,
                defaults={
                    'name': name,
                    'title': title,
                    'subtitle': sub,
                    'order': i,
                    'is_visible': True
                }
            )

        # Skills
        skills = [
            ('Java', 'language'), ('Kotlin', 'language'),
            ('Jetpack', 'framework'), ('Material Design', 'framework'), ('MVVM', 'architecture'),
            ('Clean Architecture', 'architecture'), ('Coroutine', 'framework'), ('Flow', 'framework'),
            ('Dagger', 'tool'), ('Hilt', 'tool'), ('Rest API Integration', 'tool'), ('Retrofit', 'tool'),
            ('Room', 'tool'), ('DataStore', 'tool'), ('Firebase', 'platform'), ('Crashlytics', 'tool'),
            ('Android Studio', 'tool'), ('GIT', 'tool'), ('Github', 'tool'), ('Agile', 'other'),
            ('Jetpack Compose', 'framework')
        ]
        for i, (sname, scat) in enumerate(skills):
            Skill.objects.update_or_create(name=sname, defaults={'category': scat, 'order': i, 'proficiency': 90})

        # Experiences
        Experience.objects.update_or_create(
            role="Software Developer",
            company="Rupyz Fintech Private Limited",
            defaults={
                'period': 'May 2024 - Present',
                'is_current': True,
                'order': 0,
                'highlights': [
                    "Developed and maintained scalable Android applications using Kotlin and Java.",
                    "Implemented MVVM architecture with Room, Hilt, Coroutines, and Flow.",
                    "Improved performance, stability, and feature scalability across product modules.",
                    "Collaborated with product, design, and QA teams in agile delivery cycles."
                ]
            }
        )
        Experience.objects.update_or_create(
            role="Android Developer",
            company="Techahead Software Private Limited",
            defaults={
                'period': 'Apr 2023 - May 2024',
                'is_current': False,
                'order': 1,
                'highlights': [
                    "Built advanced Android features improving user engagement and app performance.",
                    "Worked on modern Android components including DataStore and Flow.",
                    "Contributed to scalable architecture and optimized code quality.",
                    "Coordinated with cross-functional teams for production releases."
                ]
            }
        )
        
        # Projects
        Project.objects.update_or_create(
            name="Kido Protect Parental Control",
            defaults={
                'description': "Parental control application for screen monitoring and restrictions.",
                'tech_stack': ["Kotlin", "Jetpack", "Firebase"],
                'duration_days': 123,
                'order': 0,
                'is_featured': True
            }
        )
        Project.objects.update_or_create(
            name="DolledUp",
            defaults={
                'description': "Social-commerce Android application integrating content and shopping.",
                'tech_stack': ["Kotlin", "MVVM", "Firebase", "REST APIs"],
                'duration_days': 555,
                'order': 1,
                'is_featured': True
            }
        )
        Project.objects.update_or_create(
            name="Magenative Woocommerce App",
            defaults={
                'description': "Sophisticated native Android solution for WooCommerce with dynamic experience. Seamlessly synchronizes products and categories, streamlined checkout, wishlist support, payment gateways, advanced search, social login, Google Analytics integration.",
                'tech_stack': ["Java", "Kotlin", "WooCommerce API"],
                'duration_days': 153,
                'order': 2,
                'is_featured': True
            }
        )

        # Education
        Education.objects.update_or_create(
            degree="B.Tech/B.E.",
            institution="ITM School of Management Lucknow",
            defaults={
                'field': "Computers",
                'grade': "7.4/10",
                'year': 2022,
                'order': 0
            }
        )

        # Social Links
        SocialLink.objects.update_or_create(platform="linkedin", defaults={'label': 'LinkedIn', 'url': 'https://linkedin.com/in/rvrai', 'order': 0})
        SocialLink.objects.update_or_create(platform="github", defaults={'label': 'GitHub', 'url': 'https://github.com/rvrai', 'order': 1})
        SocialLink.objects.update_or_create(platform="email", defaults={'label': 'Email', 'url': 'mailto:rvrai1998@gmail.com', 'order': 2})

        self.stdout.write(self.style.SUCCESS("Successfully seeded database!"))
