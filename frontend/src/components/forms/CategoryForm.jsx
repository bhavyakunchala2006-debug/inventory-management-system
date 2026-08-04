import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const CategoryForm = ({ initialValues, onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues || { name: '', description: '' },
  });

  useEffect(() => {
    if (initialValues) reset(initialValues);
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" errors={errors}>
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Category Name</label>
        <input
          {...register('name', { required: 'Category name is required' })}
          type="text"
          placeholder="e.g. Electronics"
          className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-brand-500 text-sm"
        />
        {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Description</label>
        <textarea
          {...register('description')}
          rows="3"
          placeholder="Category details..."
          className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-brand-500 text-sm"
        />
      </div>

      <div className="pt-4 flex justify-end space-x-3">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-brand-500/20 disabled:opacity-50"
        >
          {loading ? 'Saving...' : initialValues ? 'Update Category' : 'Create Category'}
        </button>
      </div>
    </form>
  );
};
