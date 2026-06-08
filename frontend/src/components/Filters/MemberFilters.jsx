import { useDispatch, useSelector } from 'react-redux';
import { Search, Filter } from 'lucide-react';
import { setFilters } from '../../store/slices/memberSlice';
import { MEMBERSHIP_STATUSES } from '../../utils/constants';

const MemberFilters = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.members);
  const { list: memberships } = useSelector((state) => state.memberships);

  const handleSearch = (e) => {
    dispatch(setFilters({ search: e.target.value }));
  };

  const handleStatusChange = (e) => {
    dispatch(setFilters({ status: e.target.value }));
  };

  const handleMembershipChange = (e) => {
    dispatch(setFilters({ membershipId: e.target.value }));
  };

  return (
    <div className="bg-surface rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-primary" />
        <h3 className="text-text font-medium">Filters</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by CIN or Name..."
              value={filters.search}
              onChange={handleSearch}
              className="input-field pl-10"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Status</label>
          <select
            value={filters.status}
            onChange={handleStatusChange}
            className="input-field"
          >
            {MEMBERSHIP_STATUSES.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Membership Type</label>
          <select
            value={filters.membershipId}
            onChange={handleMembershipChange}
            className="input-field"
          >
            <option value="">All Memberships</option>
            {memberships.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default MemberFilters;