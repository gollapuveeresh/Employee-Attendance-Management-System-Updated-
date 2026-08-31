from django.db import models

class Company(models.Model):
    name = models.CharField(max_length=200, default='VPD Technologies Pvt Ltd')
    company_code = models.CharField(max_length=50, unique=True, default='CO-001')
    plan = models.CharField(max_length=50, default='Enterprise')
    status = models.CharField(max_length=50, default='Active')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Branch(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='branches', null=True, blank=True)
    name = models.CharField(max_length=150)
    city = models.CharField(max_length=100)
    address = models.TextField(blank=True, null=True)
    is_headquarters = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Department(models.Model):
    name = models.CharField(max_length=150)
    code = models.CharField(max_length=50, unique=True)
    branch = models.ForeignKey(Branch, on_delete=models.SET_NULL, null=True, blank=True, related_name='departments')
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
