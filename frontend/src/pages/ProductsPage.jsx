import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { DataTable } from '../components/common/DataTable';
import { Modal } from '../components/common/Modal';
import { ProductForm } from '../components/forms/ProductForm';
import { StockMovementForm } from '../components/forms/StockMovementForm';
import { Badge } from '../components/common/Badge';
import { useInventory } from '../hooks/useInventory';
import { useAuth } from '../hooks/useAuth';
import {
  createProductApi,
  updateProductApi,
  deleteProductApi,
  adjustStockApi,
} from '../services/productService';
import { formatCurrency } from '../utils/formatters';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ArrowUpDown,
  Filter,
} from 'lucide-react';
import { toast } from 'react-toastify';

export const ProductsPage = () => {
  const {
    products,
    categories,
    suppliers,
    pagination,
    loading,
    fetchProducts,
    fetchCategories,
    fetchSuppliers,
  } = useInventory();

  const { hasRole } = useAuth();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockProduct, setStockProduct] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts({ search, category: categoryFilter });
    fetchCategories();
    fetchSuppliers();
  }, [
    fetchProducts,
    fetchCategories,
    fetchSuppliers,
    search,
    categoryFilter,
  ]);

  const handleCreateOrUpdate = async (formData) => {
    setSubmitting(true);

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === 'image' && formData.image[0]) {
          data.append('image', formData.image[0]);
        } else if (
          formData[key] !== undefined &&
          formData[key] !== null
        ) {
          data.append(key, formData[key]);
        }
      });

      if (selectedProduct) {
        await updateProductApi(selectedProduct._id, data);
        toast.success('Product updated successfully');
      } else {
        await createProductApi(data);
        toast.success('Product created successfully');
      }

      setIsCreateModalOpen(false);
      setSelectedProduct(null);
      fetchProducts({ search, category: categoryFilter });
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await deleteProductApi(id);
      toast.success('Product deleted');
      fetchProducts({ search, category: categoryFilter });
    } catch (err) {
      toast.error(err.message || 'Failed to delete product');
    }
  };

  const handleStockAdjust = async (stockData) => {
    setSubmitting(true);

    try {
      await adjustStockApi(stockData);
      toast.success('Stock adjusted successfully');
      setStockProduct(null);
      fetchProducts({ search, category: categoryFilter });
    } catch (err) {
      toast.error(err.message || 'Stock adjustment failed');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      header: 'Product',
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center font-bold text-xs text-slate-500 dark:text-slate-400">
            {row.imageUrl ? (
              <img
                src={row.imageUrl}
                alt={row.name}
                className="w-full h-full object-cover"
              />
            ) : (
              row.sku.substring(0, 3)
            )}
          </div>

          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              {row.name}
            </p>

            <p className="text-xs text-brand-400 font-mono">
              SKU: {row.sku}
            </p>
          </div>
        </div>
      ),
    },

    {
      header: 'Category',
      cell: (row) => (
        <Badge variant="info">
          {row.category?.name || 'Unassigned'}
        </Badge>
      ),
    },

    {
      header: 'Price',
      cell: (row) => (
        <div>
          <p className="font-semibold text-slate-900 dark:text-slate-200">
            {formatCurrency(row.price)}
          </p>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Cost: {formatCurrency(row.costPrice)}
          </p>
        </div>
      ),
    },

    {
      header: 'Stock',
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <span className="font-bold text-slate-900 dark:text-slate-100">
            {row.quantity}
          </span>

          <Badge
            variant={
              row.quantity === 0
                ? 'danger'
                : row.quantity <= row.minStockThreshold
                ? 'warning'
                : 'success'
            }
          >
            {row.quantity === 0
              ? 'Out'
              : row.quantity <= row.minStockThreshold
              ? 'Low'
              : 'OK'}
          </Badge>
        </div>
      ),
    },

    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setStockProduct(row)}
            title="Adjust Stock"
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-brand-500/20 text-brand-500 dark:text-brand-400 hover:text-brand-600 dark:hover:text-brand-300 transition-colors"
          >
            <ArrowUpDown className="w-4 h-4" />
          </button>

          {hasRole(['admin', 'manager']) && (
            <button
              onClick={() => {
                setSelectedProduct(row);
                setIsCreateModalOpen(true);
              }}
              title="Edit Product"
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}

          {hasRole('admin') && (
            <button
              onClick={() => handleDelete(row._id)}
              title="Delete Product"
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
    <MainLayout title="Product Catalog">
      <div className="space-y-6">
        {/* Controls Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl">
          <div className="flex items-center space-x-3 w-full sm:w-auto flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />

              <input
                type="text"
                placeholder="Search products by name or SKU..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm placeholder:text-slate-400 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300 text-sm focus:outline-none focus:border-brand-500"
              >
                <option value="">All Categories</option>

                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {hasRole(['admin', 'manager']) && (
            <button
              onClick={() => {
                setSelectedProduct(null);
                setIsCreateModalOpen(true);
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-all duration-150 flex items-center justify-center space-x-2 shadow-lg shadow-brand-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          )}
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={products}
          loading={loading}
          emptyMessage="No products match search criteria"
        />

        {/* Modals */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => {
            setIsCreateModalOpen(false);
            setSelectedProduct(null);
          }}
          title={selectedProduct ? 'Edit Product Details' : 'Add New Product'}
        >
          <ProductForm
            initialValues={selectedProduct}
            categories={categories}
            suppliers={suppliers}
            onSubmit={handleCreateOrUpdate}
            loading={submitting}
          />
        </Modal>

        <Modal
          isOpen={!!stockProduct}
          onClose={() => setStockProduct(null)}
          title="Adjust Stock Quantity"
        >
          <StockMovementForm
            product={stockProduct}
            onSubmit={handleStockAdjust}
            loading={submitting}
          />
        </Modal>
      </div>
    </MainLayout>
  );
};