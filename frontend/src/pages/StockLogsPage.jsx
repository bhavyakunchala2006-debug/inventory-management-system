import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { DataTable } from '../components/common/DataTable';
import { Badge } from '../components/common/Badge';
import { getDashboardSummaryApi } from '../services/dashboardService';
import { formatDateTime } from '../utils/formatters';

export const StockLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await getDashboardSummaryApi();
        setLogs(res.recentLogs || []);
      } catch (err) {
        console.error('Failed to load logs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const columns = [
    {
      header: 'Product',
      cell: (row) => (
        <div>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            {row.product?.name || 'Deleted Product'}
          </p>

          <p className="text-xs text-brand-400 font-mono">
            SKU: {row.product?.sku}
          </p>
        </div>
      ),
    },

    {
      header: 'Type',
      cell: (row) => (
        <Badge
          variant={
            row.type === 'IN'
              ? 'success'
              : row.type === 'OUT'
              ? 'danger'
              : 'warning'
          }
        >
          {row.type}
        </Badge>
      ),
    },

    {
      header: 'Quantity Change',
      cell: (row) => (
        <span className="font-bold text-slate-900 dark:text-slate-100">
          {row.type === 'IN' ? '+' : row.type === 'OUT' ? '-' : ''}
          {row.quantityChange}
        </span>
      ),
    },

    {
      header: 'Stock Shift',
      cell: (row) => (
        <span className="text-xs text-slate-600 dark:text-slate-400">
          {row.previousQuantity} &rarr;{' '}
          <strong className="text-slate-800 dark:text-slate-200">
            {row.newQuantity}
          </strong>
        </span>
      ),
    },

    {
      header: 'Performed By',
      cell: (row) => (
        <span className="text-xs text-slate-700 dark:text-slate-300">
          {row.performedBy?.name || 'System'}
        </span>
      ),
    },

    {
      header: 'Timestamp',
      cell: (row) => (
        <span className="text-xs text-slate-600 dark:text-slate-400">
          {formatDateTime(row.createdAt)}
        </span>
      ),
    },
  ];

  return (
    <MainLayout title="Stock Movement Logs">
      <div className="space-y-6">
        <DataTable
          columns={columns}
          data={logs}
          loading={loading}
          emptyMessage="No transaction logs recorded"
        />
      </div>
    </MainLayout>
  );
};