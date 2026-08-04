import React from 'react';
import { useForm } from 'react-hook-form';
import { Lock } from 'lucide-react';

export const ChangePasswordForm = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const newPassword = watch('newPassword');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" errors={errors}>
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Current Password</label>
        <div className="relative">
          <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            {...register('currentPassword', { required: 'Current password is required' })}
            type="password"
            placeholder="••••••••"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-brand-500"
          />
        </div>
        {errors.currentPassword && <p className="text-xs text-rose-400 mt-1">{errors.currentPassword.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">New Password</label>
        <div className="relative">
          <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            {...register('newPassword', {
              required: 'New password is required',
              minLength: { value: 6, message: 'Minimum 6 characters' },
            })}
            type="password"
            placeholder="••••••••"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-brand-500"
          />
        </div>
        {errors.newPassword && <p className="text-xs text-rose-400 mt-1">{errors.newPassword.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Confirm New Password</label>
        <div className="relative">
          <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            {...register('confirmPassword', {
              required: 'Please confirm your new password',
              validate: (value) => value === newPassword || 'Passwords do not match',
            })}
            type="password"
            placeholder="••••••••"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-brand-500"
          />
        </div>
        {errors.confirmPassword && <p className="text-xs text-rose-400 mt-1">{errors.confirmPassword.message}</p>}
      </div>

      <div className="pt-4 flex justify-end space-x-3">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-brand-500/20 disabled:opacity-50"
        >
          {loading ? 'Updating Password...' : 'Update Password'}
        </button>
      </div>
    </form>
  );
};
