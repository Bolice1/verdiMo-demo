import { useEffect, useState } from 'react';
import {
  Users, Building2, Truck, Package, Route,
  Leaf, DollarSign, Clock, Shield, Globe,
  TrendingUp, AlertTriangle, CheckCircle2, Zap,
} from 'lucide-react';
import { adminStats, vehicles, shipments, weeklyShipments } from '../data/demoData';
import { BarChart } from '../components/Charts';
import { CardSkeleton } from '../components/Skeleton';

const recentActivity = [
  { type: 'shipment', msg: 'SH-2401 picked up in Kigali', time: '2 min ago', status: 'ok' },
  { type: 'vehicle', msg: 'V005 went idle — Kampala depot', time: '8 min ago', status: 'warn' },
  { type: 'user', msg: 'New operator registered: Diane N.', time: '14 min ago', status: 'ok' },
  { type: 'shipment', msg: 'SH-2407 delivered to Bujumbura', time: '22 min ago', status: 'ok' },
  { type: 'alert', msg: 'V007 entered maintenance mode', time: '1 hr ago', status: 'warn' },
  { type: 'system', msg: 'Route optimization batch completed', time: '2 hr ago', status: 'ok' },
];

const topRoutes = [
  { route: 'Kigali → Kampala', shipments: 148, revenue: 28400, co2: 412 },
  { route: 'Nairobi → Kigali', shipments: 127, revenue: 24100, co2: 354 },
  { route: 'Dar es Salaam → Kigali', shipments: 94, revenue: 18800, co2: 619 },
  { route: 'Goma → Kigali', shipments: 83, revenue: 9100, co2: 141 },
  { route: 'Bujumbura → Kigali', shipments: 71, revenue: 8500, co2: 118 },
];

