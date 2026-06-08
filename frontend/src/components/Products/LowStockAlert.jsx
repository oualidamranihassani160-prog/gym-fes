import { AlertTriangle } from 'lucide-react';
import { useSelector } from 'react-redux';

const LowStockAlert = () => {
  const { list: products } = useSelector((state) => state.products);
  const lowStockProducts = products.filter(p => p.quantity > 0 && p.quantity <= 5);
  const outOfStockProducts = products.filter(p => p.quantity === 0);

  if (lowStockProducts.length === 0 && outOfStockProducts.length === 0) {
    return null;
  }

  return (
    <div className="bg-warning bg-opacity-10 border border-warning rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-5 h-5 text-warning" />
        <h3 className="text-warning font-medium">Stock Alert</h3>
      </div>
      
      {outOfStockProducts.length > 0 && (
        <div className="mb-3">
          <p className="text-sm text-gray-300 mb-2">Out of Stock:</p>
          <div className="flex flex-wrap gap-2">
            {outOfStockProducts.map(product => (
              <span key={product.id} className="badge badge-danger">
                {product.name}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {lowStockProducts.length > 0 && (
        <div>
          <p className="text-sm text-gray-300 mb-2">Low Stock (≤5 units):</p>
          <div className="flex flex-wrap gap-2">
            {lowStockProducts.map(product => (
              <span key={product.id} className="badge badge-warning">
                {product.name} ({product.quantity} left)
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LowStockAlert;