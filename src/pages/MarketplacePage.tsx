import { useState, useMemo } from 'react';
import { vehicles, type Vehicle } from '../data/demoData';
import {
  Package, Filter, ChevronDown, Truck, MapPin,
  Clock, ArrowRight, Star, Zap, X,
} from 'lucide-react';

const destinations = ['All', ...Array.from(new Set(vehicles.map((v) => v.destination)))];
const capacityRanges = [
  { label: 'All sizes', min: 0, max: Infinity },
  { label: 'Small (< 200 kg)', min: 0, max: 200 },
  { label: 'Medium (200–2000 kg)', min: 200, max: 2000 },
  { label: 'Large (> 2000 kg)', min: 2000, max: Infinity },
];

export default function MarketplacePage() {
  const [destFilter, setDestFilter] = useState('All');
  const [capFilter, setCapFilter] = useState(0);
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const [booked, setBooked] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const cap = capacityRanges[capFilter];
    return vehicles.filter((v) => {
      const available = v.totalCapacity - v.usedCapacity;
      if (v.status === 'maintenance') return false;
      if (destFilter !== 'All' && v.destination !== destFilter) return false;
      if (available < cap.min || available > cap.max) return false;
      if (typeFilter !== 'All' && v.type !== typeFilter) return false;
      return true;
    });
  }, [destFilter, capFilter, typeFilter]);

  const handleBook = (id: string) => {
    setBooked((prev) => new Set([...prev, id]));
    setSelected(null);
  };

  const typeIcon = (type: string) => {
    switch (type) {
      case 'truck': return '🚛';
      case 'van': return '🚐';
      case 'motorcycle': return '🏍';
      case 'bus': return '🚌';
      default: return '🚚';
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="section-label mb-1">Available Capacity</p>
          <h1 className="font-display text-3xl font-bold tracking-tight">Marketplace</h1>
        </div>
        <div className="text-right">
          <p className="stat-number text-2xl">{filtered.length}</p>
          <p className="text-[11px] text-[#555] font-mono">vehicles available</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6 p-4 card">
        <Filter className="w-4 h-4 text-[#555]" />
        <span className="text-[11px] font-mono text-[#555]">Filters:</span>

        {/* Destination */}
        <div className="relative">
          <select
            value={destFilter}
            onChange={(e) => setDestFilter(e.target.value)}
            className="appearance-none bg-[#111] border border-[#1a1a1a] text-[#aaa] text-xs font-mono px-3 py-1.5 pr-7 rounded-lg focus:outline-none focus:border-[#333] cursor-pointer"
          >
            {destinations.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#444] pointer-events-none" />
        </div>

        {/* Capacity */}
        <div className="relative">
          <select
            value={capFilter}
            onChange={(e) => setCapFilter(Number(e.target.value))}
            className="appearance-none bg-[#111] border border-[#1a1a1a] text-[#aaa] text-xs font-mono px-3 py-1.5 pr-7 rounded-lg focus:outline-none focus:border-[#333] cursor-pointer"
          >
            {capacityRanges.map((r, i) => <option key={i} value={i}>{r.label}</option>)}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#444] pointer-events-none" />
        </div>

        {/* Type */}
        <div className="flex gap-1.5">
          {['All', 'truck', 'van', 'bus', 'motorcycle'].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono capitalize border transition-all ${
                typeFilter === t
                  ? 'bg-white text-black border-white'
                  : 'border-[#1a1a1a] text-[#555] hover:border-[#333]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {(destFilter !== 'All' || capFilter !== 0 || typeFilter !== 'All') && (
          <button
            onClick={() => { setDestFilter('All'); setCapFilter(0); setTypeFilter('All'); }}
            className="ml-auto flex items-center gap-1 text-[#555] hover:text-white text-[11px] font-mono transition-colors"
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="card p-16 text-center">
          <Package className="w-8 h-8 text-[#222] mx-auto mb-3" />
          <p className="text-[#555] text-sm">No vehicles match your filters.</p>
          <button
            onClick={() => { setDestFilter('All'); setCapFilter(0); setTypeFilter('All'); }}
            className="btn-ghost text-sm mt-4 py-2 px-4"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((v) => {
            const available = v.totalCapacity - v.usedCapacity;
            const fillPct = (v.usedCapacity / v.totalCapacity) * 100;
            const isBooked = booked.has(v.id);

            return (
              <div
                key={v.id}
                className={`card p-5 cursor-pointer transition-all hover:border-[#2a2a2a] ${selected?.id === v.id ? 'border-[#333]' : ''}`}
                onClick={() => setSelected(v.id === selected?.id ? null : v)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#111] border border-[#1a1a1a] flex items-center justify-center text-lg">
                      {typeIcon(v.type)}
                    </div>
                    <div>
                      <p className="text-[12px] font-mono text-[#444]">{v.id}</p>
                      <p className="text-sm font-semibold text-white">{v.name}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {isBooked ? (
                      <span className="tag tag-green">Booked</span>
                    ) : (
                      <span className={`tag ${v.status === 'active' ? 'tag-green' : 'tag-yellow'}`}>
                        {v.status}
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-[#444] capitalize">{v.type}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[12px] text-[#666] mb-3">
                  <MapPin className="w-3 h-3" />
                  <span>{v.origin}</span>
                  <ArrowRight className="w-3 h-3 text-[#333]" />
                  <span>{v.destination}</span>
                  <span className="ml-auto font-mono text-[#444] text-[10px]">{v.distance} km</span>
                </div>

                {/* Capacity bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-[10px] font-mono text-[#555] mb-1.5">
                    <span>Cargo fill: {Math.round(fillPct)}%</span>
                    <span className="text-[#888]">{available.toLocaleString()} kg free</span>
                  </div>
                  <div className="h-1.5 bg-[#111] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${fillPct}%`,
                        background: fillPct > 85 ? '#f55242' : fillPct > 60 ? '#f5c842' : '#3a3a3a',
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#555]">
                    <Clock className="w-3 h-3" />
                    {v.departureTime}
                    <span className="text-[#2a2a2a]">·</span>
                    ETA {v.estimatedArrival}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[12px] font-mono text-white font-semibold">${v.pricePerKg}</span>
                    <span className="text-[10px] text-[#444]">/kg</span>
                  </div>
                </div>

                {/* Expanded */}
                {selected?.id === v.id && (
                  <div
                    className="mt-4 pt-4 border-t border-[#111] space-y-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-[#0a0a0a] rounded-lg border border-[#111] py-2">
                        <p className="text-[13px] font-semibold text-white">{v.totalCapacity.toLocaleString()}</p>
                        <p className="text-[9px] text-[#444] font-mono">Total kg</p>
                      </div>
                      <div className="bg-[#0a0a0a] rounded-lg border border-[#111] py-2">
                        <p className="text-[13px] font-semibold text-white">{available.toLocaleString()}</p>
                        <p className="text-[9px] text-[#444] font-mono">Available kg</p>
                      </div>
                      <div className="bg-[#0a0a0a] rounded-lg border border-[#111] py-2">
                        <p className="text-[13px] font-semibold text-white">{v.co2Saved}</p>
                        <p className="text-[9px] text-[#444] font-mono">kg CO₂ saved</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-[#555]">
                      <Truck className="w-3.5 h-3.5" />
                      Driver: {v.driver} · {v.company}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {[1,2,3,4,5].map((s) => (
                          <Star key={s} className="w-3 h-3 fill-[#333] text-[#333]" />
                        ))}
                      </div>
                      <span className="text-[10px] text-[#444] font-mono">4.8 · 127 trips</span>
                    </div>
                    <button
                      onClick={() => handleBook(v.id)}
                      disabled={isBooked}
                      className="btn-primary w-full justify-center py-2.5 text-sm"
                    >
                      {isBooked ? '✓ Request Sent' : 'Request Cargo Space'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* AI Banner */}
      <div className="mt-6 card p-4 border-dashed border-[#151515] flex items-center gap-4">
        <div className="w-8 h-8 rounded-lg bg-[#0a0a0a] border border-[#111] flex items-center justify-center flex-shrink-0">
          <Zap className="w-4 h-4 text-[#333]" />
        </div>
        <div>
          <p className="text-[12px] font-semibold text-[#666] mb-0.5">AI Smart Matching — Coming Soon</p>
          <p className="text-[11px] text-[#333] font-mono">
            Post your shipment once and our algorithm automatically finds the best vehicle,
            negotiates space, and books it — no manual filtering required.
          </p>
        </div>
      </div>
    </div>
  );
}
