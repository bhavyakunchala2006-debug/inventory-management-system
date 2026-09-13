import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const ProductForm = ({ initialValues, categories = [], suppliers = [], onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues || {
      sku: '',
      name: '',
      description: '',
      category: '',
      supplier: '',
      price: '',
      costPrice: '',
      quantity: 0,
      minStockThreshold: 10,
      unit: 'pcs',
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        ...initialValues,
        category: initialValues.category?._id || initialValues.category || '',
        supplier: initialValues.supplier?._id || initialValues.supplier || '',
      });
    }
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" errors={errors}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">SKU</label>
          <input
            {...register('sku', { required: 'SKU is required' })}
            type="text"
            placeholder="e.g. ELEC-001"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-brand-500 text-sm"
          />
          {errors.sku && <p className="text-xs text-rose-400 mt-1">{errors.sku.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Product Name</label>
          <input
            {...register('name', { required: 'Product name is required' })}
            type="text"
            placeholder="Logitech Wireless Mouse"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-brand-500 text-sm"
          />
          {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Description</label>
        <textarea
          {...register('description')}
          rows="2"
          placeholder="Product specifications or features..."
          className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-brand-500 text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Category</label>
          <select
            {...register('category', { required: 'Select a category' })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-brand-500 text-sm"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-xs text-rose-400 mt-1">{errors.category.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Supplier</label>
          <select
            {...register('supplier', { required: 'Select a supplier' })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-brand-500 text-sm"
          >
            <option value="">Select Supplier</option>
            {suppliers.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.supplier && <p className="text-xs text-rose-400 mt-1">{errors.supplier.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Selling Price (₹)</label>
          <input
            {...register('price', { required: 'Price is required', min: 0 })}
            type="number"
            step="0.01"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-brand-500 text-sm"
          />
          {errors.price && <p className="text-xs text-rose-400 mt-1">{errors.price.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Cost Price (₹)</label>
          <input
            {...register('costPrice', { required: 'Cost price is required', min: 0 })}
            type="number"
            step="0.01"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-brand-500 text-sm"
          />
          {errors.costPrice && <p className="text-xs text-rose-400 mt-1">{errors.costPrice.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Stock Quantity</label>
          <input
            {...register('quantity', { required: 'Quantity is required', min: 0 })}
            type="number"
            disabled={!!initialValues}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-brand-500 text-sm disabled:opacity-50"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Product Image</label>
        <input
          {...register('image')}
          type="file"
          accept="image/*"
          className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brand-500/20 file:text-brand-400 hover:file:bg-brand-500/30"
        />
      </div>

      <div className="pt-4 flex justify-end space-x-3">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-brand-500/20 disabled:opacity-50"
        >
          {loading ? 'Saving...' : initialValues ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
};
