import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { Shield, ArrowRight, Zap, Lock, Globe, Users, CheckCircle2 } from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-dark-900 relative overflow-x-hidden">
      <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
      <Navbar />

      {/* HERO */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16">
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-slate-300">Production-Ready Authentication System</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 animate-slide-up">
          Enterprise Auth<br /><span className="gradient-text">Reimagined</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10 animate-slide-up">
          A fully functional MNC-style authentication platform built with Express.js, MongoDB Atlas, React, and Tailwind CSS — featuring real JWT security, MVC architecture, and stunning UI.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
          <Link
            to={isAuthenticated ? '/dashboard' : '/register'}
            className="flex items-center gap-2 bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white font-semibold px-8 py-4 rounded-2xl shadow-2xl shadow-brand-500/30 hover:shadow-brand-500/50 transition-all duration-300 hover:-translate-y-1"
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
            <ArrowRight className="w-5 h-5" />
          </Link>
          {!isAuthenticated && (
            <Link
              to="/login"
              className="flex items-center gap-2 glass hover:border-brand-500/30 text-slate-300 hover:text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300"
            >
              <Shield className="w-5 h-5" /> Sign In
            </Link>
          )}
        </div>

        {/* Tech badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-12 animate-fade-in">
          {['Express.js', 'MongoDB Atlas', 'React.js', 'Tailwind CSS', 'JWT Auth', 'MVC Pattern'].map((t) => (
            <span key={t} className="text-xs font-medium glass rounded-full px-3 py-1.5 text-slate-400">
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-400 uppercase tracking-widest mb-3">What's Inside</p>
            <h2 className="text-4xl font-black text-white mb-4">Built for the real world</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Every feature has been carefully engineered following MNC best practices and production standards.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Lock,   title: 'JWT Dual-Token',    desc: 'Short-lived access tokens + HttpOnly refresh cookie. Secure, stateless, and production-ready.',    color: 'from-brand-500 to-purple-600' },
              { icon: Shield, title: 'bcrypt Hashing',    desc: 'Password security with salt factor 10. Industry-standard one-way encryption for all credentials.', color: 'from-purple-500 to-pink-600'   },
              { icon: Globe,  title: 'MVC Architecture',  desc: 'Clean separation: Models, Controllers, Routes, Middleware. Scalable and maintainable codebase.',    color: 'from-cyan-500 to-blue-600'    },
              { icon: Zap,    title: 'Auto Token Refresh', desc: 'Axios interceptors silently refresh expired tokens with a queued retry mechanism. Zero UX friction.',color: 'from-amber-500 to-orange-600'  },
              { icon: Users,  title: 'Role-Based Access',  desc: 'Extensible RBAC with user/admin roles. Middleware-protected routes for fine-grained authorization.', color: 'from-emerald-500 to-teal-600'  },
              { icon: CheckCircle2, title: 'Input Validation', desc: 'Express-validator on backend + React frontend validation. Data integrity from source to DB.',  color: 'from-rose-500 to-red-600'     },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="glass-card rounded-3xl p-6 hover:border-brand-500/25 transition-all duration-300 group hover:-translate-y-1">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center glass-card rounded-3xl p-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-brand-500/30 animate-float">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-black text-white mb-4">Ready to get started?</h2>
          <p className="text-slate-400 mb-8 text-lg">Create your account and explore the dashboard with all enterprise features.</p>
          <Link
            to={isAuthenticated ? '/dashboard' : '/register'}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white font-bold px-10 py-4 rounded-2xl shadow-2xl shadow-brand-500/30 hover:shadow-brand-500/50 transition-all duration-300 hover:-translate-y-1 text-lg"
          >
            {isAuthenticated ? 'Open Dashboard' : 'Create Free Account'}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 text-center">
        <p className="text-sm text-slate-600">
          Built with <span className="gradient-text font-semibold">Express.js · MongoDB · React · Tailwind CSS</span> · MVC Architecture
        </p>
      </footer>
    </div>
  );
};

export default Home;
