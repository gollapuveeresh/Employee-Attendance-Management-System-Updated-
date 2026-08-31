import { apiRequest } from './client'

export interface LeaveBalanceData {
  id: number
  leave_type: number
  leave_type_name: string
  total_days: number
  used_days: number
  pending_days: number
  remaining_days: number
}

export interface LeaveRequestData {
  id: number
  user_name: string
  employee_id: string
  department: string
  leave_type_name: string
  start_date: string
  end_date: string
  days: number
  reason: string
  status: 'Pending' | 'Approved' | 'Rejected'
  reviewed_by_name?: string
  review_notes?: string
  created_at: string
}

export const leavesApi = {
  getBalances: async () => apiRequest<LeaveBalanceData[]>('/leaves/balances/'),
  getMyRequests: async () => apiRequest<LeaveRequestData[]>('/leaves/my-requests/'),
  getPending: async () => apiRequest<LeaveRequestData[]>('/leaves/pending/'),
  apply: async (data: { leave_type: string | number; start_date: string; end_date: string; days: number; reason: string }) =>
    apiRequest<LeaveRequestData>('/leaves/apply/', { method: 'POST', body: JSON.stringify(data) }),
  action: async (id: number, action: 'approve' | 'reject', notes?: string) =>
    apiRequest<LeaveRequestData>('/leaves/' + id + '/action/', { method: 'POST', body: JSON.stringify({ action, notes }) }),
}
