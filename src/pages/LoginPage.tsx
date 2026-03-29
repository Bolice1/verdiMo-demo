import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, ArrowRight, Lock, Eye, EyeOff, Shield, ChevronLeft } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@verdi.co');
  const [password, setPassword] = useState('demo1234');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<'admin' | 'operator' | 'driver'>('admin');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1100));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-1/2 border-r border-[#111] p-12 relative overflow-hidden">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(#fff 1px, transparent 1px),
              linear-gradient(90deg, #fff 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />

        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#555] hover:text-white transition-colors text-sm w-fit mb-auto"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to home
        </button>

        <div className="mb-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
              <Leaf className="w-4.5 h-4.5 text-black" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">verdiMobility</span>
          </div>

          <h1 className="font-display text-5xl font-bold leading-tight tracking-tight mb-6">
            Intelligent<br />
            <span className="text-[#444]">logistics for</span><br />
            a greener world.
          </h1>
          <p className="text-[#555] text-base leading-relaxed max-w-sm">
            Real-time fleet management, shared cargo matching, and AI-powered
            route optimization — all in one platform.
          </p>
        </div>

        {/* Security badges */}
        <div className="flex flex-col gap-2 mt-12">
          {[
            'AES-256 encrypted data transmission',
            'Role-based access control (RBAC)',
            'ISO 27001 compliant infrastructure',
          ].map((badge) => (
            <div key={badge} className="flex items-center gap-2.5 text-[#444] text-xs font-mono">
              <Shield className="w-3 h-3 text-[#333]" />
              {badge}
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center">
              <Leaf className="w-4 h-4 text-black" />
            </div>
            <span className="font-display font-bold">verdiMobility</span>
          </div>

          <p className="section-label mb-2">Secure Access</p>
          <h2 className="font-display text-3xl font-bold tracking-tight mb-8">Sign in</h2>

          {/* Role selector */}
          <div className="mb-6">
            <p className="text-xs text-[#555] mb-2 font-mono">Demo role</p>
            <div className="flex gap-2">
              {(['admin', 'operator', 'driver'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2 rounded-lg text-xs font-mono capitalize border transition-all ${
                    role === r
                      ? 'bg-white text-black border-white'
                      : 'border-[#1a1a1a] text-[#555] hover:border-[#333] hover:text-[#888]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs text-[#555] font-mono block mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#444] transition-colors font-mono"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label className="text-xs text-[#555] font-mono block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg px-4 py-3 pr-10 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#444] transition-colors font-mono"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444] hover:text-[#888] transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 py-1">
              <Lock className="w-3 h-3 text-[#333]" />
              <span className="text-[10px] text-[#444] font-mono">Secure authentication · Demo credentials pre-filled</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 text-sm"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Authenticating…
                </span>
              ) : (
                <>
                  Access Dashboard <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-[#333] text-xs font-mono mt-6">
            This is a demo environment · No real data
          </p>
        </div>
      </div>
    </div>
  );
}
