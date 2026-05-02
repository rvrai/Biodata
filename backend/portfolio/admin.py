"""
Portfolio app admin registration.
Registers all models with Django admin for superuser access.
"""
from django.contrib import admin
from .models import (
    SiteConfig, Section, Profile, Skill, Experience,
    Project, Education, Achievement, SocialLink, ContactMessage
)


@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = ['site_name', 'site_title', 'primary_color', 'updated_at']


@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ['name', 'section_type', 'order', 'is_visible', 'updated_at']
    list_filter = ['section_type', 'is_visible']
    list_editable = ['order', 'is_visible']
    ordering = ['order']


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'title', 'email', 'is_active', 'updated_at']
    list_filter = ['is_active']


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'proficiency', 'order', 'is_visible']
    list_filter = ['category', 'is_visible']
    list_editable = ['order', 'is_visible', 'proficiency']
    ordering = ['order']


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['role', 'company', 'period', 'order', 'is_visible']
    list_filter = ['is_visible', 'is_current']
    list_editable = ['order', 'is_visible']
    ordering = ['order']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'is_featured', 'order', 'is_visible', 'updated_at']
    list_filter = ['is_featured', 'is_visible']
    list_editable = ['order', 'is_visible', 'is_featured']
    ordering = ['order']


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['degree', 'institution', 'year', 'order', 'is_visible']
    list_editable = ['order', 'is_visible']
    ordering = ['order']


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ['title', 'metric_value', 'order', 'is_visible']
    list_editable = ['order', 'is_visible']
    ordering = ['order']


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ['platform', 'label', 'url', 'order', 'is_visible']
    list_filter = ['platform', 'is_visible']
    list_editable = ['order', 'is_visible']
    ordering = ['order']


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'is_read', 'created_at']
    list_filter = ['is_read']
    readonly_fields = ['name', 'email', 'subject', 'message', 'created_at']
    ordering = ['-created_at']
