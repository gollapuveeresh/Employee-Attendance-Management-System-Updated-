from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    LeaveTypeViewSet,
    LeaveRequestViewSet,
    MyLeaveBalancesView,
    MyLeaveRequestsView,
    ApplyLeaveView,
    PendingLeavesView,
    ApproveRejectLeaveView
)

router = DefaultRouter()
router.register(r'types', LeaveTypeViewSet, basename='leave-types')
router.register(r'requests', LeaveRequestViewSet, basename='leave-requests')

urlpatterns = [
    path('balances/', MyLeaveBalancesView.as_view(), name='leave_balances'),
    path('my-requests/', MyLeaveRequestsView.as_view(), name='my_leave_requests'),
    path('apply/', ApplyLeaveView.as_view(), name='apply_leave'),
    path('pending/', PendingLeavesView.as_view(), name='pending_leaves'),
    path('<int:pk>/action/', ApproveRejectLeaveView.as_view(), name='approve_reject_leave'),
    path('', include(router.urls)),
]
