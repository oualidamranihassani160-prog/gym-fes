import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pencil, Trash2 } from 'lucide-react';
import { deleteProduct, fetchProducts } from '../../store/slices/productSlice';
import { getProductAvailabilityConfig } from '../../utils/statusUtils';
import ConfirmDialog from '../Common/ConfirmDialog';
import StatusBadge from '../Common/StatusBadge';
import ImageModal from '../Common/ImageModal';

const ProductTable = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { list: products, loading } = useSelector((state) => state.products);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [imageModal, setImageModal] = useState({ isOpen: false, src: '', alt: '' });

  const handleDelete = async (product) => {
    await dispatch(deleteProduct(product.id));
    await dispatch(fetchProducts());
    setShowDeleteConfirm(null);
  };

  const getAvailabilityStatus = (product) => {
    if (product.quantity > 5) return 'available';
    if (product.quantity > 0) return 'low_stock';
    return 'out_of_stock';
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Loading products...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-8 text-gray-400">No products found</div>;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="table-header">ID</th>
              <th className="table-header">Image</th>
              <th className="table-header">Name</th>
              <th className="table-header">Quantity</th>
              <th className="table-header">Price (DH)</th>
              <th className="table-header">Availability</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {products.map((product) => {
              const availability = getAvailabilityStatus(product);
              const config = getProductAvailabilityConfig(availability);
              
              return (
                <tr key={product.id} className="hover:bg-gray-800 transition-colors">
                  <td className="table-cell">#{product.id}</td>
                  <td className="table-cell">
                    {product.image_path ? (
                      <img 
                        src={`http://localhost:8000/storage/${product.image_path}`} 
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover cursor-pointer"
                        onClick={() => setImageModal({ isOpen: true, src: `http://localhost:8000/storage/${product.image_path}`, alt: product.name })}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center">
                        <span className="text-xs">No img</span>
                      </div>
                    )}
                  </td>
                  <td className="table-cell font-medium">{product.name}</td>
                  <td className="table-cell">
                    <span className={product.quantity <= 5 ? 'text-warning' : 'text-text'}>
                      {product.quantity}
                    </span>
                  </td>
                  <td className="table-cell font-medium">{product.price} DH</td>
                  <td className="table-cell">
                    <StatusBadge status={availability} type="product" />
                  </td>
                  <td className="table-cell">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => onEdit(product)}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-5 h-5 text-yellow-400" />
                      </button>
                      <button 
                        onClick={() => setShowDeleteConfirm(product)}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        onConfirm={() => handleDelete(showDeleteConfirm)}
        title="Delete Product"
        message={`Are you sure you want to delete ${showDeleteConfirm?.name}? This action cannot be undone.`}
        variant="danger"
      />
      <ImageModal
        isOpen={imageModal.isOpen}
        src={imageModal.src}
        alt={imageModal.alt}
        onClose={() => setImageModal({ isOpen: false, src: '', alt: '' })}
      />
    </>
  );
};

export default ProductTable;
