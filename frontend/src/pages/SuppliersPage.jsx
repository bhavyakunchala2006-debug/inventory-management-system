import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { DataTable } from '../components/common/DataTable';
import { Modal } from '../components/common/Modal';
import { SupplierForm } from '../components/forms/SupplierForm';
import { useInventory } from '../hooks/useInventory';
import { useAuth } from '../hooks/useAuth';
import {
  createSupplierApi,
  updateSupplierApi,
  deleteSupplierApi,
} from '../services/supplierService';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

export const SuppliersPage = () => {
  const { suppliers, loading, fetchSuppliers } = useInventory();
  const { hasRole } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  const handleSubmit = async (data) => {
    setSubmitting(true);

    try {
      if (selectedSupplier) {
        await updateSupplierApi(selectedSupplier._id, data);
        toast.success('Supplier updated');
      } else {
        await createSupplierApi(data);
        toast.success('Supplier created');
      }

      setIsModalOpen(false);
      setSelectedSupplier(null);
      fetchSuppliers();
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete supplier?')) return;

    try {
      await deleteSupplierApi(id);
      toast.success('Supplier deleted');
      fetchSuppliers();
    } catch (err) {
      toast.error(err.message || 'Failed to delete supplier');
    }
  };

  const columns = [
    {
      header: 'Company',
      cell: (row) => (
        <span className="font-semibold text-slate-900 dark:text-slate-100">
          {row.name}
        </span>
      ),
    },

    {
      header: 'Contact Person',
      cell: (row) => (
        <span className="text-slate-700 dark:text-slate-300 text-xs">
          {row.contactPerson || 'N/A'}
        </span>
      ),
    },

    {
      header: 'Email / Phone',
      cell: (row) => (
        <div className="text-xs">
          <p className="text-slate-800 dark:text-slate-200">
            {row.email || 'No email'}
          </p>

          <p className="text-slate-500 dark:text-slate-400">
            {row.phone || 'No phone'}
          </p>
        </div>
      ),
    },

    {
      header: 'Location',
      cell: (row) => (
        <span className="text-slate-600 dark:text-slate-400 text-xs">
          {row.address?.city
            ? `${row.address.city}, ${row.address.country || ''}`
            : 'N/A'}
        </span>
      ),
    },

    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex items-center space-x-2">
          {hasRole(['admin', 'manager']) && (
            <button
              onClick={() => {
                setSelectedSupplier(row);
                setIsModalOpen(true);
              }}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}

          {hasRole('admin') && (
            <button
              onClick={() => handleDelete(row._id)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-500/20 text-rose-500 dark:text-rose-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <MainLayout title="Supplier Directory">
      <div className="space-y-6">
        <div className="flex justify-between items-center glass-panel p-4 rounded-2xl">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-300">
            Registered Suppliers
          </h2>

          {hasRole(['admin', 'manager']) && (
            <button
              onClick={() => {
                setSelectedSupplier(null);
                setIsModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Supplier</span>
            </button>
          )}
        </div>

        <DataTable
          columns={columns}
          data={suppliers}
          loading={loading}
          emptyMessage="No suppliers found"
        />

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedSupplier(null);
          }}
          title={selectedSupplier ? 'Edit Supplier' : 'Create Supplier'}
        >
          <SupplierForm
            initialValues={selectedSupplier}
            onSubmit={handleSubmit}
            loading={submitting}
          />
        </Modal>
      </div>
    </MainLayout>
  );
};