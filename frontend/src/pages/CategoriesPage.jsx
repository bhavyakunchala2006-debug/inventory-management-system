import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { DataTable } from '../components/common/DataTable';
import { Modal } from '../components/common/Modal';
import { CategoryForm } from '../components/forms/CategoryForm';
import { useInventory } from '../hooks/useInventory';
import { useAuth } from '../hooks/useAuth';
import { createCategoryApi, updateCategoryApi, deleteCategoryApi } from '../services/categoryService';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

export const CategoriesPage = () => {
  const { categories, loading, fetchCategories } = useInventory();
  const { hasRole } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (selectedCategory) {
        await updateCategoryApi(selectedCategory._id, data);
        toast.success('Category updated');
      } else {
        await createCategoryApi(data);
        toast.success('Category created');
      }
      setIsModalOpen(false);
      setSelectedCategory(null);
      fetchCategories();
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete category?')) return;
    try {
      await deleteCategoryApi(id);
      toast.success('Category deleted');
      fetchCategories();
    } catch (err) {
      toast.error(err.message || 'Failed to delete category');
    }
  };

  const columns = [
    {
      header: 'Category Name',
      cell: (row) => (
        <span className="font-semibold text-slate-900 dark:text-slate-100">
          {row.name}
        </span>
      ),
    },
    {
      header: 'Description',
      cell: (row) => (
        <span className="text-slate-400 text-xs">
          {row.description || 'No description'}
        </span>
      ),
    },
    {
      header: 'Slug',
      cell: (row) => (
        <span className="text-brand-400 font-mono text-xs">
          {row.slug}
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
                setSelectedCategory(row);
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
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-500/20 text-rose-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <MainLayout title="Inventory Categories">
      <div className="space-y-6">
        <div className="flex justify-between items-center glass-panel p-4 rounded-2xl">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Category Definitions
          </h2>

          {hasRole(['admin', 'manager']) && (
            <button
              onClick={() => {
                setSelectedCategory(null);
                setIsModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </button>
          )}
        </div>

        <DataTable
          columns={columns}
          data={categories}
          loading={loading}
          emptyMessage="No categories created yet"
        />

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCategory(null);
          }}
          title={selectedCategory ? 'Edit Category' : 'Create Category'}
        >
          <CategoryForm
            initialValues={selectedCategory}
            onSubmit={handleSubmit}
            loading={submitting}
          />
        </Modal>
      </div>
    </MainLayout>
  );
};