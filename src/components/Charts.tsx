interface BarChartProps {
  data: { label: string; value: number }[];
  maxValue?: number;
  height?: number;
}

export function BarChart({ data, maxValue, height = 80 }: BarChartProps) {
  const max = maxValue ?? Math.max(...data.map((d) => d.value));

  return (
    <div className="flex items-end gap-1.5" style={{ height }}>
      {data.map((d) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
          <div
            className="w-full bg-[#1a1a1a] rounded-sm hover:bg-[#2a2a2a] transition-all relative"
            style={{ height: `${(d.value / max) * 100}%` }}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#111] border border-[#222] px-1.5 py-0.5 rounded text-[10px] font-mono text-white whitespace-nowrap">
              {d.value}
            </div>
          </div>
          <span className="text-[9px] font-mono text-[#444]">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

interface LineChartProps {
  data: { label: string; value: number }[];
  height?: number;
}

export function MiniLineChart({ data, height = 60 }: LineChartProps) {
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const range = max - min || 1;
  const w = 300;
  const h = height;
  const pad = 4;

  const points = data.map((d, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((d.value - min) / range) * (h - pad * 2);
    return { x, y, ...d };
  });

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${h} L ${points[0].x} ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }}>
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#lineGrad)" />
      <path d={pathD} fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p) => (
        <circle key={p.label} cx={p.x} cy={p.y} r="2.5" fill="#555" />
      ))}
    </svg>
  );
}
