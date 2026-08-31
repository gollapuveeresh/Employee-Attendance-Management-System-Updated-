from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CheckInView,
    ToggleBreakView,
    CheckOutView,
    TodayAttendanceView,
    AttendanceHistoryView,
    AttendanceViewSet
)

router = DefaultRouter()
router.register(r'records', AttendanceViewSet, basename='attendance-records')

urlpatterns = [
    path('check-in/', CheckInView.as_view(), name='check_in'),
    path('break/toggle/', ToggleBreakView.as_view(), name='toggle_break'),
    path('check-out/', CheckOutView.as_view(), name='check_out'),
    path('today/', TodayAttendanceView.as_view(), name='today_attendance'),
    path('history/', AttendanceHistoryView.as_view(), name='attendance_history'),
    path('', include(router.urls)),
]
