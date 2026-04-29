import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield, CheckCircle2 } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = location.state?.from?.pathname || '/dashboard';

  const [form,    setForm]    = useState({ email: '', password: '' });
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ve = validate();
    if (Object.keys(ve).length) { setErrors(ve); return; }
    setLoading(true);
    try {
      const data = await login(form.email, form.password);
      toast.success(data.message || 'Welcome back! 👋');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed.');
      const fe = err.response?.data?.errors;
      if (fe) { const m = {}; fe.forEach((e) => { m[e.field] = e.message; }); setErrors(m); }
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-dark-900">
      <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />

      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">SecureAuth</span>
        </div>
        <div className="space-y-8 animate-slide-right">
          <div>
            <p className="text-sm font-semibold text-brand-400 uppercase tracking-widest mb-4">Enterprise Platform</p>
            <h1 className="text-5xl font-black text-white leading-tight mb-4">
              Secure your<br /><span className="gradient-text">digital identity</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-sm">
              Enterprise-grade authentication with cutting-edge security and seamless UX.
            </p>
          </div>
          <div className="space-y-3">
            {['JWT dual-token authentication','HttpOnly cookie refresh tokens','Role-based access control','MongoDB Atlas persistence'].map((f) => (
              <div key={f} className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span className="text-sm text-slate-300">{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass rounded-2xl p-4 max-w-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">MNC</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">MNC-Grade Architecture</p>
              <p className="text-xs text-slate-400">Express.js · MongoDB · React · JWT</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-20 relative z-10">
        <div className="w-full max-w-md">
          <div className="glass-card rounded-3xl p-8 animate-slide-up">
            <div className="mb-8">
              <div className="flex lg:hidden items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold gradient-text">SecureAuth</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-1">Welcome back</h2>
              <p className="text-slate-400 text-sm">Sign in to your account to continue</p>
            </div>

            <form id="login-form" onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-slate-300 mb-2">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    id="login-email" type="email" name="email" autoComplete="email"
                    value={form.email} onChange={handleChange} placeholder="you@company.com"
                    className={`input-field w-full pl-10 pr-4 py-3 rounded-xl text-sm ${errors.email ? 'border-red-500/60' : ''}`}
                  />
                </div>
                {errors.email && <p className="mt-1.5 text-xs text-red-400">⚠ {errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="login-password" className="text-sm font-medium text-slate-300">Password</label>
                  <Link to="/forgot-password" className="text-xs text-brand-400 hover:text-brand-300 transition-colors">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    id="login-password" type={showPwd ? 'text' : 'password'} name="password"
                    autoComplete="current-password" value={form.password} onChange={handleChange}
                    placeholder="Enter your password"
                    className={`input-field w-full pl-10 pr-11 py-3 rounded-xl text-sm ${errors.password ? 'border-red-500/60' : ''}`}
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1.5 text-xs text-red-400">⚠ {errors.password}</p>}
              </div>

              <button
                id="login-submit-btn" type="submit" disabled={loading}
                className="btn-glow w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-purple-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-brand-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 mt-2"
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
              <div className="relative flex justify-center">
                <span className="px-4 text-xs text-slate-500 bg-[#0f172ab3]">Don't have an account?</span>
              </div>
            </div>
            <Link to="/register" className="block w-full text-center py-3 rounded-xl border border-brand-500/30 text-brand-400 hover:text-white hover:bg-brand-500/10 text-sm font-medium transition-all duration-200">
              Create free account →
            </Link>
          </div>
          <div className="flex items-center justify-center gap-4 mt-6">
            {['256-bit SSL','GDPR Ready','SOC 2'].map((b) => (
              <div key={b} className="flex items-center gap-1 text-xs text-slate-500">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{b}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
