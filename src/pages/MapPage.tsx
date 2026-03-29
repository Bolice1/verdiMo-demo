import { useState } from 'react';
import { vehicles, type Vehicle } from '../data/demoData';
import { Truck, X, MapPin, Clock, Package, Zap } from 'lucide-react';

// Map bounds for East Africa region
const MAP_BOUNDS = {
  minLat: -8,
  maxLat: 5,
  minLng: 27,
  maxLng: 43,
};

function project(lat: number, lng: number, w: number, h: number) {
  const x = ((lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng)) * w;
  const y = h - ((lat - MAP_BOUNDS.minLat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * h;
  return { x, y };
}

const CITIES = [
  { name: 'Kigali', lat: -1.9441, lng: 30.0619 },
  { name: 'Nairobi', lat: -1.2921, lng: 36.8219 },
  { name: 'Kampala', lat: 0.3476, lng: 32.5825 },
  { name: 'Dar es Salaam', lat: -6.7924, lng: 39.2083 },
  { name: 'Mombasa', lat: -4.0435, lng: 39.6682 },
  { name: 'Bujumbura', lat: -3.3869, lng: 29.3622 },
  { name: 'Goma', lat: -1.6796, lng: 29.2289 },
  { name: 'Musanze', lat: -1.4993, lng: 29.6342 },
];

export default function MapPage() {
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'idle'>('all');

  const W = 780;
  const H = 480;

  const filtered = vehicles.filter((v) =>
    filter === 'all' ? true : v.status === filter
  );

  const statusColor = (s: string) =>
    s === 'active' ? '#4caf50' : s === 'idle' ? '#f5c842' : '#f55242';

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="section-label mb-1">Fleet Visualization</p>
          <h1 className="font-display text-3xl font-bold tracking-tight">Live Map</h1>
        </div>
        <div className="flex gap-2">
          {(['all', 'active', 'idle'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs font-mono px-3 py-1.5 rounded-md border capitalize transition-all ${
                filter === f
                  ? 'bg-white text-black border-white'
                  : 'border-[#1a1a1a] text-[#555] hover:border-[#333]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Map SVG */}
        <div className="col-span-2 card overflow-hidden bg-[#060606]">
          <div className="relative">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full"
              style={{ display: 'block' }}
            >
              {/* Grid */}
              {Array.from({ length: 16 }, (_, i) => (
                <line key={`v${i}`} x1={(i / 15) * W} y1={0} x2={(i / 15) * W} y2={H} stroke="#0f0f0f" strokeWidth="1" />
              ))}
              {Array.from({ length: 10 }, (_, i) => (
                <line key={`h${i}`} x1={0} y1={(i / 9) * H} x2={W} y2={(i / 9) * H} stroke="#0f0f0f" strokeWidth="1" />
              ))}

              {/* Route lines */}
              {filtered.map((v) => {
                const from = project(v.lat, v.lng, W, H);
                const to = project(v.destLat, v.destLng, W, H);
                const color = statusColor(v.status);
                return (
                  <g key={`route-${v.id}`}>
                    <line
                      x1={from.x} y1={from.y}
                      x2={to.x} y2={to.y}
                      stroke={color}
                      strokeWidth="1"
                      strokeOpacity="0.15"
                      strokeDasharray="4 4"
                    />
                  </g>
                );
              })}

              {/* City dots */}
              {CITIES.map((city) => {
                const p = project(city.lat, city.lng, W, H);
                return (
                  <g key={city.name}>
                    <circle cx={p.x} cy={p.y} r="3" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
                    <text
                      x={p.x + 6}
                      y={p.y + 4}
                      fill="#333"
                      fontSize="9"
                      fontFamily="DM Mono, monospace"
                    >
                      {city.name}
                    </text>
                  </g>
                );
              })}

              {/* Vehicle markers */}
              {filtered.map((v) => {
                const p = project(v.lat, v.lng, W, H);
                const color = statusColor(v.status);
                const isSelected = selected?.id === v.id;
                const fillPct = v.usedCapacity / v.totalCapacity;

                return (
                  <g
                    key={v.id}
                    onClick={() => setSelected(v.id === selected?.id ? null : v)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Pulse ring for active */}
                    {v.status === 'active' && (
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={isSelected ? 18 : 14}
                        fill={color}
                        fillOpacity="0.06"
                        stroke={color}
                        strokeOpacity="0.15"
                        strokeWidth="1"
                      />
                    )}
                    {/* Marker */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isSelected ? 8 : 6}
                      fill="#0a0a0a"
                      stroke={color}
                      strokeWidth={isSelected ? 2 : 1.5}
                    />
                    {/* Fill indicator */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isSelected ? 4 : 3}
                      fill={fillPct > 0.8 ? '#f55242' : fillPct > 0.4 ? '#f5c842' : '#4caf50'}
                      fillOpacity="0.8"
                    />
                  </g>
                );
              })}

              {/* Legend */}
              <g>
                <rect x={W - 110} y={H - 58} width={100} height={50} rx="4" fill="#0a0a0a" stroke="#1a1a1a" strokeWidth="1" />
                {[
                  { color: '#4caf50', label: 'Active' },
                  { color: '#f5c842', label: 'Idle' },
                  { color: '#f55242', label: 'Maintenance' },
                ].map(({ color, label }, i) => (
                  <g key={label}>
                    <circle cx={W - 100} cy={H - 44 + i * 13} r="3" fill={color} />
                    <text x={W - 93} y={H - 40 + i * 13} fill="#444" fontSize="8" fontFamily="DM Mono, monospace">{label}</text>
                  </g>
                ))}
              </g>
            </svg>

            {/* Map label */}
            <div className="absolute top-3 left-3 tag tag-active text-[10px]">
              ● East Africa Region
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-3 overflow-y-auto max-h-[500px] pr-1">
          {selected ? (
            <div className="card p-4 border-[#222]">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-mono text-[10px] text-[#555] mb-1">{selected.id}</p>
                  <p className="text-sm font-semibold text-white">{selected.name}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-[#444] hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 text-[12px]">
                <div className="flex items-center gap-2 text-[#666]">
                  <MapPin className="w-3.5 h-3.5" />
                  {selected.origin} → {selected.destination}
                </div>
                <div className="flex items-center gap-2 text-[#666]">
                  <Clock className="w-3.5 h-3.5" />
                  Departs {selected.departureTime} · ETA {selected.estimatedArrival}
                </div>
                <div className="flex items-center gap-2 text-[#666]">
                  <Package className="w-3.5 h-3.5" />
                  {selected.usedCapacity.toLocaleString()} / {selected.totalCapacity.toLocaleString()} kg
                </div>
                <div className="flex items-center gap-2 text-[#666]">
                  <Truck className="w-3.5 h-3.5" />
                  {selected.driver}
                </div>
              </div>
              {/* Capacity bar */}
              <div className="mt-3">
                <div className="flex justify-between text-[10px] font-mono text-[#444] mb-1">
                  <span>Cargo fill</span>
                  <span>{Math.round((selected.usedCapacity / selected.totalCapacity) * 100)}%</span>
                </div>
                <div className="h-1.5 bg-[#111] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(selected.usedCapacity / selected.totalCapacity) * 100}%`,
                      background: selected.usedCapacity / selected.totalCapacity > 0.8 ? '#f55242' : '#4caf50',
                    }}
                  />
                </div>
              </div>
              <div className="mt-3 p-2 bg-[#0a0a0a] rounded border border-[#111] text-[10px] font-mono text-[#555]">
                {(selected.totalCapacity - selected.usedCapacity).toLocaleString()} kg available · ${selected.pricePerKg}/kg
              </div>
            </div>
          ) : (
            <div className="card p-4 text-center">
              <MapPin className="w-5 h-5 text-[#333] mx-auto mb-2" />
              <p className="text-[12px] text-[#555]">Click a vehicle marker to view details</p>
            </div>
          )}

          {filtered.map((v) => (
            <div
              key={v.id}
              onClick={() => setSelected(v.id === selected?.id ? null : v)}
              className={`card p-3 cursor-pointer transition-all ${selected?.id === v.id ? 'border-[#333]' : 'hover:border-[#222]'}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-[11px] font-mono text-[#555]">{v.id}</p>
                  <p className="text-[12px] text-[#ccc] font-medium">{v.name}</p>
                </div>
                <span
                  className="w-2 h-2 rounded-full mt-1 flex-shrink-0"
                  style={{ background: statusColor(v.status) }}
                />
              </div>
              <p className="text-[10px] text-[#444] mb-2">{v.origin} → {v.destination}</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 bg-[#111] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(v.usedCapacity / v.totalCapacity) * 100}%`,
                      background: v.usedCapacity / v.totalCapacity > 0.8 ? '#f55242' : '#3a3a3a',
                    }}
                  />
                </div>
                <span className="text-[9px] font-mono text-[#444] whitespace-nowrap">
                  {(v.totalCapacity - v.usedCapacity).toLocaleString()}kg free
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI note */}
      <div className="mt-4 flex items-center gap-3 p-4 card border-dashed border-[#151515]">
        <Zap className="w-4 h-4 text-[#333] flex-shrink-0" />
        <p className="text-[11px] text-[#444] font-mono">
          AI Optimization Coming Soon — Smart routing will auto-cluster nearby shipments and
          suggest optimal vehicle re-assignments in real time.
        </p>
      </div>
    </div>
  );
}
