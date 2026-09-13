import React from 'react';
import { formatDateTime } from '../../utils/formatters';
import { ArrowDownLeft, ArrowUpRight, RefreshCw } from 'lucide-react';
import { Badge } from '../common/Badge';

export const RecentActivity = ({ logs = [] }) => {
  const getTypeBadge = (type) => {
    switch (type) {
      case 'IN':
        return (
          <Badge variant="success">
            <ArrowDownLeft className="w-3 h-3 mr-1 inline" /> Stock In
          </Badge>
        );

      case 'OUT':
        return (
          <Badge variant="danger">
            <ArrowUpRight className="w-3 h-3 mr-1 inline" /> Stock Out
          </Badge>
        );

      default:
        return (
          <Badge variant="warning">
            <RefreshCw className="w-3 h-3 mr-1 inline" /> Adjustment
          </Badge>
        );
    }
  };

  return (
    <div className="p-6 rounded-2xl glass-panel">
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4">
        Recent Stock Movements
      </h3>

      {logs.length === 0 ? (
        <p className="text-xs text-slate-400">
          No activity logged yet.
        </p>
      ) : (
        <div className="space-y-4">
          {logs.map((log) => (
            <div
              key={log._id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center space-x-3">
                {getTypeBadge(log.type)}

                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {log.product?.name || 'Deleted Product'}
                  </p>

                  <p className="text-xs text-slate-400">
                    SKU: {log.product?.sku} &bull; {log.reason}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {log.type === 'IN' ? '+' : log.type === 'OUT' ? '-' : ''}
                  {log.quantityChange}
                </p>

                <p className="text-[11px] text-slate-500">
                  {formatDateTime(log.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};