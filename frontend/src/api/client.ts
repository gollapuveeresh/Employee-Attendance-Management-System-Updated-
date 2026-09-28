const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export function getAuthToken() { return localStorage.getItem('vpd_access_token') }

export function getRefreshToken() { return localStorage.getItem('vpd_refresh_token') }

export function setAuthTokens(access: string, refresh: string) {
  localStorage.setItem('vpd_access_token', access)
  localStorage.setItem('vpd_refresh_token', refresh)
}

export function clearAuthTokens() {
  localStorage.removeItem('vpd_access_token')
  localStorage.removeItem('vpd_refresh_token')
  localStorage.removeItem('vpd_user')
}

let isRefreshing = false

async function attemptTokenRefresh(): Promise<boolean> {
  const refreshToken = getRefreshToken()
  if (!refreshToken || isRefreshing) return false

  isRefreshing = true
  try {
    const res = await fetch(BASE_URL + '/auth/refresh/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshToken }),
    })
    if (!res.ok) return false
    const data = await res.json()
    if (data.access) {
      localStorage.setItem('vpd_access_token', data.access)
      return true
    }
    return false
  } catch {
    return false
  } finally {
    isRefreshing = false
  }
}

export async function apiRequest<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken()
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...((options.headers as Record<string, string>) || {}) }
  if (token) headers['Authorization'] = 'Bearer ' + token
  const clean = endpoint.startsWith('/') ? endpoint : '/' + endpoint
  const res = await fetch(BASE_URL + clean, { ...options, headers })

  if (res.status === 401) {
    // Attempt token refresh once before giving up
    const refreshed = await attemptTokenRefresh()
    if (refreshed) {
      // Retry the original request with the new access token
      const newToken = getAuthToken()
      const retryHeaders: Record<string, string> = { 'Content-Type': 'application/json', ...((options.headers as Record<string, string>) || {}) }
      if (newToken) retryHeaders['Authorization'] = 'Bearer ' + newToken
      const retryRes = await fetch(BASE_URL + clean, { ...options, headers: retryHeaders })
      if (!retryRes.ok) {
        if (retryRes.status === 401) clearAuthTokens()
        const err = await retryRes.json().catch(() => ({}))
        throw new Error(err.detail || err.message || ('Error ' + retryRes.status))
      }
      return retryRes.json()
    }
    // Refresh failed or not possible — clear tokens
    clearAuthTokens()
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || err.message || ('Error ' + res.status))
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || err.message || ('Error ' + res.status))
  }
  return res.json()
}
