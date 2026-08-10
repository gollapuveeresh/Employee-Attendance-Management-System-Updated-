import type { AppUser } from '../../App'

interface Props { user: AppUser }

export default function ProfilePage({ user }: Props) {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">My Profile</h1>
        <p className="text-sm mt-0.5" style={{ color: '#6B6B6B' }}>Your personal information</p>
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
            <p className="text-xs mt-1" style={{ color: '#6B6B6B' }}>{user.employeeId}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Full Name', value: user.name },
            { label: 'Email', value: user.email },
            { label: 'Employee ID', value: user.employeeId },
            { label: 'Department', value: user.department },
            { label: 'Designation', value: user.designation },
            { label: 'Role', value: user.role === 'admin' ? 'Super Admin' : user.role === 'hr' ? 'HR Manager' : 'Employee' },
          ].map(field => (
            <div key={field.label} className="rounded-xl p-4" style={{ background: '#171717', border: '1px solid #2A2A2A' }}>
              <div className="text-xs mb-1" style={{ color: '#6B6B6B' }}>{field.label}</div>
              <div className="text-sm font-medium text-white">{field.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
