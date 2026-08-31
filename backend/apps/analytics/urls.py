from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExecutiveDashboardView, HRDashboardView, AuditLogViewSet

router = DefaultRouter()
router.register(r'audit-logs', AuditLogViewSet, basename='audit-logs')

urlpatterns = [
    path('executive-dashboard/', ExecutiveDashboardView.as_view(), name='executive_dashboard'),
    path('hr-dashboard/', HRDashboardView.as_view(), name='hr_dashboard'),
    path('', include(router.urls)),
]
