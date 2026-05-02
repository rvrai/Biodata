"""
Portfolio app views.
Public read-only endpoints + Admin CRUD endpoints with JWT authentication.
"""
from rest_framework import viewsets, generics, status, permissions
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from .models import (
    SiteConfig, Section, Profile, Skill, Experience,
    Project, Education, Achievement, SocialLink, ContactMessage
)
from .serializers import (
    SiteConfigSerializer, SectionSerializer, ProfileSerializer,
    SkillSerializer, ExperienceSerializer, ProjectSerializer,
    EducationSerializer, AchievementSerializer, SocialLinkSerializer,
    ContactMessageCreateSerializer,
    AdminSiteConfigSerializer, AdminSectionSerializer, AdminProfileSerializer,
    AdminSkillSerializer, AdminExperienceSerializer, AdminProjectSerializer,
    AdminEducationSerializer, AdminAchievementSerializer,
    AdminSocialLinkSerializer, AdminContactMessageSerializer,
    SectionReorderSerializer
)


# ─── Public Views (Read-Only) ───────────────────────────────────────────────

class SiteConfigView(generics.RetrieveAPIView):
    """GET /api/site-config/ — Returns single site configuration."""
    serializer_class = SiteConfigSerializer
    permission_classes = [permissions.AllowAny]

    def get_object(self):
        obj, _ = SiteConfig.objects.get_or_create(pk=1)
        return obj


class SectionListView(generics.ListAPIView):
    """GET /api/sections/ — Returns all visible sections ordered."""
    serializer_class = SectionSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Section.objects.filter(is_visible=True).order_by('order')


class ProfileView(generics.RetrieveAPIView):
    """GET /api/profile/ — Returns active profile."""
    serializer_class = ProfileSerializer
    permission_classes = [permissions.AllowAny]

    def get_object(self):
        return Profile.objects.filter(is_active=True).first()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance is None:
            return Response(
                {"detail": "No active profile found."},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class SkillListView(generics.ListAPIView):
    """GET /api/skills/ — Returns visible skills."""
    serializer_class = SkillSerializer
    permission_classes = [permissions.AllowAny]
    queryset = Skill.objects.filter(is_visible=True)


class ExperienceListView(generics.ListAPIView):
    """GET /api/experience/ — Returns visible experience entries."""
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.AllowAny]
    queryset = Experience.objects.filter(is_visible=True)


class ProjectListView(generics.ListAPIView):
    """GET /api/projects/ — Returns visible projects."""
    serializer_class = ProjectSerializer
    permission_classes = [permissions.AllowAny]
    queryset = Project.objects.filter(is_visible=True)


class EducationListView(generics.ListAPIView):
    """GET /api/education/ — Returns visible education entries."""
    serializer_class = EducationSerializer
    permission_classes = [permissions.AllowAny]
    queryset = Education.objects.filter(is_visible=True)


class AchievementListView(generics.ListAPIView):
    """GET /api/achievements/ — Returns visible achievements."""
    serializer_class = AchievementSerializer
    permission_classes = [permissions.AllowAny]
    queryset = Achievement.objects.filter(is_visible=True)


class SocialLinkListView(generics.ListAPIView):
    """GET /api/social-links/ — Returns visible social links."""
    serializer_class = SocialLinkSerializer
    permission_classes = [permissions.AllowAny]
    queryset = SocialLink.objects.filter(is_visible=True)


class ContactSubmitView(generics.CreateAPIView):
    """POST /api/contact/ — Submit contact form message."""
    serializer_class = ContactMessageCreateSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": "Message sent successfully!"},
            status=status.HTTP_201_CREATED
        )


class PortfolioDataView(APIView):
    """GET /api/portfolio/ — Returns ALL portfolio data in a single response."""
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        site_config, _ = SiteConfig.objects.get_or_create(pk=1)
        profile = Profile.objects.filter(is_active=True).first()

        data = {
            "site_config": SiteConfigSerializer(site_config).data,
            "sections": SectionSerializer(
                Section.objects.filter(is_visible=True), many=True
            ).data,
            "profile": ProfileSerializer(profile).data if profile else None,
            "skills": SkillSerializer(
                Skill.objects.filter(is_visible=True), many=True
            ).data,
            "experience": ExperienceSerializer(
                Experience.objects.filter(is_visible=True), many=True
            ).data,
            "projects": ProjectSerializer(
                Project.objects.filter(is_visible=True), many=True
            ).data,
            "education": EducationSerializer(
                Education.objects.filter(is_visible=True), many=True
            ).data,
            "achievements": AchievementSerializer(
                Achievement.objects.filter(is_visible=True), many=True
            ).data,
            "social_links": SocialLinkSerializer(
                SocialLink.objects.filter(is_visible=True), many=True
            ).data,
        }
        return Response(data)


