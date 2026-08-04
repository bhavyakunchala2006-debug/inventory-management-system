import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { User, Mail, Lock, Shield } from 'lucide-react';

export const RegisterPage = () => {
  const { register: registerAuth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '', email: '', password: '', role: 'staff' },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerAuth(data);
      toast.success('Registration successful! Welcome aboard.');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Join Inventra to streamline team operations">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" errors={errors}>
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Full Name</label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              placeholder="Alex Johnson"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-brand-500"
            />
          </div>
          {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              {...register('email', { required: 'Email is required' })}
              type="email"
              placeholder="alex@company.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-brand-500"
            />
          </div>
          {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' },
              })}
              type="password"
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-brand-500"
            />
          </div>
          {errors.password && <p className="text-xs text-rose-400 mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Assigned Role</label>
          <div className="relative">
            <Shield className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <select
              {...register('role')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-brand-500"
            >
              <option value="staff">Staff (View / Stock Adjust)</option>
              <option value="manager">Manager (Product / Supplier CRUD)</option>
              <option value="admin">Admin (Full System Access)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-all duration-150 shadow-lg shadow-brand-500/30 disabled:opacity-50 mt-2"
        >
          {loading ? 'Creating Account...' : 'Register'}
        </button>

        <p className="text-center text-xs text-slate-400 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-400 hover:underline font-semibold">
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};
