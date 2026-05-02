"""
Portfolio app models.
Defines all data models for the portfolio website.
Each model maps to an API endpoint and admin dashboard section.
"""
import json
from django.db import models
from django.contrib.auth.models import User


class SiteConfig(models.Model):
    """Global site configuration — single row table."""
    site_name = models.CharField(max_length=100, default="Portfolio")
    site_title = models.CharField(max_length=200, default="Developer Portfolio")
    meta_description = models.TextField(blank=True, default="")
    meta_keywords = models.CharField(max_length=500, blank=True, default="")
    favicon_url = models.URLField(blank=True, default="")
    og_image_url = models.URLField(blank=True, default="")
    primary_color = models.CharField(max_length=7, default="#00d9ff")
    secondary_color = models.CharField(max_length=7, default="#ff6b35")
    background_color = models.CharField(max_length=7, default="#030712")
    enable_particles = models.BooleanField(default=True)
    enable_animations = models.BooleanField(default=True)
    custom_css = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Site Configuration"
        verbose_name_plural = "Site Configuration"

    def __str__(self):
        return self.site_name


class Section(models.Model):
    """
    Dynamic page sections.
    Controls ordering, visibility, and configuration of each portfolio section.
    """
    SECTION_TYPES = [
        ('hero', 'Hero'),
        ('about', 'About'),
        ('skills', 'Skills'),
        ('experience', 'Experience'),
        ('projects', 'Projects'),
        ('education', 'Education'),
        ('achievements', 'Achievements'),
        ('contact', 'Contact'),
        ('footer', 'Footer'),
        ('custom', 'Custom'),
    ]

    name = models.CharField(max_length=100)
    section_type = models.CharField(max_length=20, choices=SECTION_TYPES)
    title = models.CharField(max_length=200, blank=True, default="")
    subtitle = models.CharField(max_length=500, blank=True, default="")
    order = models.IntegerField(default=0)
    is_visible = models.BooleanField(default=True)
    config_json = models.JSONField(
        default=dict, blank=True,
        help_text="Extra configuration as JSON (layout, style overrides, etc.)"
    )
    custom_html = models.TextField(
        blank=True, default="",
        help_text="Custom HTML content for 'custom' section type"
    )
    css_class = models.CharField(max_length=200, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']
        verbose_name = "Section"
        verbose_name_plural = "Sections"

    def __str__(self):
        return f"{self.name} ({self.section_type})"


class Profile(models.Model):
    """Personal profile information."""
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    tagline = models.CharField(
        max_length=500, blank=True,
        default="Building intelligent systems at the intersection of development and innovation."
    )
    bio = models.TextField(blank=True, default="")
    phone = models.CharField(max_length=20, blank=True, default="")
    email = models.EmailField(blank=True, default="")
    location = models.CharField(max_length=200, blank=True, default="")
    photo_url = models.URLField(blank=True, default="")
    resume_url = models.URLField(blank=True, default="")
    experience_years = models.CharField(max_length=50, blank=True, default="")
    quotes = models.JSONField(
        default=list, blank=True,
        help_text="List of quote strings for the about section"
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profiles"

    def __str__(self):
        return self.name


class Skill(models.Model):
    """Individual skill with category."""
    CATEGORIES = [
        ('language', 'Language'),
        ('framework', 'Framework'),
        ('tool', 'Tool'),
        ('platform', 'Platform'),
        ('architecture', 'Architecture'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORIES, default='other')
    icon_name = models.CharField(
        max_length=100, blank=True, default="",
        help_text="Icon identifier (e.g., 'kotlin', 'react', 'firebase')"
    )
    proficiency = models.IntegerField(
        default=80,
        help_text="Proficiency percentage (0-100)"
    )
    order = models.IntegerField(default=0)
    is_visible = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'name']
        verbose_name = "Skill"
        verbose_name_plural = "Skills"

    def __str__(self):
        return f"{self.name} ({self.category})"


class Experience(models.Model):
    """Work experience entries."""
    role = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    company_url = models.URLField(blank=True, default="")
    period = models.CharField(max_length=100)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)
    description = models.TextField(blank=True, default="")
    highlights = models.JSONField(
        default=list, blank=True,
        help_text="List of highlight strings"
    )
    tech_used = models.JSONField(
        default=list, blank=True,
        help_text="List of technologies used"
    )
    order = models.IntegerField(default=0)
    is_visible = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-start_date']
        verbose_name = "Experience"
        verbose_name_plural = "Experiences"

    def __str__(self):
        return f"{self.role} at {self.company}"


class Project(models.Model):
    """Project showcase entries."""
    name = models.CharField(max_length=200)
    description = models.TextField()
    short_description = models.CharField(max_length=300, blank=True, default="")
    icon_url = models.URLField(
        blank=True, default="",
        help_text="App-style icon for mobile skeleton display"
    )
    screenshot_url = models.URLField(blank=True, default="")
    live_url = models.URLField(blank=True, default="")
    github_url = models.URLField(blank=True, default="")
    playstore_url = models.URLField(blank=True, default="")
    tech_stack = models.JSONField(
        default=list, blank=True,
        help_text="List of technology names"
    )
    highlights = models.JSONField(
        default=list, blank=True,
        help_text="List of feature highlights"
    )
    duration_days = models.IntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    is_visible = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def __str__(self):
        return self.name


class Education(models.Model):
    """Education entries."""
    degree = models.CharField(max_length=200)
    field = models.CharField(max_length=200, blank=True, default="")
    institution = models.CharField(max_length=300)
    institution_url = models.URLField(blank=True, default="")
    grade = models.CharField(max_length=50, blank=True, default="")
    year = models.IntegerField(null=True, blank=True)
    start_year = models.IntegerField(null=True, blank=True)
    end_year = models.IntegerField(null=True, blank=True)
    description = models.TextField(blank=True, default="")
    order = models.IntegerField(default=0)
    is_visible = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-year']
        verbose_name = "Education"
        verbose_name_plural = "Education"

    def __str__(self):
        return f"{self.degree} — {self.institution}"


class Achievement(models.Model):
    """Achievement/accomplishment entries."""
    title = models.CharField(max_length=300)
    description = models.TextField(blank=True, default="")
    icon_name = models.CharField(max_length=100, blank=True, default="")
    metric_value = models.CharField(
        max_length=50, blank=True, default="",
        help_text="e.g., '80%', '50%', '30%'"
    )
    order = models.IntegerField(default=0)
    is_visible = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order']
        verbose_name = "Achievement"
        verbose_name_plural = "Achievements"

    def __str__(self):
        return self.title


class SocialLink(models.Model):
    """Social media / contact links."""
    PLATFORMS = [
        ('github', 'GitHub'),
        ('linkedin', 'LinkedIn'),
        ('twitter', 'Twitter/X'),
        ('email', 'Email'),
        ('portfolio', 'Portfolio'),
        ('playstore', 'Play Store'),
        ('other', 'Other'),
    ]

    platform = models.CharField(max_length=20, choices=PLATFORMS)
    label = models.CharField(max_length=100)
    url = models.CharField(max_length=500)
    icon_name = models.CharField(max_length=100, blank=True, default="")
    order = models.IntegerField(default=0)
    is_visible = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order']
        verbose_name = "Social Link"
        verbose_name_plural = "Social Links"

    def __str__(self):
        return f"{self.platform}: {self.label}"


class ContactMessage(models.Model):
    """Contact form submissions."""
    name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.CharField(max_length=300, blank=True, default="")
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Contact Message"
        verbose_name_plural = "Contact Messages"

    def __str__(self):
        return f"From {self.name} — {self.subject or 'No subject'}"
