import { useEffect, useState } from 'react';
import {
  Truck, Package, Wind, TrendingUp,
  ArrowUpRight, Clock, CheckCircle2, AlertCircle,
} from 'lucide-react';
import { vehicles, shipments, weeklyShipments, monthlyRevenue } from '../data/demoData';
import { CardSkeleton } from '../components/Skeleton';
import { BarChart, MiniLineChart } from '../components/Charts';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const activeVehicles = vehicles.filter((v) => v.status === 'active').length;
  const inTransit = shipments.filter((s) => s.status === 'in-transit').length;
  const availableCargo = vehicles.reduce((acc, v) => acc + (v.totalCapacity - v.usedCapacity), 0);
  const totalCo2 = vehicles.reduce((acc, v) => acc + v.co2Saved, 0);

  const statCards = [
    { label: 'Active Vehicles', value: activeVehicles, total: vehicles.length, icon: Truck, suffix: `/ ${vehicles.length}` },
    { label: 'In-Transit Shipments', value: inTransit, total: shipments.length, icon: Package, suffix: 'today' },
    { label: 'Available Cargo (kg)', value: availableCargo.toLocaleString(), total: null, icon: Wind, suffix: 'open capacity' },
    { label: 'CO₂ Saved Today', value: `${totalCo2}`, total: null, icon: TrendingUp, suffix: 'kg avoided' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <p className="section-label mb-1">Overview</p>
        <h1 className="font-display text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className='text-[#555] text-sm max-w-xl'>

          Demo Mode: Data is simulated for demonstration purposes and does not reflect real-time operations.

        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {loading
          ? Array(4).fill(0).map((_, i) => <CardSkeleton key={i} />)
          : statCards.map(({ label, value, icon: Icon, suffix }, i) => (
            <div key={label} className={`card p-5 fade-up`} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="flex items-start justify-between mb-4">
                <Icon className="w-4 h-4 text-[#555]" />
                <ArrowUpRight className="w-3.5 h-3.5 text-[#2a2a2a]" />
              </div>
              <p className="stat-number text-[28px] text-white leading-none mb-1">{value}</p>
              <p className="text-[11px] font-mono text-[#555] mb-0.5">{suffix}</p>
              <p className="text-xs text-[#444]">{label}</p>
            </div>
          ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Weekly shipments chart */}
        <div className="card p-5 col-span-2">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="section-label mb-1">Weekly Shipments</p>
              <p className="stat-number text-2xl">415 <span className="text-[#444] text-base font-sans font-normal">this week</span></p>
            </div>
            <span className="tag tag-green">+12.4%</span>
          </div>
          <BarChart data={weeklyShipments.map((d) => ({ label: d.day, value: d.count }))} height={90} />
        </div>

        {/* Revenue trend */}
        <div className="card p-5">
          <p className="section-label mb-1">Revenue Trend</p>
          <p className="stat-number text-2xl mb-4">$284.7k</p>
          <MiniLineChart
            data={monthlyRevenue.map((d) => ({ label: d.month, value: d.value }))}
            height={60}
          />
          <div className="flex justify-between mt-2">
            <span className="text-[10px] font-mono text-[#444]">Sep</span>
            <span className="text-[10px] font-mono text-[#444]">Mar</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Recent shipments */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="section-label">Recent Shipments</p>
            <span className="text-[11px] text-[#444] font-mono">{shipments.length} total</span>
          </div>
          <div className="space-y-2">
            {shipments.slice(0, 5).map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between py-2 border-b border-[#0f0f0f] last:border-0"
              >
                <div className="flex items-center gap-2.5">
                  {s.status === 'delivered' ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4caf50]" />
                  ) : s.status === 'in-transit' ? (
                    <Clock className="w-3.5 h-3.5 text-[#f5c842]" />
                  ) : s.status === 'pending' ? (
                    <AlertCircle className="w-3.5 h-3.5 text-[#888]" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 text-[#f55242]" />
                  )}
                  <div>
                    <p className="text-[12px] text-[#ccc] font-mono">{s.id}</p>
                    <p className="text-[10px] text-[#444]">{s.origin} → {s.destination}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`tag ${s.status === 'delivered' ? 'tag-green' :
                        s.status === 'in-transit' ? 'tag-yellow' :
                          s.status === 'pending' ? 'tag-active' : 'tag-red'
                      }`}
                  >
                    {s.status}
                  </span>
                  <p className="text-[10px] text-[#444] mt-1 font-mono">{s.weight}kg</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fleet status */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="section-label">Fleet Status</p>
            <span className="text-[11px] text-[#444] font-mono">{vehicles.length} vehicles</span>
          </div>
          <div className="mb-4 grid grid-cols-3 gap-2 text-center">
            {[
              { label: 'Active', count: vehicles.filter(v => v.status === 'active').length, color: '#4caf50' },
              { label: 'Idle', count: vehicles.filter(v => v.status === 'idle').length, color: '#f5c842' },
              { label: 'Maintenance', count: vehicles.filter(v => v.status === 'maintenance').length, color: '#f55242' },
            ].map(({ label, count, color }) => (
              <div key={label} className="bg-[#0a0a0a] rounded-lg border border-[#111] py-3">
                <p className="stat-number text-xl" style={{ color }}>{count}</p>
                <p className="text-[10px] text-[#555] font-mono mt-0.5">{label}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {vehicles.slice(0, 4).map((v) => (
              <div key={v.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#444]" />
                  <span className="text-[12px] text-[#888]">{v.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-1.5 bg-[#111] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#333] rounded-full"
                      style={{ width: `${(v.usedCapacity / v.totalCapacity) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-[#444]">
                    {Math.round((v.usedCapacity / v.totalCapacity) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Coming Soon */}
      <div className="mt-4 card p-6 border-dashed border-[#1a1a1a] bg-[#040404]">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="tag tag-active">Coming Soon</span>
              <span className="text-[10px] font-mono text-[#333]">Q3 2024</span>
            </div>
            <h3 className="font-display text-lg font-semibold mb-1">AI Route Optimization</h3>
            <p className="text-[#555] text-sm max-w-xl">
              Our ML model will predict optimal cargo matching, dynamically reroute vehicles
              based on real-time conditions, and forecast demand patterns — reducing empty
              cargo by an estimated additional 22%.
            </p>

          </div>
          <div className="w-10 h-10 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a] flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5 text-[#333]" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { label: 'Smart Matching', desc: 'AI pairs shipments with ideal vehicles based on 14 parameters' },
            { label: 'Demand Forecasting', desc: 'Predict cargo volume 72h ahead for proactive capacity planning' },
            { label: 'Dynamic Rerouting', desc: 'Real-time adjustments based on traffic, weather, and priority' },
          ].map(({ label, desc }) => (
            <div key={label} className="bg-[#080808] border border-[#111] rounded-lg p-3">
              <p className="text-[11px] font-mono text-[#555] mb-1">{label}</p>
              <p className="text-[11px] text-[#333] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
