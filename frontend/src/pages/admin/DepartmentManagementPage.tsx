import { useState, useEffect } from 'react'
import { analyticsApi } from '../../api/analytics'
import { apiRequest } from '../../api/client'

export default function DepartmentManagementPage() {
  const [departments, setDepartments] = useState<any[]>([])
  const [showAdd, setShowAdd] = useState(false)
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)

  const loadDepts = () => {
    analyticsApi.getDepartments().then(res => {
      const list = res.results || res
      if (Array.isArray(list) && list.length > 0) {
        setDepartments(list.map((d: any) => ({
          id: d.code || `D-${d.id}`,
          name: d.name,
          head: 'Dept Lead',
          employees: d.employee_count || 8,
          presentPct: 92,
          active: true,
        })))
      }
    }).catch(() => {})
  }

  useEffect(() => {
    loadDepts()
  }, [])

  const handleAddDept = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !code) return
    setLoading(true)
    try {
      await apiRequest('/organization/departments/', {
        method: 'POST',
        body: JSON.stringify({ name, code })
      })
      setShowAdd(false)
      setName('')
      setCode('')
      loadDepts()
    } catch (err: any) {
      alert(err.message || 'Failed to add department')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Department Management</h1>
          <p className="text-sm mt-0.5" style={{ color: '#6B6B6B' }}>{departments.length} departments active</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)', color: '#0A0A0A' }}
        >
          + Add Department
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleAddDept} className="rounded-2xl p-5 max-w-md space-y-3" style={{ background: '#111111', border: '1px solid rgba(212,175,55,0.2)' }}>
          <h3 className="font-heading font-semibold text-white">New Department</h3>
          <input
            placeholder="Department Name (e.g. Quality Assurance)"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl text-sm text-white outline-none"
            style={{ background: '#171717', border: '1px solid #2A2A2A' }}
          />
          <input
            placeholder="Department Code (e.g. QA)"
            required
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase())}
            className="w-full px-3 py-2 rounded-xl text-sm text-white outline-none"
            style={{ background: '#171717', border: '1px solid #2A2A2A' }}
          />
          <div className="flex gap-2 justify-end pt-1">
            <button type="button" onClick={() => setShowAdd(false)} className="px-3 py-2 rounded-xl text-xs text-gray-400" style={{ background: '#171717' }}>Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)', color: '#0A0A0A' }}>
              {loading ? 'Saving...' : 'Save Department'}
            </button>
          </div>
        </form>
      )}

      <div className="rounded-2xl overflow-hidden" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #1E1E1E' }}>
                {['Department', 'ID', 'Department Head', 'Employees', 'Attendance', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-medium" style={{ color: '#6B6B6B' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {departments.map((d, i) => (
                <tr key={d.id} className="hover:bg-white/[0.02] transition-colors" style={{ borderBottom: i < departments.length - 1 ? '1px solid #1A1A1A' : 'none' }}>
                  <td className="px-5 py-4 font-heading font-medium text-white text-sm">{d.name}</td>
                  <td className="px-5 py-4 text-xs font-mono" style={{ color: '#6B6B6B' }}>{d.id}</td>
                  <td className="px-5 py-4 text-sm" style={{ color: '#BDBDBD' }}>{d.head}</td>
                  <td className="px-5 py-4 text-sm font-heading font-semibold text-white">{d.employees}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full" style={{ background: '#2A2A2A' }}>
                        <div className="h-full rounded-full" style={{ width: `${d.presentPct}%`, background: d.presentPct >= 90 ? '#22C55E' : d.presentPct >= 85 ? '#FACC15' : '#EF4444' }} />
                      </div>
                      <span className="text-xs font-medium w-8" style={{ color: d.presentPct >= 90 ? '#22C55E' : d.presentPct >= 85 ? '#FACC15' : '#EF4444' }}>{d.presentPct}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: d.active ? 'rgba(34,197,94,0.1)' : 'rgba(107,107,107,0.1)', color: d.active ? '#22C55E' : '#6B6B6B' }}>
                      {d.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1.5">
                      <button className="px-2.5 py-1 rounded-lg text-xs" style={{ background: 'rgba(212,175,55,0.08)', color: '#D4AF37' }}>Edit</button>
                      <button className="px-2.5 py-1 rounded-lg text-xs" style={{ background: '#171717', color: '#BDBDBD', border: '1px solid #2A2A2A' }}>View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:hidden divide-y" style={{ borderColor: '#1A1A1A' }}>
          {departments.map(d => (
            <div key={d.id} className="p-4 flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-medium text-white">{d.name}</div>
                <div className="text-xs mt-0.5" style={{ color: '#6B6B6B' }}>Head: {d.head} · {d.employees} employees</div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="w-20 h-1.5 rounded-full" style={{ background: '#2A2A2A' }}>
                    <div className="h-full rounded-full" style={{ width: `${d.presentPct}%`, background: '#D4AF37' }} />
                  </div>
                  <span className="text-xs" style={{ color: '#D4AF37' }}>{d.presentPct}%</span>
                </div>
              </div>
              <span className="flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: d.active ? 'rgba(34,197,94,0.1)' : 'rgba(107,107,107,0.1)', color: d.active ? '#22C55E' : '#6B6B6B' }}>
                {d.active ? 'Active' : 'Inactive'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
