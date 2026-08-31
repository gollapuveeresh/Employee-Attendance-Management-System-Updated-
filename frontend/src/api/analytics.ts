import { apiRequest } from './client'

export const analyticsApi = {
  getExecutiveDashboard: async () => apiRequest<any>('/analytics/executive-dashboard/'),
  getHRDashboard: async () => apiRequest<any>('/analytics/hr-dashboard/'),
  getCompanies: async () => apiRequest<any>('/organization/companies/'),
  getBranches: async () => apiRequest<any>('/organization/branches/'),
  getDepartments: async () => apiRequest<any>('/organization/departments/'),
  getUsers: async (params?: string) => apiRequest<any>('/auth/users/' + (params ? '?' + params : '')),
}
