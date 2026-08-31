from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Company, Branch, Department
from .serializers import CompanySerializer, BranchSerializer, DepartmentSerializer
from apps.accounts.permissions import IsAdminRole, IsAdminOrHR

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all().prefetch_related('branches')
    serializer_class = CompanySerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminRole()]
        return [permissions.IsAuthenticated()]

class BranchViewSet(viewsets.ModelViewSet):
    queryset = Branch.objects.all().select_related('company').prefetch_related('departments', 'members')
    serializer_class = BranchSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'city', 'address']
    ordering_fields = ['name', 'created_at']

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminRole()]
        return [permissions.IsAuthenticated()]

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all().select_related('branch').prefetch_related('members')
    serializer_class = DepartmentSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['branch']
    search_fields = ['name', 'code', 'description']
    ordering_fields = ['name', 'code', 'created_at']

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminOrHR()]
        return [permissions.IsAuthenticated()]
