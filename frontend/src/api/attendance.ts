import { apiRequest } from './client'

export interface BranchLocationInfo {
  id: number
  name: string
  city: string
  latitude: number | null
  longitude: number | null
  radius_meters: number
  geofence_enabled: boolean
}

export interface AttendanceRecordData {
  id: number
  date: string
  check_in: string | null
  check_out: string | null
  status: 'Present' | 'Late' | 'Half Day' | 'Absent' | 'Leave'
  working_hours: number
  break_duration_seconds: number
  is_on_break: boolean
  check_in_lat?: number | null
  check_in_lng?: number | null
  check_out_lat?: number | null
  check_out_lng?: number | null
  distance_from_branch_meters?: number | null
  is_location_verified?: boolean
  notes?: string | null
}

export interface TodayAttendanceResponse {
  status: 'not-checked-in' | 'checked-in' | 'on-break' | 'checked-out'
  elapsed_seconds: number
  break_duration_seconds: number
  record: AttendanceRecordData | null
  branch?: BranchLocationInfo | null
}

export const attendanceApi = {
  checkIn: async (coords?: { latitude?: number; longitude?: number }) =>
    apiRequest<AttendanceRecordData>('/attendance/check-in/', {
      method: 'POST',
      body: coords ? JSON.stringify(coords) : undefined
    }),
  toggleBreak: async () => apiRequest<AttendanceRecordData>('/attendance/break/toggle/', { method: 'POST' }),
  checkOut: async (coords?: { latitude?: number; longitude?: number }) =>
    apiRequest<AttendanceRecordData>('/attendance/check-out/', {
      method: 'POST',
      body: coords ? JSON.stringify(coords) : undefined
    }),
  getToday: async () => apiRequest<TodayAttendanceResponse>('/attendance/today/'),
  getHistory: async () => apiRequest<AttendanceRecordData[]>('/attendance/history/'),
  getAllRecords: async () => apiRequest<any>('/attendance/records/'),
}
