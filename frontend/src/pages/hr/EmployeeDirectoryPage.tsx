import { useState, useEffect } from 'react'
import { analyticsApi } from '../../api/analytics'
import { apiRequest } from '../../api/client'

const statusColors: Record<string, { color: string; bg: string }> = {
  Present: { color: '#22C55E', bg: 'rgba(34,197,94,0.1)' },
  Absent: { color: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
  Late: { color: '#FACC15', bg: 'rgba(250,204,21,0.1)' },
  Leave: { color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
}

export default function EmployeeDirectoryPage() {
  const [employees, setEmployees] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [dept, setDept] = useState('All')
  const [branch, setBranch] = useState('All')
  const [status, setStatus] = useState('All')
  const [view, setView] = useState<'table' | 'card'>('table')
  const [showModal, setShowModal] = useState(false)
  const [newEmp, setNewEmp] = useState({
    username: '', email: '', first_name: '', last_name: '',
    role: 'employee', designation: '', password: '123456'
  })
  const [loading, setLoading] = useState(false)

  const loadData = () => {
    analyticsApi.getUsers().then(res => {
      const list = res.results || res
      if (Array.isArray(list) && list.length > 0) {
        setEmployees(list.map((u: any) => ({
          id: u.employee_id || `VPD-${u.id}`,
          name: u.name || `${u.first_name} ${u.last_name}`,
          email: u.email,
          dept: u.department_name || 'General',
          designation: u.designation || 'Staff',
          branch: u.branch_name || 'Mumbai HQ',
          status: 'Present',
          joined: u.date_of_joining || '2023-01-01'
        })))
      }
    }).catch(() => {})
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleCreateEmployee = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await apiRequest('/auth/users/', {
        method: 'POST',
        body: JSON.stringify(newEmp)
      })
      setShowModal(false)
      setNewEmp({
        username: '', email: '', first_name: '', last_name: '',
        role: 'employee', designation: '', password: '123456'
      })
      loadData()
    } catch (err: any) {
      alert(err.message || 'Failed to create employee')
    } finally {
      setLoading(false)
    }
  }

  const depts = ['All', ...Array.from(new Set(employees.map(e => e.dept)))]
  const branches = ['All', ...Array.from(new Set(employees.map(e => e.branch)))]
  const statuses = ['All', 'Present', 'Absent', 'Late', 'Leave']

  const filtered = employees.filter(e =>
    (dept === 'All' || e.dept === dept) &&
    (branch === 'All' || e.branch === branch) &&
    (status === 'All' || e.status === status) &&
    (e.name.toLowerCase().includes(search.toLowerCase()) || e.id.toLowerCase().includes(search.toLowerCase()) || e.designation.toLowerCase().includes(search.toLowerCase()))
  )

  const Avatar = ({ name }: { name: string }) => (
    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-heading font-bold text-xs" style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)', color: '#0A0A0A' }}>
      {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
    </div>
  )

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Employee Directory</h1>
          <p className="text-sm mt-0.5" style={{ color: '#6B6B6B' }}>{filtered.length} of {employees.length} employees</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView('table')}
            className="p-2 rounded-xl transition-all"
            style={{ background: view === 'table' ? 'rgba(212,175,55,0.12)' : '#171717', color: view === 'table' ? '#D4AF37' : '#BDBDBD', border: `1px solid ${view === 'table' ? 'rgba(212,175,55,0.3)' : '#2A2A2A'}` }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          </button>
          <button
            onClick={() => setView('card')}
            className="p-2 rounded-xl transition-all"
            style={{ background: view === 'card' ? 'rgba(212,175,55,0.12)' : '#171717', color: view === 'card' ? '#D4AF37' : '#BDBDBD', border: `1px solid ${view === 'card' ? 'rgba(212,175,55,0.3)' : '#2A2A2A'}` }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)', color: '#0A0A0A' }}
          >
            + Add Employee
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="rounded-2xl p-6 w-full max-w-md relative" style={{ background: '#141414', border: '1px solid #2A2A2A' }}>
            <h2 className="font-heading text-lg font-bold text-white mb-4">Add New Employee</h2>
            <form onSubmit={handleCreateEmployee} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <input
                  placeholder="First Name"
                  required
                  value={newEmp.first_name}
                  onChange={e => setNewEmp({ ...newEmp, first_name: e.target.value })}
                  className="px-3 py-2 rounded-xl text-sm text-white outline-none"
                  style={{ background: '#1B1B1B', border: '1px solid #333' }}
                />
                <input
                  placeholder="Last Name"
                  required
                  value={newEmp.last_name}
                  onChange={e => setNewEmp({ ...newEmp, last_name: e.target.value })}
                  className="px-3 py-2 rounded-xl text-sm text-white outline-none"
                  style={{ background: '#1B1B1B', border: '1px solid #333' }}
                />
              </div>
              <input
                placeholder="Email Address"
                type="email"
                required
                value={newEmp.email}
                onChange={e => setNewEmp({ ...newEmp, email: e.target.value, username: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm text-white outline-none"
                style={{ background: '#1B1B1B', border: '1px solid #333' }}
              />
              <input
                placeholder="Designation / Role"
                required
                value={newEmp.designation}
                onChange={e => setNewEmp({ ...newEmp, designation: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm text-white outline-none"
                style={{ background: '#1B1B1B', border: '1px solid #333' }}
              />
              <select
                value={newEmp.role}
                onChange={e => setNewEmp({ ...newEmp, role: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm text-gray-300 outline-none"
                style={{ background: '#1B1B1B', border: '1px solid #333' }}
              >
                <option value="employee">Employee</option>
                <option value="hr">HR Manager</option>
                <option value="admin">Super Admin</option>
              </select>
              <div className="flex gap-2 justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-sm text-gray-400"
                  style={{ background: '#222' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-xl text-sm font-semibold"
                  style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)', color: '#0A0A0A' }}
                >
                  {loading ? 'Creating...' : 'Create Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="rounded-2xl p-4 flex flex-wrap gap-3" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
        <div className="relative flex-1 min-w-[180px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search employees..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white outline-none"
            style={{ background: '#171717', border: '1px solid #2A2A2A' }}
          />
        </div>
        {[['dept', depts, dept, setDept], ['branch', branches, branch, setBranch], ['status', statuses, status, setStatus]].map(([key, options, val, setter]) => (
          <select
            key={key as string}
            value={val as string}
            onChange={e => (setter as (v: string) => void)(e.target.value)}
            className="px-3 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: '#171717', border: '1px solid #2A2A2A', color: '#BDBDBD' }}
          >
            {(options as string[]).map(o => <option key={o} value={o}>{key === 'dept' ? 'Dept: ' : key === 'branch' ? 'Branch: ' : 'Status: '}{o}</option>)}
          </select>
        ))}
      </div>

      {/* Table view */}
      {view === 'table' && (
        <div className="rounded-2xl overflow-hidden" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #1E1E1E' }}>
                  {['Employee', 'ID', 'Department', 'Branch', 'Designation', 'Status'].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-medium" style={{ color: '#6B6B6B' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((e, i) => (
                  <tr key={e.id} className="hover:bg-white/[0.02] transition-colors cursor-pointer" style={{ borderBottom: i < filtered.length - 1 ? '1px solid #1A1A1A' : 'none' }}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={e.name} />
                        <span className="text-sm font-medium text-white">{e.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm font-mono" style={{ color: '#6B6B6B' }}>{e.id}</td>
                    <td className="px-5 py-4 text-sm" style={{ color: '#BDBDBD' }}>{e.dept}</td>
                    <td className="px-5 py-4 text-sm" style={{ color: '#BDBDBD' }}>{e.branch}</td>
                    <td className="px-5 py-4 text-sm" style={{ color: '#BDBDBD' }}>{e.designation}</td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: statusColors[e.status].bg, color: statusColors[e.status].color }}>
                        {e.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden divide-y" style={{ borderColor: '#1A1A1A' }}>
            {filtered.map(e => (
              <div key={e.id} className="p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar name={e.name} />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-white truncate">{e.name}</div>
                    <div className="text-xs truncate" style={{ color: '#6B6B6B' }}>{e.dept} · {e.branch}</div>
                  </div>
                </div>
                <span className="flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: statusColors[e.status].bg, color: statusColors[e.status].color }}>
                  {e.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Card view */}
      {view === 'card' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(e => (
            <div key={e.id} className="rounded-2xl p-5 transition-all hover:scale-[1.02] cursor-pointer" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
              <div className="flex items-center gap-3 mb-4">
                <Avatar name={e.name} />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white truncate">{e.name}</div>
                  <div className="text-xs" style={{ color: '#6B6B6B' }}>{e.id}</div>
                </div>
              </div>
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 text-xs">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
                  <span style={{ color: '#BDBDBD' }}>{e.dept}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
                  <span style={{ color: '#BDBDBD' }}>{e.branch}</span>
                </div>
                <div className="text-xs truncate" style={{ color: '#6B6B6B' }}>{e.designation}</div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: statusColors[e.status].bg, color: statusColors[e.status].color }}>
                {e.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
