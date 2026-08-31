import { useState } from 'react'
import type { AppUser } from '../../App'
import { apiRequest } from '../../api/client'

interface Props { user: AppUser }

export default function ProfilePage({ user }: Props) {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg(null)
    if (newPassword !== confirmPassword) {
      setMsg({ type: 'error', text: 'New passwords do not match.' })
      return
    }
    if (newPassword.length < 6) {
      setMsg({ type: 'error', text: 'Password must be at least 6 characters.' })
      return
    }
    setLoading(true)
    try {
      await apiRequest('/auth/change-password/', {
        method: 'POST',
        body: JSON.stringify({ old_password: oldPassword, new_password: newPassword })
      })
      setMsg({ type: 'success', text: 'Password updated successfully!' })
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message || 'Failed to update password.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">My Profile</h1>
        <p className="text-sm mt-0.5" style={{ color: '#6B6B6B' }}>Manage your account and credentials</p>
      </div>

      <div className="rounded-2xl p-6" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
        <div className="flex items-center gap-5 mb-8">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center font-heading font-bold text-2xl"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)', color: '#0A0A0A' }}
          >
            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-white">{user.name}</h2>
            <p className="text-sm" style={{ color: '#BDBDBD' }}>{user.designation}</p>
            <p className="text-xs mt-1 font-mono" style={{ color: '#D4AF37' }}>{user.employeeId}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Full Name', value: user.name },
            { label: 'Email Address', value: user.email },
            { label: 'Employee ID', value: user.employeeId },
            { label: 'Department', value: user.department },
            { label: 'Designation', value: user.designation },
            { label: 'System Role', value: user.role === 'admin' ? 'Super Admin' : user.role === 'hr' ? 'HR Manager' : 'Employee' },
          ].map(field => (
            <div key={field.label} className="rounded-xl p-4" style={{ background: '#171717', border: '1px solid #2A2A2A' }}>
              <div className="text-xs mb-1" style={{ color: '#6B6B6B' }}>{field.label}</div>
              <div className="text-sm font-medium text-white">{field.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl p-6" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
        <h3 className="font-heading font-semibold text-white mb-4">Change Password</h3>
        
        {msg && (
          <div
            className="p-3 rounded-xl text-xs font-medium mb-4 flex items-center gap-2"
            style={{
              background: msg.type === 'success' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
              color: msg.type === 'success' ? '#22C55E' : '#EF4444',
              border: `1px solid ${msg.type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`
            }}
          >
            {msg.text}
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Current Password</label>
            <input
              type="password"
              required
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
              style={{ background: '#171717', border: '1px solid #2A2A2A' }}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">New Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
              style={{ background: '#171717', border: '1px solid #2A2A2A' }}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Confirm New Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
              style={{ background: '#171717', border: '1px solid #2A2A2A' }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)', color: '#0A0A0A' }}
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  )
}
