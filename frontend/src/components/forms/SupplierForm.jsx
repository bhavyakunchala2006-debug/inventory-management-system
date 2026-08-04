import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const SupplierForm = ({ initialValues, onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues || {
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: { street: '', city: '', state: '', country: '' },
    },
  });

  useEffect(() => {
    if (initialValues) reset(initialValues);
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" errors={errors}>
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Company Name</label>
        <input
          {...register('name', { required: 'Company name is required' })}
          type="text"
          placeholder="TechSupply Global Inc."
          className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-brand-500 text-sm"
        />
        {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Contact Person</label>
          <input
            {...register('contactPerson')}
            type="text"
            placeholder="John Doe"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-brand-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Email</label>
          <input
            {...register('email')}
            type="email"
            placeholder="contact@supplier.com"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-brand-500 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Phone</label>
          <input
            {...register('phone')}
            type="text"
            placeholder="+1-555-0192"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-brand-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">City / Country</label>
          <input
            {...register('address.city')}
            type="text"
            placeholder="New York, USA"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-brand-500 text-sm"
          />
        </div>
      </div>

      <div className="pt-4 flex justify-end space-x-3">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-brand-500/20 disabled:opacity-50"
        >
          {loading ? 'Saving...' : initialValues ? 'Update Supplier' : 'Create Supplier'}
        </button>
      </div>
    </form>
  );
};
