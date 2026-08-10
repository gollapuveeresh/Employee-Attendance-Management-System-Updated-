const companies = [
  { id: 'CO-001', name: 'VPD Technologies Pvt Ltd', branches: 4, departments: 8, employees: 166, status: 'Active', plan: 'Enterprise', joined: '2018-01-01' },
]

export default function CompanyManagementPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Company Management</h1>
          <p className="text-sm mt-0.5" style={{ color: '#6B6B6B' }}>Manage company details and structure</p>
        </div>
        <button className="px-4 py-2 rounded-xl text-sm font-medium" style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)', color: '#0A0A0A' }}>
          + Add Company
        </button>
      </div>

      {companies.map(c => (
        <div key={c.id} className="rounded-2xl p-6" style={{ background: '#111111', border: '1px solid rgba(212,175,55,0.2)' }}>
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)' }}>
                <svg width="24" height="24" viewBox="0 0 40 40" fill="none"><path d="M8 8h10v10H8zM22 8h10v10H22zM8 22h10v10H8zM22 22h6v6H22z" fill="white" fillOpacity="0.9"/><circle cx="31" cy="31" r="3" fill="white" fillOpacity="0.6"/></svg>
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl text-white">{c.name}</h2>
                <p className="text-xs mt-0.5" style={{ color: '#6B6B6B' }}>{c.id} · Since {c.joined}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(212,175,55,0.1)', color: '#D4AF37' }}>{c.plan}</span>
              <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E' }}>{c.status}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Employees', value: c.employees, color: '#FFFFFF' },
              { label: 'Branches', value: c.branches, color: '#D4AF37' },
              { label: 'Departments', value: c.departments, color: '#3B82F6' },
              { label: 'Plan', value: c.plan, color: '#A855F7' },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-4" style={{ background: '#171717' }}>
                <div className="text-xs mb-1" style={{ color: '#6B6B6B' }}>{s.label}</div>
                <div className="font-heading font-bold text-lg" style={{ color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-xl text-sm font-medium" style={{ background: 'rgba(212,175,55,0.08)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.2)' }}>Edit Company</button>
            <button className="px-4 py-2 rounded-xl text-sm font-medium" style={{ background: '#171717', color: '#BDBDBD', border: '1px solid #2A2A2A' }}>View Details</button>
            <button className="px-4 py-2 rounded-xl text-sm font-medium" style={{ background: '#171717', color: '#BDBDBD', border: '1px solid #2A2A2A' }}>Company Stats</button>
          </div>
        </div>
      ))}
    </div>
  )
}
