import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Leaf,
  BarChart3,
  Globe,
  Zap,
  Users,
  Package,
  TrendingDown,
  CheckCircle2,
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-[#111] bg-black/90 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center">
            <Leaf className="w-4 h-4 text-black" strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold text-[15px] tracking-tight">verdiMobility</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/login')} className="btn-ghost text-sm py-2 px-4">
            Sign in
          </button>
          <button
            onClick={() => navigate('/login')}
            className="btn-primary text-sm py-2 px-4"
          >
            Start Demo <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-28 px-8 max-w-6xl mx-auto">
        <div className="fade-up fade-up-1">
          <span className="tag tag-active mb-6 inline-flex">
            ✦ Smart Shared Logistics Platform
          </span>
        </div>
        <h1 className="fade-up fade-up-2 font-display text-[72px] leading-[1.0] font-bold tracking-[-0.04em] mb-8 max-w-4xl">
          Move Goods.<br />
          <span className="text-[#555]">Cut Emissions.</span><br />
          Grow Together.
        </h1>
        <p className="fade-up fade-up-3 text-[#666] text-xl leading-relaxed max-w-xl mb-10">
          verdiMobility connects shipments with vehicles already on the road.
          AI-powered matching. Empty cargo eliminated. CO₂ reduced at scale.
        </p>
        <div className="fade-up fade-up-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="btn-primary text-base py-3 px-7"
          >
            Start Demo <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-ghost text-base py-3 px-7"
          >
            Learn More
          </button>
        </div>

        {/* Stats row */}
        <div className="fade-up fade-up-5 mt-20 grid grid-cols-3 gap-8 max-w-2xl">
          {[
            { value: '1,842', label: 'Tons CO₂ Saved', suffix: 't' },
            { value: '14,623', label: 'Shipments Matched', suffix: '' },
            { value: '892', label: 'Active Vehicles', suffix: '' },
          ].map((s) => (
            <div key={s.label}>
              <p className="stat-number text-[40px] text-white mb-1">{s.value}</p>
              <p className="text-[#555] text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Marquee divider */}
      <div className="border-y border-[#111] py-3 overflow-hidden bg-[#030303]">
        <div className="flex gap-12 whitespace-nowrap text-[#333] font-mono text-xs tracking-widest animate-[scroll_20s_linear_infinite]">
          {Array(6).fill(['ROUTE OPTIMIZATION', 'EMPTY CARGO', 'AI MATCHING', 'CO₂ REDUCTION', 'SHARED LOGISTICS', 'EAST AFRICA']).flat().map((t, i) => (
            <span key={i}>✦ {t}</span>
          ))}
        </div>
      </div>

      {/* Problem */}
      <section id="problem" className="py-28 px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-16 items-start">
          <div>
            <p className="section-label mb-4">The Problem</p>
            <h2 className="font-display text-[44px] font-bold leading-tight tracking-tight mb-6">
              Vehicles travel empty.<br />
              <span className="text-[#555]">Costs stay high.</span>
            </h2>
            <p className="text-[#666] leading-relaxed mb-8">
              Across East Africa and beyond, trucks, buses, and vans complete
              millions of journeys every day with significant unused cargo capacity.
              Meanwhile, farmers, SMEs, and individuals pay premium prices for
              dedicated delivery services.
            </p>
            <div className="space-y-3">
              {[
                'Up to 40% of vehicle capacity wasted per trip',
                'SMEs pay 3–5× more than necessary for logistics',
                'Unnecessary fuel burn drives CO₂ emissions',
                'Farmers lose market access due to high transport costs',
              ].map((p) => (
                <div key={p} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border border-[#222] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#444]" />
                  </div>
                  <span className="text-[#888] text-sm">{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: TrendingDown, label: 'Wasted Capacity', val: '~40%', sub: 'avg per trip' },
              { icon: BarChart3, label: 'Cost Overhead', val: '3–5×', sub: 'vs optimal' },
              { icon: Globe, label: 'Extra Emissions', val: '+28%', sub: 'unnecessary CO₂' },
              { icon: Users, label: 'Underserved SMEs', val: '2.1M+', sub: 'in East Africa' },
            ].map(({ icon: Icon, label, val, sub }) => (
              <div key={label} className="card p-5">
                <Icon className="w-5 h-5 text-[#444] mb-3" />
                <p className="stat-number text-2xl text-white mb-0.5">{val}</p>
                <p className="text-xs text-[#666]">{label}</p>
                <p className="text-[10px] text-[#444] font-mono mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-28 px-8 max-w-6xl mx-auto border-t border-[#111]">
        <p className="section-label mb-4">The Solution</p>
        <h2 className="font-display text-[44px] font-bold leading-tight tracking-tight mb-16 max-w-2xl">
          Match goods with journeys<br />
          <span className="text-[#555]">already underway.</span>
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              icon: Package,
              step: '01',
              title: 'Post a Shipment',
              desc: 'Businesses and individuals post shipment details — weight, origin, destination, urgency.',
            },
            {
              icon: Zap,
              step: '02',
              title: 'AI Matches Vehicle',
              desc: 'Our algorithm finds the best-fit vehicle already traveling that route with available cargo space.',
            },
            {
              icon: CheckCircle2,
              step: '03',
              title: 'Goods Delivered',
              desc: 'Track in real-time. Sender and recipient get notifications. Driver earns extra income.',
            },
          ].map(({ icon: Icon, step, title, desc }) => (
            <div key={step} className="card p-6 hover:bg-[#0d0d0d] transition-colors">
              <div className="flex items-start justify-between mb-5">
                <div className="w-10 h-10 rounded-lg bg-[#111] border border-[#1a1a1a] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#888]" />
                </div>
                <span className="font-mono text-[#2a2a2a] text-2xl font-bold">{step}</span>
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
              <p className="text-[#666] text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SDGs */}
      <section className="py-28 px-8 max-w-6xl mx-auto border-t border-[#111]">
        <div className="grid grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label mb-4">Global Impact</p>
            <h2 className="font-display text-[44px] font-bold leading-tight tracking-tight mb-6">
              Aligned with<br />
              <span className="text-[#555]">UN SDGs.</span>
            </h2>
            <p className="text-[#666] leading-relaxed mb-8">
              verdiMobility directly contributes to four Sustainable Development Goals,
              creating measurable impact across environmental, economic, and social dimensions.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="btn-primary"
            >
              Explore the Platform <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { num: 'SDG 9', title: 'Industry, Innovation & Infrastructure', color: '#f26522' },
              { num: 'SDG 11', title: 'Sustainable Cities & Communities', color: '#f99d26' },
              { num: 'SDG 12', title: 'Responsible Consumption & Production', color: '#bf8b2e' },
              { num: 'SDG 13', title: 'Climate Action', color: '#3f7e44' },
            ].map(({ num, title }) => (
              <div key={num} className="card p-5 hover:bg-[#0d0d0d] transition-colors">
                <span className="font-mono text-[10px] text-[#444] tracking-widest uppercase block mb-2">{num}</span>
                <p className="text-[13px] text-[#aaa] leading-snug">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-8 max-w-6xl mx-auto border-t border-[#111]">
        <div className="card p-16 text-center bg-[#040404]">
          <p className="section-label mb-4">Ready to See It Live?</p>
          <h2 className="font-display text-[52px] font-bold leading-tight tracking-tight mb-6 max-w-2xl mx-auto">
            The future of shared logistics starts here.
          </h2>
          <p className="text-[#666] text-lg mb-10 max-w-md mx-auto">
            Access the full demo — live map, fleet tracking, marketplace, and admin panel.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="btn-primary text-base py-3.5 px-9"
          >
            Start Demo Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#111] py-8 px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
            <Leaf className="w-3 h-3 text-black" strokeWidth={2.5} />
          </div>
          <span className="text-[#444] text-sm font-mono">verdiMobility © 2024</span>
        </div>
        <p className="text-[#2a2a2a] text-xs font-mono">Built for international innovation competition</p>
      </footer>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
