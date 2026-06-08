import { useDispatch, useSelector } from 'react-redux';
import { Search, ArrowUpDown } from 'lucide-react';
import { setProductFilters } from '../../store/slices/productSlice';
import { PRODUCT_SORT_OPTIONS, SORT_DIRECTIONS } from '../../utils/constants';

const ProductFilters = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);

  const handleSearch = (e) => {
    dispatch(setProductFilters({ search: e.target.value }));
  };

  const handleSortBy = (e) => {
    dispatch(setProductFilters({ sortBy: e.target.value }));
  };

  const handleSortDir = (e) => {
    dispatch(setProductFilters({ sortDir: e.target.value }));
  };

  return (
    <div className="bg-surface rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <ArrowUpDown className="w-5 h-5 text-primary" />
        <h3 className="text-text font-medium">Filters & Sorting</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Search Products</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={filters.search}
              onChange={handleSearch}
              className="input-field pl-10"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={handleSortBy}
            className="input-field"
          >
            {PRODUCT_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Sort Direction</label>
          <select
            value={filters.sortDir}
            onChange={handleSortDir}
            className="input-field"
          >
            {SORT_DIRECTIONS.map((dir) => (
              <option key={dir.value} value={dir.value}>
                {dir.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;