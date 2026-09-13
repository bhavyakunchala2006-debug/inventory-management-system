import React, { useState, useContext } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Modal } from './Modal';
import { ChangePasswordForm } from '../forms/ChangePasswordForm';
import { LogOut, User, KeyRound, Bell, Sun, Moon } from 'lucide-react';
import { toast } from 'react-toastify';
import { ThemeContext } from '../../context/ThemeContext';

export const Header = ({ title }) => {
  const { user, logout, changePassword } = useAuth();
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChangePassword = async (data) => {
    setSubmitting(true);
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success('Password changed successfully!');
      setIsPasswordModalOpen(false);
    } catch (err) {
      toast.error(err.message || 'Failed to change password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          {title}
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <button
          type="button"
          aria-label="View notifications"
          className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full"></span>
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          className="p-2 text-slate-400 hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          {isDark ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        <div className="flex items-center space-x-3 pl-4 border-l border-slate-200 dark:border-slate-800">
          <div className="w-9 h-9 rounded-full bg-brand-600/30 text-brand-400 flex items-center justify-center font-semibold text-sm border border-brand-500/30">
            {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
          </div>

          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-200 leading-tight">
              {user?.name || 'User'}
            </p>

            <p className="text-xs text-slate-400 capitalize">
              {user?.role || 'Staff'}
            </p>
          </div>

          <button
            onClick={() => setIsPasswordModalOpen(true)}
            title="Change Password"
            className="p-2 text-slate-400 hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <KeyRound className="w-5 h-5" />
          </button>

          <button
            onClick={logout}
            title="Logout"
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        title="Change Security Password"
      >
        <ChangePasswordForm
          onSubmit={handleChangePassword}
          loading={submitting}
        />
      </Modal>
    </header>
  );
};