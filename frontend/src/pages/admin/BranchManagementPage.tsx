import { useState, useEffect } from 'react'
import { analyticsApi } from '../../api/analytics'
import { apiRequest } from '../../api/client'
import { getCurrentCoordinates } from '../../utils/geolocation'

export default function BranchManagementPage() {
  const [branches, setBranches] = useState<any[]>([])
  const [showAdd, setShowAdd] = useState(false)
  const [editingBranch, setEditingBranch] = useState<any | null>(null)
  const [form, setForm] = useState({
    name: '',
    city: '',
    address: '',
    latitude: '',
    longitude: '',
    radius_meters: 200,
    geofence_enabled: true,
  })
  const [loading, setLoading] = useState(false)
  const [capturingGps, setCapturingGps] = useState(false)

  const loadBranches = () => {
    analyticsApi.getBranches().then(res => {
      const list = res.results || res
      if (Array.isArray(list) && list.length > 0) {
        setBranches(list.map((b: any) => ({
          id: b.id,
          name: b.name,
          manager: 'Branch Lead',
          employees: b.employee_count || 10,
          present: Math.round((b.employee_count || 10) * 0.9),
          status: 'Active',
          city: b.city || 'India',
          latitude: b.latitude,
          longitude: b.longitude,
          radius_meters: b.radius_meters || 200,
          geofence_enabled: b.geofence_enabled !== false,
        })))
      }
    }).catch(() => {})
  }

  useEffect(() => {
    loadBranches()
  }, [])

  const handleUseCurrentLocation = async () => {
    setCapturingGps(true)
    try {
      const coords = await getCurrentCoordinates()
      setForm(f => ({
        ...f,
        latitude: coords.latitude.toFixed(6),
        longitude: coords.longitude.toFixed(6),
      }))
    } catch (err: any) {
      alert(err.message || 'Unable to get current GPS location.')
    } finally {
      setCapturingGps(false)
    }
  }

  const handleSave = async () => {
    if (!form.name || !form.city) return
    setLoading(true)
    try {
      const payload: any = {
        name: form.name,
        city: form.city,
        address: form.address,
        radius_meters: Number(form.radius_meters) || 200,
        geofence_enabled: form.geofence_enabled,
      }
      if (form.latitude) payload.latitude = Number(form.latitude)
      if (form.longitude) payload.longitude = Number(form.longitude)

      if (editingBranch) {
        await apiRequest(`/organization/branches/${editingBranch.id}/`, {
          method: 'PATCH',
          body: JSON.stringify(payload)
        })
      } else {
        await apiRequest('/organization/branches/', {
          method: 'POST',
          body: JSON.stringify(payload)
        })
      }

      setShowAdd(false)
      setEditingBranch(null)
      setForm({ name: '', city: '', address: '', latitude: '', longitude: '', radius_meters: 200, geofence_enabled: true })
      loadBranches()
    } catch (err: any) {
      alert(err.message || 'Failed to save branch')
    } finally {
      setLoading(false)
    }
  }

  const openEdit = (b: any) => {
    setEditingBranch(b)
    setForm({
      name: b.name,
      city: b.city,
      address: b.address || '',
      latitude: b.latitude != null ? String(b.latitude) : '',
      longitude: b.longitude != null ? String(b.longitude) : '',
      radius_meters: b.radius_meters || 200,
      geofence_enabled: b.geofence_enabled !== false,
    })
    setShowAdd(true)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Branch Management</h1>
          <p className="text-sm mt-0.5" style={{ color: '#6B6B6B' }}>
            {branches.length} branches across India · Strict Geofencing Enabled
          </p>
        </div>
        <button
          onClick={() => {
            setEditingBranch(null)
            setForm({ name: '', city: '', address: '', latitude: '', longitude: '', radius_meters: 200, geofence_enabled: true })
            setShowAdd(!showAdd)
          }}
          className="px-4 py-2 rounded-xl text-sm font-medium"
          style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)', color: '#0A0A0A' }}
        >
          + Add Branch
        </button>
      </div>

      {showAdd && (
        <div className="rounded-2xl p-6 max-w-lg" style={{ background: '#111111', border: '1px solid rgba(212,175,55,0.3)' }}>
          <h3 className="font-heading font-semibold text-white mb-4">
            {editingBranch ? `Edit Branch: ${editingBranch.name}` : 'New Branch & Geofence'}
          </h3>
          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-medium mb-1 text-[#BDBDBD]">Branch Name</label>
              <input
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Pune Office"
                className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none"
                style={{ background: '#171717', border: '1px solid #2A2A2A' }}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1 text-[#BDBDBD]">City</label>
                <input
                  value={form.city}
                  onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                  placeholder="e.g. Pune"
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none"
                  style={{ background: '#171717', border: '1px solid #2A2A2A' }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1 text-[#BDBDBD]">Geofence Radius (m)</label>
                <input
                  type="number"
                  value={form.radius_meters}
                  onChange={e => setForm(f => ({ ...f, radius_meters: Number(e.target.value) }))}
                  placeholder="200"
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none"
                  style={{ background: '#171717', border: '1px solid #2A2A2A' }}
                />
              </div>
            </div>

            {/* GPS Coordinates Header & Auto-Detect Button */}
            <div className="pt-2 border-t border-[#222]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white">📍 Geofence GPS Coordinates</span>
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  disabled={capturingGps}
                  className="text-xs px-2.5 py-1 rounded-lg text-[#0A0A0A] font-medium"
                  style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)' }}
                >
                  {capturingGps ? 'Detecting...' : 'Use My Current GPS'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] mb-1 text-[#888]">Latitude</label>
                  <input
                    value={form.latitude}
                    onChange={e => setForm(f => ({ ...f, latitude: e.target.value }))}
                    placeholder="e.g. 18.520430"
                    className="w-full px-3 py-2 rounded-xl text-xs text-white outline-none"
                    style={{ background: '#171717', border: '1px solid #2A2A2A' }}
                  />
                </div>
                <div>
                  <label className="block text-[11px] mb-1 text-[#888]">Longitude</label>
                  <input
                    value={form.longitude}
                    onChange={e => setForm(f => ({ ...f, longitude: e.target.value }))}
                    placeholder="e.g. 73.856743"
                    className="w-full px-3 py-2 rounded-xl text-xs text-white outline-none"
                    style={{ background: '#171717', border: '1px solid #2A2A2A' }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="geofence_enabled"
                checked={form.geofence_enabled}
                onChange={e => setForm(f => ({ ...f, geofence_enabled: e.target.checked }))}
                className="w-4 h-4 rounded accent-[#D4AF37]"
              />
              <label htmlFor="geofence_enabled" className="text-xs text-[#BDBDBD] cursor-pointer">
                Strict Geofence Enforcement (employees must be within radius to clock in)
              </label>
            </div>

            <div className="flex gap-2 pt-3">
              <button
                type="button"
                onClick={() => { setShowAdd(false); setEditingBranch(null) }}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium"
                style={{ background: '#171717', color: '#BDBDBD', border: '1px solid #2A2A2A' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={loading}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)', color: '#0A0A0A' }}
              >
                {loading ? 'Saving...' : 'Save Branch'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {branches.map(b => {
          const pct = Math.round((b.present / b.employees) * 100)
          return (
            <div key={b.id} className="rounded-2xl p-5 transition-all hover:scale-[1.01]" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-heading font-bold text-white">{b.name}</h3>
                  <p className="text-xs mt-0.5" style={{ color: '#6B6B6B' }}>{b.city} · Branch #{b.id}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E' }}>
                  {b.status}
                </span>
              </div>

              {/* Geofence specs */}
              <div className="flex flex-wrap items-center gap-2 mb-3.5">
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#171717] text-[#aaa] border border-[#222]">
                  📍 {b.latitude != null ? `${Number(b.latitude).toFixed(4)}, ${Number(b.longitude).toFixed(4)}` : 'GPS Not Set'}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">
                  Strict Radius: {b.radius_meters}m
                </span>
                {b.geofence_enabled && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400">
                    Geofence Active
                  </span>
                )}
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
                  <button
                    onClick={() => openEdit(b)}
                    className="px-2.5 py-1 rounded-lg text-xs transition-colors hover:bg-yellow-400/20"
                    style={{ background: 'rgba(212,175,55,0.08)', color: '#D4AF37' }}
                  >
                    Edit Geofence
                  </button>
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
