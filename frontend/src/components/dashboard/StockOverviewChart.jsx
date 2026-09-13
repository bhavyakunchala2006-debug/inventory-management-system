import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const StockOverviewChart = ({ categoryStats = [] }) => {
  const labels = categoryStats.map((c) => c.categoryName);
  const dataValues = categoryStats.map((c) => c.count);

  const data = {
    labels,
    datasets: [
      {
        label: 'Product Count',
        data: dataValues,
        backgroundColor: 'rgba(12, 145, 235, 0.65)',
        borderColor: '#0c91eb',
        borderWidth: 1.5,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#0f172a',
        borderColor: '#1e293b',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#64748b' },
      },
      y: {
        grid: { color: 'rgba(15, 23, 42, 0.08)' },
        ticks: { color: '#64748b' },
      },
    },
  };

  return (
    <div className="p-6 rounded-2xl glass-panel h-80 flex flex-col justify-between">
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4">
        Stock Breakdown by Category
      </h3>

      <div className="flex-1 relative min-h-0">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};