export default function AdminPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const kpis = [
    { label: 'Total Users', value: adminStats.totalUsers.toLocaleString(), icon: Users, delta: '+127 this week' },
    { label: 'Companies', value: adminStats.totalCompanies.toLocaleString(), icon: Building2, delta: '+8 this month' },
    { label: 'Registered Vehicles', value: adminStats.totalVehicles.toLocaleString(), icon: Truck, delta: `${vehicles.filter(v => v.status === 'active').length} active now` },
    { label: 'Total Shipments', value: adminStats.totalShipments.toLocaleString(), icon: Package, delta: `${shipments.filter(s => s.status === 'in-transit').length} in transit` },
    { label: 'Active Routes', value: adminStats.activeRoutes, icon: Route, delta: 'live now' },
    { label: 'CO₂ Saved', value: `${adminStats.co2SavedTons.toLocaleString()}t`, icon: Leaf, delta: 'since launch' },
    { label: 'Revenue (Mar)', value: `$${(adminStats.revenueThisMonth / 1000).toFixed(1)}k`, icon: DollarSign, delta: '+11.7% MoM' },
    { label: 'Avg Delivery Time', value: `${adminStats.avgDeliveryTime}h`, icon: Clock, delta: '-0.8h vs last month' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="section-label mb-1">System Administration</p>
          <h1 className="font-display text-3xl font-bold tracking-tight">Admin Panel</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="tag tag-active">
            <Shield className="w-3 h-3 mr-1" />
            Admin Access
          </span>
          <span className="tag tag-green">● System Healthy</span>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {loading
          ? Array(8).fill(0).map((_, i) => <CardSkeleton key={i} />)
          : kpis.map(({ label, value, icon: Icon, delta }, i) => (
              <div
                key={label}
                className="card p-4 fade-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <Icon className="w-4 h-4 text-[#444]" />
                  <TrendingUp className="w-3 h-3 text-[#222]" />
                </div>
                <p className="stat-number text-2xl text-white leading-none mb-1">{value}</p>
                <p className="text-[10px] font-mono text-[#444] mb-0.5">{delta}</p>
                <p className="text-xs text-[#333]">{label}</p>
              </div>
            ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Weekly activity chart */}
        <div className="card p-5 col-span-2">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="section-label mb-1">Weekly Activity</p>
              <p className="stat-number text-xl">415 shipments <span className="text-[#444] text-sm font-sans font-normal">this week</span></p>
            </div>
            <div className="flex gap-3 text-[10px] font-mono text-[#555]">
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[#1a1a1a] rounded-sm" />Shipments</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[#2a2a2a] rounded-sm" />CO₂ (10s kg)</span>
            </div>
          </div>
          <BarChart data={weeklyShipments.map((d) => ({ label: d.day, value: d.count }))} height={80} />
        </div>

        {/* System health */}
        <div className="card p-5">
          <p className="section-label mb-4">System Health</p>
          <div className="space-y-2.5">
            {[
              { label: 'API Uptime', value: '99.97%', status: 'ok' },
              { label: 'Avg Response', value: '142ms', status: 'ok' },
              { label: 'DB Load', value: '34%', status: 'ok' },
              { label: 'Active Sessions', value: '284', status: 'ok' },
              { label: 'Error Rate', value: '0.02%', status: 'ok' },
            ].map(({ label, value, status }) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {status === 'ok' ? (
                    <CheckCircle2 className="w-3 h-3 text-[#4caf50]" />
                  ) : (
                    <AlertTriangle className="w-3 h-3 text-[#f5c842]" />
                  )}
                  <span className="text-[12px] text-[#666]">{label}</span>
                </div>
                <span className="text-[12px] font-mono text-[#aaa]">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Top routes */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="section-label">Top Routes</p>
            <Globe className="w-4 h-4 text-[#333]" />
          </div>
          <div className="space-y-2">
            {topRoutes.map((r, i) => (
              <div key={r.route} className="flex items-center justify-between py-2 border-b border-[#0a0a0a] last:border-0">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-mono text-[#333] w-4">{i + 1}</span>
                  <div>
                    <p className="text-[12px] text-[#ccc]">{r.route}</p>
                    <p className="text-[10px] text-[#444] font-mono">{r.shipments} shipments · {r.co2} kg CO₂ saved</p>
                  </div>
                </div>
                <span className="text-[12px] font-mono text-[#888]">${(r.revenue / 1000).toFixed(1)}k</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="section-label">Recent Activity</p>
            <span className="text-[10px] font-mono text-[#333]">Live feed</span>
          </div>
          <div className="space-y-2">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-2.5 py-1.5 border-b border-[#0a0a0a] last:border-0">
                {a.status === 'ok' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3a3a3a] mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-[#4a3a1a] mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-[#888] truncate">{a.msg}</p>
                </div>
                <span className="text-[10px] font-mono text-[#333] whitespace-nowrap flex-shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security section */}
      <div className="card p-5 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4 text-[#555]" />
          <p className="section-label">Security & Access Control</p>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Authentication', value: 'JWT + Refresh', status: 'Secure', ok: true },
            { label: 'Encryption', value: 'AES-256 TLS 1.3', status: 'Active', ok: true },
            { label: 'Access Roles', value: 'Admin / Operator / Driver', status: 'RBAC', ok: true },
            { label: 'Audit Logs', value: 'All actions logged', status: 'Enabled', ok: true },
          ].map(({ label, value, status, ok }) => (
            <div key={label} className="bg-[#080808] border border-[#0f0f0f] rounded-lg p-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono text-[#444]">{label}</span>
                <span className={`text-[9px] font-mono ${ok ? 'text-[#4caf50]' : 'text-[#f55242]'}`}>
                  {ok ? '✓' : '✗'} {status}
                </span>
              </div>
              <p className="text-[11px] text-[#666]">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI section */}
      <div className="card p-6 border-dashed border-[#151515] bg-[#030303]">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-[#333]" />
              <span className="tag tag-active">AI Optimization — Coming Soon</span>
            </div>
            <h3 className="font-display text-lg font-semibold mb-1">Intelligent Platform Automation</h3>
            <p className="text-[#555] text-sm max-w-2xl">
              The next version of verdiMobility will use trained ML models to automate the entire
              logistics matching pipeline — from shipment intake to final delivery confirmation.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Route Optimization', desc: 'Multi-stop TSP solver reduces total distance by avg 18%' },
            { label: 'Smart Matching', desc: 'Pairs shipments to vehicles based on 14 real-time parameters' },
            { label: 'Demand Forecasting', desc: '72-hour ahead cargo volume prediction per corridor' },
            { label: 'Anomaly Detection', desc: 'Flags unusual patterns in routes, timing, and cargo weights' },
          ].map(({ label, desc }) => (
            <div key={label} className="bg-[#080808] border border-[#0f0f0f] rounded-lg p-3">
              <p className="text-[11px] font-semibold text-[#555] mb-1">{label}</p>
              <p className="text-[10px] text-[#2a2a2a] font-mono leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
