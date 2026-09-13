import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Badge } from '../common/Badge';

export const LowStockAlert = ({ products = [] }) => {
  return (
    <div className="p-6 rounded-2xl glass-panel border-amber-500/20">
      <div className="flex items-center space-x-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-amber-400" />
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          Low Stock Warnings
        </h3>
      </div>

      {products.length === 0 ? (
        <p className="text-xs text-slate-400">
          All products are sufficiently stocked!
        </p>
      ) : (
        <div className="space-y-3">
          {products.map((p) => (
            <div
              key={p._id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800"
            >
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {p.name}
                </p>

                <p className="text-xs text-slate-400">
                  Category: {p.category?.name || 'Unassigned'}
                </p>
              </div>

              <div className="text-right">
                <Badge variant={p.quantity === 0 ? 'danger' : 'warning'}>
                  {p.quantity === 0 ? 'Out of Stock' : `${p.quantity} left`}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};