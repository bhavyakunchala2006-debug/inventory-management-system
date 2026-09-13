import React from 'react';

export const StatCard = ({ title, value, icon: Icon, trend, color = 'brand' }) => {
  const colorMap = {
    brand: 'from-brand-500/20 to-brand-600/5 text-brand-400 border-brand-500/30',
    emerald: 'from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/30',
    amber: 'from-amber-500/20 to-amber-600/5 text-amber-400 border-amber-500/30',
    rose: 'from-rose-500/20 to-rose-600/5 text-rose-400 border-rose-500/30',
    purple: 'from-purple-500/20 to-purple-600/5 text-purple-400 border-purple-500/30',
  };

  const selectedColor = colorMap[color] || colorMap.brand;

  return (
    <div className={`p-6 rounded-2xl glass-panel bg-gradient-to-br ${selectedColor} border transition-all duration-200`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {title}
        </p>

        {Icon && (
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          {value}
        </h3>

        {trend && (
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};