const departments = [
  { id: 'D-001', name: 'Engineering', head: 'Rohit Gupta', employees: 58, presentPct: 92, active: true },
  { id: 'D-002', name: 'Human Resources', head: 'Priya Mehta', employees: 12, presentPct: 100, active: true },
  { id: 'D-003', name: 'Marketing', head: 'Anita Singh', employees: 22, presentPct: 86, active: true },
  { id: 'D-004', name: 'Finance', head: 'Sunil Joshi', employees: 18, presentPct: 89, active: true },
  { id: 'D-005', name: 'Sales', head: 'Deepak Rao', employees: 28, presentPct: 82, active: true },
  { id: 'D-006', name: 'Operations', head: 'Vikas Verma', employees: 24, presentPct: 95, active: true },
  { id: 'D-007', name: 'Design', head: 'Anjali Rao', employees: 16, presentPct: 93, active: true },
  { id: 'D-008', name: 'Legal', head: 'Suman Patel', employees: 8, presentPct: 87, active: false },
]

export default function DepartmentManagementPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Department Management</h1>
          <p className="text-sm mt-0.5" style={{ color: '#6B6B6B' }}>{departments.length} departments</p>
        </div>
        <button className="px-4 py-2 rounded-xl text-sm font-medium" style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)', color: '#0A0A0A' }}>
          + Add Department
        </button>
      </div>

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
