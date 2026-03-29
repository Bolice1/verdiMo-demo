import { useState } from 'react';
import { vehicles } from '../data/demoData';
import {
  Truck, ChevronDown, ChevronRight, MapPin,
  User, ArrowUpRight, Zap,
} from 'lucide-react';

const typeEmoji: Record<string, string> = {
  truck: '🚛',
  van: '🚐',
  motorcycle: '🏍',
  bus: '🚌',
};

export default function FleetPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = vehicles.filter(
    (v) => statusFilter === 'all' || v.status === statusFilter
  );

  const toggle = (id: string) => setExpanded(expanded === id ? null : id);

  const statusDot = (s: string) => {
    if (s === 'active') return 'bg-[#4caf50]';
    if (s === 'idle') return 'bg-[#f5c842]';
    return 'bg-[#f55242]';
  };

  const statusTag = (s: string) => {
    if (s === 'active') return 'tag-green';
    if (s === 'idle') return 'tag-yellow';
    return 'tag-red';
  };

  const summary = {
    active: vehicles.filter((v) => v.status === 'active').length,
    idle: vehicles.filter((v) => v.status === 'idle').length,
    maintenance: vehicles.filter((v) => v.status === 'maintenance').length,
    totalCapacity: vehicles.reduce((a, v) => a + v.totalCapacity, 0),
    usedCapacity: vehicles.reduce((a, v) => a + v.usedCapacity, 0),
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="section-label mb-1">Fleet Management</p>
          <h1 className="font-display text-3xl font-bold tracking-tight">Fleet</h1>
        </div>
        <button className="btn-ghost text-sm py-2 px-4">
          + Add Vehicle
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Active', value: summary.active, sub: 'on route', color: '#4caf50' },
          { label: 'Idle', value: summary.idle, sub: 'available', color: '#f5c842' },
          { label: 'Maintenance', value: summary.maintenance, sub: 'offline', color: '#f55242' },
          {
            label: 'Fleet Utilization',
            value: `${Math.round((summary.usedCapacity / summary.totalCapacity) * 100)}%`,
            sub: `${(summary.usedCapacity / 1000).toFixed(1)}t / ${(summary.totalCapacity / 1000).toFixed(1)}t`,
            color: '#888',
          },
        ].map(({ label, value, sub, color }) => (
          <div key={label} className="card p-4">
            <p className="stat-number text-2xl mb-0.5" style={{ color }}>{value}</p>
            <p className="text-[11px] font-mono text-[#555]">{sub}</p>
            <p className="text-xs text-[#444] mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Utilization bar */}
      <div className="card p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="section-label">Overall Fleet Utilization</p>
          <span className="text-[11px] font-mono text-[#555]">
            {summary.usedCapacity.toLocaleString()} / {summary.totalCapacity.toLocaleString()} kg
          </span>
        </div>
        <div className="h-2 bg-[#0f0f0f] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${(summary.usedCapacity / summary.totalCapacity) * 100}%`,
              background: 'linear-gradient(90deg, #222 0%, #444 100%)',
            }}
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4">
        {[
          { key: 'all', label: `All (${vehicles.length})` },
          { key: 'active', label: `Active (${summary.active})` },
          { key: 'idle', label: `Idle (${summary.idle})` },
          { key: 'maintenance', label: `Maintenance (${summary.maintenance})` },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setStatusFilter(key)}
            className={`text-xs font-mono px-3 py-1.5 rounded-md border transition-all ${
              statusFilter === key
                ? 'bg-white text-black border-white'
                : 'border-[#1a1a1a] text-[#555] hover:border-[#2a2a2a]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Fleet table */}
      <div className="card overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 px-4 py-2.5 border-b border-[#0f0f0f] bg-[#080808]">
          {['Vehicle', 'Route', 'Capacity', 'Status', 'Departure', ''].map((h, i) => (
            <span
              key={i}
              className={`text-[10px] font-mono text-[#444] uppercase tracking-wider ${
                i === 0 ? 'col-span-3' :
                i === 1 ? 'col-span-3' :
                i === 2 ? 'col-span-2' :
                i === 3 ? 'col-span-1' :
                i === 4 ? 'col-span-2' :
                'col-span-1'
              }`}
            >
              {h}
            </span>
          ))}
        </div>

        {filtered.map((v) => {
          const available = v.totalCapacity - v.usedCapacity;
          const fillPct = (v.usedCapacity / v.totalCapacity) * 100;
          const isExpanded = expanded === v.id;

          return (
            <div key={v.id} className="border-b border-[#080808] last:border-0">
              {/* Row */}
              <div
                className="grid grid-cols-12 px-4 py-3.5 hover:bg-[#060606] cursor-pointer items-center transition-colors"
                onClick={() => toggle(v.id)}
              >
                {/* Vehicle */}
                <div className="col-span-3 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#0f0f0f] border border-[#1a1a1a] flex items-center justify-center text-base flex-shrink-0">
                    {typeEmoji[v.type]}
                  </div>
                  <div>
                    <p className="text-[12px] text-white font-medium">{v.name}</p>
                    <p className="text-[10px] text-[#444] font-mono">{v.id}</p>
                  </div>
                </div>

                {/* Route */}
                <div className="col-span-3 flex items-center gap-1 text-[12px] text-[#666]">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{v.origin}</span>
                  <ChevronRight className="w-3 h-3 flex-shrink-0 text-[#333]" />
                  <span className="truncate">{v.destination}</span>
                </div>

                {/* Capacity */}
                <div className="col-span-2">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="flex-1 h-1 bg-[#111] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${fillPct}%`,
                          background: fillPct > 85 ? '#f55242' : fillPct > 60 ? '#f5c842' : '#3a3a3a',
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-[#555]">{Math.round(fillPct)}%</span>
                  </div>
                  <p className="text-[10px] font-mono text-[#444]">{available.toLocaleString()} kg free</p>
                </div>

                {/* Status */}
                <div className="col-span-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${statusDot(v.status)}`} />
                    <span className={`tag ${statusTag(v.status)} text-[9px]`}>{v.status}</span>
                  </div>
                </div>

                {/* Departure */}
                <div className="col-span-2">
                  <p className="text-[12px] text-[#666] font-mono">{v.departureTime}</p>
                  <p className="text-[10px] text-[#333] font-mono">→ {v.estimatedArrival}</p>
                </div>

                {/* Expand */}
                <div className="col-span-1 flex justify-end">
                  <ChevronDown
                    className={`w-4 h-4 text-[#333] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </div>
              </div>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-0 border-t border-[#0a0a0a] bg-[#050505]">
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    <div className="space-y-2">
                      <p className="section-label mb-2">Driver Info</p>
                      <div className="flex items-center gap-2 text-[12px] text-[#666]">
                        <User className="w-3.5 h-3.5" />
                        {v.driver}
                      </div>
                      <div className="flex items-center gap-2 text-[12px] text-[#666]">
                        <Truck className="w-3.5 h-3.5" />
                        {v.company}
                      </div>
                      <div className="text-[11px] font-mono text-[#444]">
                        ${v.pricePerKg}/kg · {v.distance} km
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="section-label mb-2">Cargo Details</p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { label: 'Total', value: `${v.totalCapacity.toLocaleString()} kg` },
                          { label: 'Used', value: `${v.usedCapacity.toLocaleString()} kg` },
                          { label: 'Free', value: `${available.toLocaleString()} kg` },
                          { label: 'Fill', value: `${Math.round(fillPct)}%` },
                        ].map(({ label, value }) => (
                          <div key={label} className="bg-[#0a0a0a] rounded border border-[#0f0f0f] p-2">
                            <p className="text-[13px] text-white font-semibold">{value}</p>
                            <p className="text-[9px] font-mono text-[#444]">{label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="section-label mb-2">Environmental</p>
                      <div className="flex items-center gap-2 text-[12px] text-[#666]">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        <span>{v.co2Saved} kg CO₂ saved this trip</span>
                      </div>
                      <div className="text-[11px] font-mono text-[#444]">
                        vs. dedicated delivery vehicle
                      </div>
                      <button className="btn-ghost text-[11px] py-1.5 px-3 mt-2">
                        View Full History
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* AI note */}
      <div className="mt-4 flex items-center gap-3 p-4 card border-dashed border-[#151515]">
        <Zap className="w-4 h-4 text-[#333] flex-shrink-0" />
        <p className="text-[11px] text-[#444] font-mono">
          AI Optimization Coming Soon — Predictive maintenance alerts and automated
          capacity rebalancing across the fleet will reduce downtime by an estimated 31%.
        </p>
      </div>
    </div>
  );
}
