"""
Portfolio app URL configuration.
Public API endpoints + Admin CRUD endpoints.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Admin router for CRUD ViewSets
admin_router = DefaultRouter()
admin_router.register(r'sections', views.AdminSectionViewSet, basename='admin-sections')
admin_router.register(r'profile', views.AdminProfileViewSet, basename='admin-profile')
admin_router.register(r'skills', views.AdminSkillViewSet, basename='admin-skills')
admin_router.register(r'experience', views.AdminExperienceViewSet, basename='admin-experience')
admin_router.register(r'projects', views.AdminProjectViewSet, basename='admin-projects')
admin_router.register(r'education', views.AdminEducationViewSet, basename='admin-education')
admin_router.register(r'achievements', views.AdminAchievementViewSet, basename='admin-achievements')
admin_router.register(r'social-links', views.AdminSocialLinkViewSet, basename='admin-social-links')
admin_router.register(r'messages', views.AdminContactMessageViewSet, basename='admin-messages')

urlpatterns = [
    # ── Public Endpoints ──
    path('portfolio/', views.PortfolioDataView.as_view(), name='portfolio-all'),
    path('site-config/', views.SiteConfigView.as_view(), name='site-config'),
    path('sections/', views.SectionListView.as_view(), name='sections'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('skills/', views.SkillListView.as_view(), name='skills'),
    path('experience/', views.ExperienceListView.as_view(), name='experience'),
    path('projects/', views.ProjectListView.as_view(), name='projects'),
    path('education/', views.EducationListView.as_view(), name='education'),
    path('achievements/', views.AchievementListView.as_view(), name='achievements'),
    path('social-links/', views.SocialLinkListView.as_view(), name='social-links'),
    path('contact/', views.ContactSubmitView.as_view(), name='contact'),

    # ── Admin Auth ──
    path('admin/login/', views.AdminLoginView.as_view(), name='admin-login'),
    path('admin/token/refresh/', views.AdminTokenRefreshView.as_view(), name='admin-token-refresh'),

    # ── Admin Site Config ──
    path('admin/site-config/', views.AdminSiteConfigView.as_view(), name='admin-site-config'),

    # ── Admin CRUD (router) ──
    path('admin/', include(admin_router.urls)),
]
