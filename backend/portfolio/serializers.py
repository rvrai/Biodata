"""
Portfolio app serializers.
DRF serializers for API data transformation.
Separate serializers for public (read-only) and admin (full CRUD) endpoints.
"""
from rest_framework import serializers
from .models import (
    SiteConfig, Section, Profile, Skill, Experience,
    Project, Education, Achievement, SocialLink, ContactMessage
)


# ─── Public Serializers (Read-Only) ─────────────────────────────────────────

class SiteConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfig
        exclude = ['custom_css']


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = ['phone']


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'category', 'icon_name', 'proficiency', 'order']


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            'id', 'role', 'company', 'company_url', 'period',
            'is_current', 'description', 'highlights', 'tech_used', 'order'
        ]


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id', 'name', 'description', 'short_description', 'icon_url',
            'screenshot_url', 'live_url', 'github_url', 'playstore_url',
            'tech_stack', 'highlights', 'duration_days', 'is_featured', 'order'
        ]


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = [
            'id', 'degree', 'field', 'institution', 'institution_url',
            'grade', 'year', 'start_year', 'end_year', 'description', 'order'
        ]


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ['id', 'title', 'description', 'icon_name', 'metric_value', 'order']


class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = ['id', 'platform', 'label', 'url', 'icon_name', 'order']


class ContactMessageCreateSerializer(serializers.ModelSerializer):
    """Write-only serializer for contact form submissions."""
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']


# ─── Admin Serializers (Full CRUD) ──────────────────────────────────────────

class AdminSiteConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfig
        fields = '__all__'


class AdminSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'


class AdminProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class AdminSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'


class AdminExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'


class AdminProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class AdminEducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'


class AdminAchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = '__all__'


class AdminSocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = '__all__'


class AdminContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'


class SectionReorderSerializer(serializers.Serializer):
    """Serializer for reordering sections."""
    section_ids = serializers.ListField(
        child=serializers.IntegerField(),
        help_text="Ordered list of section IDs"
    )
