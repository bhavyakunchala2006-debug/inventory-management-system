import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { StatCard } from '../components/common/StatCard';
import { StockOverviewChart } from '../components/dashboard/StockOverviewChart';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { LowStockAlert } from '../components/dashboard/LowStockAlert';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { getDashboardSummaryApi } from '../services/dashboardService';
import { formatCurrency } from '../utils/formatters';
import { Package, Layers, Truck, AlertTriangle, IndianRupee } from 'lucide-react';

export const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getDashboardSummaryApi();
        setData(res);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <MainLayout title="Dashboard">
        <LoadingSpinner size="large" text="Loading analytical dashboard metrics..." />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout title="Dashboard">
        <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm">
          Failed to load dashboard metrics: {error}
        </div>
      </MainLayout>
    );
  }

  const metrics = data?.metrics || {};

  return (
    <MainLayout title="Dashboard Overview">
      <div className="space-y-6">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Total Products"
            value={metrics.totalProducts || 0}
            icon={Package}
            color="brand"
            trend={`${metrics.totalStockQuantity || 0} Total Units`}
          />
          <StatCard
            title="Inventory Value"
            value={formatCurrency(metrics.totalInventoryValue || 0)}
            icon={IndianRupee}
            color="emerald"
            trend="Total Cost Value"
          />
          <StatCard
            title="Low Stock Items"
            value={metrics.lowStockCount || 0}
            icon={AlertTriangle}
            color="amber"
            trend={`${metrics.outOfStockCount || 0} Out of Stock`}
          />
          <StatCard
            title="Suppliers & Categories"
            value={`${metrics.totalSuppliers || 0} / ${metrics.totalCategories || 0}`}
            icon={Truck}
            color="purple"
            trend="Active Network"
          />
        </div>

        {/* Charts & Warning Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StockOverviewChart categoryStats={data?.categoryStats || []} />
          </div>
          <div>
            <LowStockAlert products={data?.lowStockProducts || []} />
          </div>
        </div>

        {/* Activity Table */}
        <RecentActivity logs={data?.recentLogs || []} />
      </div>
    </MainLayout>
  );
};
