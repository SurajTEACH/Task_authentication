import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import {
  Shield, User, Mail, Calendar, LogOut, Activity,
  Lock, Globe, TrendingUp, Clock, CheckCircle, Star,
  BarChart3, Zap, Award, Bell
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color, sublabel }) => (
  <div className="glass-card rounded-2xl p-5 hover:border-brand-500/25 transition-all duration-300 group shimmer">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <TrendingUp className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <p className="text-2xl font-bold text-white mb-1">{value}</p>
    <p className="text-sm font-medium text-slate-300">{label}</p>
    {sublabel && <p className="text-xs text-slate-500 mt-0.5">{sublabel}</p>}
  </div>
);

const ActivityItem = ({ icon: Icon, title, time, color }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/3 transition-colors group">
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
      <Icon className="w-4 h-4 text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{title}</p>
      <p className="text-xs text-slate-500">{time}</p>
    </div>
    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
  </div>
);

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch { toast.error('Logout failed.'); }
  };

  const getInitials = (name = '') =>
    name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  const getGreeting = () => {
    const h = currentTime.getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'N/A';

  const activities = [
    { icon: Shield, title: 'Account created successfully',          time: memberSince,        color: 'bg-brand-500/20' },
    { icon: Lock,   title: 'JWT access token issued',               time: 'Just now',          color: 'bg-purple-500/20' },
    { icon: Globe,  title: 'Session established via refresh cookie', time: 'Just now',          color: 'bg-cyan-500/20' },
    { icon: CheckCircle, title: 'Profile verified',                 time: 'On registration',   color: 'bg-emerald-500/20' },
  ];

  return (
    <div className="min-h-screen bg-dark-900 relative overflow-x-hidden">
      <div className="orb orb-1" /><div className="orb orb-2" />
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 page-enter">

        {/* ── Welcome Banner ──────────────────────────────────────── */}
        <div className="glass-card rounded-3xl p-6 md:p-8 mb-8 relative overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-brand-600/20 to-transparent rounded-bl-full pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-xl font-bold text-white shadow-xl shadow-brand-500/30">
                  {getInitials(user?.name)}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-dark-900 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-400 font-medium">{getGreeting()},</p>
                <h1 className="text-2xl md:text-3xl font-bold text-white">{user?.name} 👋</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-full px-2 py-0.5">
                    ● Online
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold bg-brand-500/15 text-brand-400 border border-brand-500/30 rounded-full px-2 py-0.5">
                    <Award className="w-3 h-3" /> {user?.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Live clock */}
              <div className="glass rounded-xl px-4 py-3 text-center hidden sm:block">
                <p className="text-lg font-bold text-white font-mono">
                  {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-xs text-slate-400">
                  {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </p>
              </div>
              <button
                id="dashboard-logout-btn" onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200 text-sm font-medium"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* ── Stats Grid ──────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Shield}   label="Security Score"   value="98/100" sublabel="Excellent"       color="bg-brand-500/20" />
          <StatCard icon={Activity} label="Active Sessions"  value="1"      sublabel="This device"     color="bg-purple-500/20" />
          <StatCard icon={Zap}      label="API Requests"     value="—"      sublabel="Lifetime total"  color="bg-cyan-500/20" />
          <StatCard icon={Star}     label="Account Standing" value="Gold"   sublabel="Premium tier"    color="bg-amber-500/20" />
        </div>

        {/* ── Main content row ────────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Profile card */}
          <div className="glass-card rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-4 h-4 text-brand-400" />
              <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Profile Details</h2>
            </div>
            <div className="space-y-4">
              {[
                { icon: User,     label: 'Full Name',     value: user?.name },
                { icon: Mail,     label: 'Email',         value: user?.email },
                { icon: Shield,   label: 'Role',          value: user?.role },
                { icon: Calendar, label: 'Member Since',  value: memberSince },
                { icon: Clock,    label: 'Last Login',    value: user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Just now' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/3 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-brand-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 font-medium">{label}</p>
                    <p className="text-sm font-medium text-slate-200 truncate">{value || '—'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity feed */}
          <div className="glass-card rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" />
                <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Recent Activity</h2>
              </div>
              <Bell className="w-4 h-4 text-slate-500" />
            </div>
            <div className="space-y-1">
              {activities.map((a, i) => (
                <ActivityItem key={i} {...a} />
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/5">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>4 events today</span>
                <span className="text-brand-400 hover:text-brand-300 cursor-pointer">View all →</span>
              </div>
            </div>
          </div>

          {/* Security panel */}
          <div className="glass-card rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Lock className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Security Status</h2>
            </div>
            {/* Score ring */}
            <div className="flex flex-col items-center py-4 mb-6">
              <div className="relative w-28 h-28">
                <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#1e293b" strokeWidth="10" fill="none" />
                  <circle cx="50" cy="50" r="40" stroke="url(#scoreGrad)" strokeWidth="10" fill="none"
                    strokeDasharray="251.2" strokeDashoffset="5" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-2xl font-black text-white">98</p>
                  <p className="text-xs text-slate-400">/ 100</p>
                </div>
              </div>
              <p className="mt-3 text-sm font-semibold text-emerald-400">Excellent</p>
            </div>
            <div className="space-y-3">
              {[
                { label: 'JWT Auth',           ok: true },
                { label: 'Refresh Token',      ok: true },
                { label: 'bcrypt Hashing',     ok: true },
                { label: 'HttpOnly Cookie',    ok: true },
                { label: '2FA (coming soon)',  ok: false },
              ].map(({ label, ok }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">{label}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${ok ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-500/15 text-slate-400'}`}>
                    {ok ? '✓ Active' : '○ Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom analytics bar ─────────────────────────────────── */}
        <div className="glass-card rounded-3xl p-6 mt-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-brand-400" />
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">System Overview</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Backend',    value: 'Express.js',   color: 'text-green-400' },
              { label: 'Database',   value: 'MongoDB',      color: 'text-emerald-400' },
              { label: 'Auth',       value: 'JWT + bcrypt', color: 'text-brand-400' },
              { label: 'Frontend',   value: 'React + Vite', color: 'text-cyan-400' },
            ].map(({ label, value, color }) => (
              <div key={label} className="text-center p-3 rounded-xl bg-white/3">
                <p className={`text-sm font-bold ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
