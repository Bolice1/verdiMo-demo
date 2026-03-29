import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  ShoppingBag,
  Truck,
  Settings,
  LogOut,
  Leaf,
  Bell,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/map', icon: Map, label: 'Live Map' },
  { to: '/marketplace', icon: ShoppingBag, label: 'Marketplace' },
  { to: '/fleet', icon: Truck, label: 'Fleet' },
  { to: '/admin', icon: Settings, label: 'Admin' },
];

export default function AppLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 flex flex-col border-r border-[#111] bg-[#030303]">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-[#111]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center flex-shrink-0">
              <Leaf className="w-4 h-4 text-black" strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-display font-700 text-[15px] text-white leading-none tracking-tight">verdiMobility</p>
              <p className="text-[10px] text-[#444] font-mono mt-0.5">v1.0 DEMO</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          <p className="section-label px-2 mb-3">Navigation</p>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `nav-link w-full justify-between group ${isActive ? 'active' : ''}`
              }
            >
              <span className="flex items-center gap-2.5">
                <Icon className="w-4 h-4" />
                {label}
              </span>
              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity" />
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-[#111] space-y-1">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg mb-2">
            <div className="w-7 h-7 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[11px] font-mono text-[#888]">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-[#ccc] font-medium truncate">Admin User</p>
              <p className="text-[10px] text-[#444] truncate">admin@verdi.co</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="nav-link w-full text-[#444] hover:text-[#888]"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-12 flex-shrink-0 flex items-center justify-between px-6 border-b border-[#111] bg-[#030303]">
          <div className="flex items-center gap-2">
            <span className="tag tag-green">● LIVE DEMO</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-1.5 rounded-lg hover:bg-[#111] transition-colors">
              <Bell className="w-4 h-4 text-[#555]" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full"></span>
            </button>
            <div className="h-4 w-px bg-[#1a1a1a]" />
            <span className="text-[11px] font-mono text-[#444]">East Africa Region</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-black">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
