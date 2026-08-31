import { apiRequest } from './client'

export interface AttendanceRecordData {
  id: number
  date: string
  check_in: string | null
  check_out: string | null
  status: 'Present' | 'Late' | 'Half Day' | 'Absent' | 'Leave'
  working_hours: number
  break_duration_seconds: number
  is_on_break: boolean
}

export interface TodayAttendanceResponse {
  status: 'not-checked-in' | 'checked-in' | 'on-break' | 'checked-out'
  elapsed_seconds: number
  break_duration_seconds: number
  record: AttendanceRecordData | null
}

export const attendanceApi = {
  checkIn: async () => apiRequest<AttendanceRecordData>('/attendance/check-in/', { method: 'POST' }),
  toggleBreak: async () => apiRequest<AttendanceRecordData>('/attendance/break/toggle/', { method: 'POST' }),
  checkOut: async () => apiRequest<AttendanceRecordData>('/attendance/check-out/', { method: 'POST' }),
  getToday: async () => apiRequest<TodayAttendanceResponse>('/attendance/today/'),
  getHistory: async () => apiRequest<AttendanceRecordData[]>('/attendance/history/'),
  getAllRecords: async () => apiRequest<any>('/attendance/records/'),
}
