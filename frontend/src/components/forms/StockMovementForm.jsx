import React from 'react';
import { useForm } from 'react-hook-form';

export const StockMovementForm = ({ product, onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productId: product?._id || '',
      type: 'IN',
      quantity: 1,
      reason: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" errors={errors}>
      <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700">
        <p className="text-xs text-slate-400">Target Product</p>
        <p className="text-sm font-semibold text-slate-100">{product?.name}</p>
        <p className="text-xs text-brand-400 font-mono mt-0.5">SKU: {product?.sku} &bull; Current Stock: {product?.quantity}</p>
      </div>

      <input type="hidden" {...register('productId')} value={product?._id} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Movement Type</label>
          <select
            {...register('type', { required: true })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-brand-500 text-sm"
          >
            <option value="IN">Stock In (Receive)</option>
            <option value="OUT">Stock Out (Dispatch)</option>
            <option value="ADJUSTMENT">Manual Adjustment</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Quantity</label>
          <input
            {...register('quantity', { required: 'Quantity is required', min: { value: 1, message: 'Minimum 1' } })}
            type="number"
            min="1"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-brand-500 text-sm"
          />
          {errors.quantity && <p className="text-xs text-rose-400 mt-1">{errors.quantity.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Reason / Reference Notes</label>
        <textarea
          {...register('reason')}
          rows="2"
          placeholder="Purchase Order #, Return, Restock, Damage, etc."
          className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-brand-500 text-sm"
        />
      </div>

      <div className="pt-4 flex justify-end space-x-3">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-brand-500/20 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Confirm Stock Movement'}
        </button>
      </div>
    </form>
  );
};
