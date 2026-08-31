const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export function getAuthToken() { return localStorage.getItem('vpd_access_token') }

export function setAuthTokens(access: string, refresh: string) {
  localStorage.setItem('vpd_access_token', access)
  localStorage.setItem('vpd_refresh_token', refresh)
}

export function clearAuthTokens() {
  localStorage.removeItem('vpd_access_token')
  localStorage.removeItem('vpd_refresh_token')
  localStorage.removeItem('vpd_user')
}

export async function apiRequest<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken()
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...((options.headers as Record<string, string>) || {}) }
  if (token) headers['Authorization'] = 'Bearer ' + token
  const clean = endpoint.startsWith('/') ? endpoint : '/' + endpoint
  const res = await fetch(BASE_URL + clean, { ...options, headers })
  if (res.status === 401) clearAuthTokens()
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || err.message || ('Error ' + res.status))
  }
  return res.json()
}
