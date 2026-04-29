import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Shield, CheckCircle2 } from 'lucide-react';

const PASSWORD_RULES = [
  { label: 'At least 6 characters',  test: (p) => p.length >= 6 },
  { label: 'Contains a number',       test: (p) => /\d/.test(p) },
  { label: 'Contains a letter',       test: (p) => /[a-zA-Z]/.test(p) },
];

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form,    setForm]    = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showCfm, setShowCfm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    else if (form.name.trim().length < 2) errs.name = 'Name must be at least 2 characters';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'At least 6 characters';
    else if (!/\d/.test(form.password)) errs.password = 'Must contain a number';
    if (!form.confirm) errs.confirm = 'Please confirm your password';
    else if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ve = validate();
    if (Object.keys(ve).length) { setErrors(ve); return; }
    setLoading(true);
    try {
      const data = await register(form.name, form.email, form.password);
      toast.success(data.message || 'Account created! Welcome 🎉');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed.');
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
            <p className="text-sm font-semibold text-purple-400 uppercase tracking-widest mb-4">Join Today</p>
            <h1 className="text-5xl font-black text-white leading-tight mb-4">
              Start your<br /><span className="gradient-text">secure journey</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-sm">
              Create your account in seconds. Powered by enterprise-grade infrastructure built for scale.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { val: '99.9%', label: 'Uptime SLA' },
              { val: '<50ms', label: 'Auth latency' },
              { val: 'AES-256', label: 'Encryption' },
              { val: 'RBAC', label: 'Access control' },
            ].map(({ val, label }) => (
              <div key={label} className="glass rounded-2xl p-4">
                <p className="text-2xl font-bold gradient-text">{val}</p>
                <p className="text-xs text-slate-400 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-600">
          By creating an account you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 relative z-10">
        <div className="w-full max-w-md">
          <div className="glass-card rounded-3xl p-8 animate-slide-up">
            <div className="mb-7">
              <div className="flex lg:hidden items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold gradient-text">SecureAuth</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-1">Create account</h2>
              <p className="text-slate-400 text-sm">Join thousands of professionals today</p>
            </div>

            <form id="register-form" onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="reg-name" className="block text-sm font-medium text-slate-300 mb-2">Full name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    id="reg-name" type="text" name="name" autoComplete="name"
                    value={form.name} onChange={handleChange} placeholder="John Doe"
                    className={`input-field w-full pl-10 pr-4 py-3 rounded-xl text-sm ${errors.name ? 'border-red-500/60' : ''}`}
                  />
                </div>
                {errors.name && <p className="mt-1.5 text-xs text-red-400">⚠ {errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="reg-email" className="block text-sm font-medium text-slate-300 mb-2">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    id="reg-email" type="email" name="email" autoComplete="email"
                    value={form.email} onChange={handleChange} placeholder="you@company.com"
                    className={`input-field w-full pl-10 pr-4 py-3 rounded-xl text-sm ${errors.email ? 'border-red-500/60' : ''}`}
                  />
                </div>
                {errors.email && <p className="mt-1.5 text-xs text-red-400">⚠ {errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="reg-password" className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    id="reg-password" type={showPwd ? 'text' : 'password'} name="password"
                    autoComplete="new-password" value={form.password} onChange={handleChange}
                    placeholder="Create a strong password"
                    className={`input-field w-full pl-10 pr-11 py-3 rounded-xl text-sm ${errors.password ? 'border-red-500/60' : ''}`}
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1.5 text-xs text-red-400">⚠ {errors.password}</p>}
                {/* Password strength */}
                {form.password && (
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {PASSWORD_RULES.map(({ label, test }) => (
                      <div key={label} className={`flex items-center gap-1 text-xs ${test(form.password) ? 'text-emerald-400' : 'text-slate-500'}`}>
                        <CheckCircle2 className="w-3 h-3" />{label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Confirm */}
              <div>
                <label htmlFor="reg-confirm" className="block text-sm font-medium text-slate-300 mb-2">Confirm password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    id="reg-confirm" type={showCfm ? 'text' : 'password'} name="confirm"
                    autoComplete="new-password" value={form.confirm} onChange={handleChange}
                    placeholder="Repeat your password"
                    className={`input-field w-full pl-10 pr-11 py-3 rounded-xl text-sm ${errors.confirm ? 'border-red-500/60' : ''}`}
                  />
                  <button type="button" onClick={() => setShowCfm(!showCfm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                    {showCfm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirm && <p className="mt-1.5 text-xs text-red-400">⚠ {errors.confirm}</p>}
              </div>

              <button
                id="register-submit-btn" type="submit" disabled={loading}
                className="btn-glow w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-purple-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-brand-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 mt-2"
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account...</>
                ) : (
                  <>Create Account <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
              <div className="relative flex justify-center">
                <span className="px-4 text-xs text-slate-500 bg-[#0f172ab3]">Already have an account?</span>
              </div>
            </div>
            <Link to="/login" className="block w-full text-center py-3 rounded-xl border border-brand-500/30 text-brand-400 hover:text-white hover:bg-brand-500/10 text-sm font-medium transition-all duration-200">
              Sign in instead →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