# ─── Admin Auth ──────────────────────────────────────────────────────────────

class AdminLoginView(APIView):
    """POST /api/admin/login/ — Admin JWT login."""
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response(
                {"detail": "Username and password are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(username=username, password=password)
        if user is None or not user.is_staff:
            return Response(
                {"detail": "Invalid credentials or insufficient permissions."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "is_staff": user.is_staff,
            }
        })


class AdminTokenRefreshView(APIView):
    """POST /api/admin/token/refresh/ — Refresh JWT token."""
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response(
                {"detail": "Refresh token is required."},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            refresh = RefreshToken(refresh_token)
            return Response({
                "access": str(refresh.access_token),
            })
        except Exception:
            return Response(
                {"detail": "Invalid or expired refresh token."},
                status=status.HTTP_401_UNAUTHORIZED
            )


# ─── Admin CRUD Views ───────────────────────────────────────────────────────

class AdminSiteConfigView(generics.RetrieveUpdateAPIView):
    """GET/PUT /api/admin/site-config/ — Manage site configuration."""
    serializer_class = AdminSiteConfigSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_object(self):
        obj, _ = SiteConfig.objects.get_or_create(pk=1)
        return obj


class AdminSectionViewSet(viewsets.ModelViewSet):
    """CRUD /api/admin/sections/ — Manage sections."""
    serializer_class = AdminSectionSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = Section.objects.all()

    @action(detail=False, methods=['post'])
    def reorder(self, request):
        """POST /api/admin/sections/reorder/ — Reorder sections."""
        serializer = SectionReorderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        section_ids = serializer.validated_data['section_ids']

        for index, section_id in enumerate(section_ids):
            Section.objects.filter(id=section_id).update(order=index)

        return Response({"detail": "Sections reordered successfully."})

    @action(detail=True, methods=['post'])
    def toggle_visibility(self, request, pk=None):
        """POST /api/admin/sections/{id}/toggle_visibility/ — Toggle visibility."""
        section = self.get_object()
        section.is_visible = not section.is_visible
        section.save()
        return Response(AdminSectionSerializer(section).data)


class AdminProfileViewSet(viewsets.ModelViewSet):
    """CRUD /api/admin/profile/ — Manage profiles."""
    serializer_class = AdminProfileSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = Profile.objects.all()


class AdminSkillViewSet(viewsets.ModelViewSet):
    """CRUD /api/admin/skills/ — Manage skills."""
    serializer_class = AdminSkillSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = Skill.objects.all()


class AdminExperienceViewSet(viewsets.ModelViewSet):
    """CRUD /api/admin/experience/ — Manage experience."""
    serializer_class = AdminExperienceSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = Experience.objects.all()


class AdminProjectViewSet(viewsets.ModelViewSet):
    """CRUD /api/admin/projects/ — Manage projects."""
    serializer_class = AdminProjectSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = Project.objects.all()


class AdminEducationViewSet(viewsets.ModelViewSet):
    """CRUD /api/admin/education/ — Manage education."""
    serializer_class = AdminEducationSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = Education.objects.all()


class AdminAchievementViewSet(viewsets.ModelViewSet):
    """CRUD /api/admin/achievements/ — Manage achievements."""
    serializer_class = AdminAchievementSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = Achievement.objects.all()


class AdminSocialLinkViewSet(viewsets.ModelViewSet):
    """CRUD /api/admin/social-links/ — Manage social links."""
    serializer_class = AdminSocialLinkSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = SocialLink.objects.all()


class AdminContactMessageViewSet(viewsets.ModelViewSet):
    """CRUD /api/admin/messages/ — Manage contact messages."""
    serializer_class = AdminContactMessageSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = ContactMessage.objects.all()

    @action(detail=True, methods=['post'])
    def mark_read(self, request, pk=None):
        """POST /api/admin/messages/{id}/mark_read/ — Mark message as read."""
        msg = self.get_object()
        msg.is_read = True
        msg.save()
        return Response(AdminContactMessageSerializer(msg).data)
