import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';
import ProductTable from '../components/Products/ProductTable';
import ProductModal from '../components/Products/ProductModal';
import ProductFilters from '../components/Filters/ProductFilters';
import { Plus, RefreshCw } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const dispatch = useDispatch();
  const { loading, filters } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  const handleRefresh = () => {
    dispatch(fetchProducts(filters));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-text">Products</h1>
        <div className="flex gap-3">
          <div className="flex items-center">
            <ThemeToggle />
          </div>
          <button onClick={handleRefresh} className="btn-secondary flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Refresh
          </button>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>
      </div>

      <ProductFilters />
      
      <div className="card mt-6">
        <ProductTable onEdit={handleEdit} />
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={editingProduct}
      />
    </div>
  );
};

export default Products;