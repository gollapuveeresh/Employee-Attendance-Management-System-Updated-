import { apiRequest, setAuthTokens, clearAuthTokens } from './client'
import type { AppUser } from '../App'

export interface LoginResponse {
  access: string
  refresh: string
  user: AppUser
}

export const authApi = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const data = await apiRequest<LoginResponse>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
    setAuthTokens(data.access, data.refresh)
    localStorage.setItem('vpd_user', JSON.stringify(data.user))
    return data
  },
  getProfile: async (): Promise<AppUser> => apiRequest<AppUser>('/auth/profile/'),
  logout: () => clearAuthTokens(),
}
