import { useState } from 'react'

const branches = [
  { id: 'BR-001', name: 'Mumbai HQ', manager: 'Vikram Nair', employees: 72, present: 65, status: 'Active', city: 'Mumbai', established: '2018-01-15' },
  { id: 'BR-002', name: 'Bangalore', manager: 'Suresh Rao', employees: 48, present: 44, status: 'Active', city: 'Bangalore', established: '2019-06-01' },
  { id: 'BR-003', name: 'Delhi', manager: 'Meena Sharma', employees: 31, present: 26, status: 'Active', city: 'Delhi', established: '2020-03-20' },
  { id: 'BR-004', name: 'Chennai', manager: 'Ravi Kumar', employees: 15, present: 14, status: 'Active', city: 'Chennai', established: '2022-09-10' },
]

export default function BranchManagementPage() {
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ name: '', city: '', manager: '' })

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Branch Management</h1>
          <p className="text-sm mt-0.5" style={{ color: '#6B6B6B' }}>{branches.length} branches across India</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="px-4 py-2 rounded-xl text-sm font-medium" style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)', color: '#0A0A0A' }}>
          + Add Branch
        </button>
      </div>

      {showAdd && (
        <div className="rounded-2xl p-5 max-w-lg" style={{ background: '#111111', border: '1px solid rgba(212,175,55,0.2)' }}>
          <h3 className="font-heading font-semibold text-white mb-4">New Branch</h3>
          <div className="space-y-3">
            {[['Branch Name', 'name', 'e.g. Pune Office'], ['City', 'city', 'e.g. Pune'], ['Branch Manager', 'manager', 'Full name']].map(([label, field, ph]) => (
              <div key={field}>
                <label className="block text-xs font-medium mb-1" style={{ color: '#BDBDBD' }}>{label}</label>
                <input
                  value={(form as Record<string, string>)[field]}
                  onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                  placeholder={ph}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none"
                  style={{ background: '#171717', border: '1px solid #2A2A2A' }}
                />
              </div>
            ))}
            <div className="flex gap-2 pt-1">
              <button onClick={() => setShowAdd(false)} className="flex-1 py-2.5 rounded-xl text-sm font-medium" style={{ background: '#171717', color: '#BDBDBD', border: '1px solid #2A2A2A' }}>Cancel</button>
              <button onClick={() => setShowAdd(false)} className="flex-1 py-2.5 rounded-xl text-sm font-medium" style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)', color: '#0A0A0A' }}>Save Branch</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {branches.map(b => {
          const pct = Math.round((b.present / b.employees) * 100)
          return (
            <div key={b.id} className="rounded-2xl p-5 transition-all hover:scale-[1.01]" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-heading font-bold text-white">{b.name}</h3>
                  <p className="text-xs mt-0.5" style={{ color: '#6B6B6B' }}>{b.city} · {b.id}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E' }}>
                  {b.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: 'Employees', value: b.employees, color: '#FFFFFF' },
                  { label: 'Present', value: b.present, color: '#22C55E' },
                  { label: 'Attendance', value: `${pct}%`, color: '#D4AF37' },
                ].map(s => (
                  <div key={s.label} className="rounded-xl p-2.5 text-center" style={{ background: '#171717' }}>
                    <div className="font-heading font-bold text-sm" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#6B6B6B' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <div className="h-1.5 rounded-full" style={{ background: '#2A2A2A' }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #D4AF37, #E8CB5A)' }} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs" style={{ color: '#6B6B6B' }}>Manager: <span style={{ color: '#BDBDBD' }}>{b.manager}</span></div>
                <div className="flex gap-1.5">
                  <button className="px-2.5 py-1 rounded-lg text-xs" style={{ background: 'rgba(212,175,55,0.08)', color: '#D4AF37' }}>Edit</button>
                  <button className="px-2.5 py-1 rounded-lg text-xs" style={{ background: '#171717', color: '#BDBDBD', border: '1px solid #2A2A2A' }}>View</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
