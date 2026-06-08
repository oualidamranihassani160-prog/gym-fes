import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembers, setFilters, setSorting } from '../store/slices/memberSlice';
import { fetchMemberships } from '../store/slices/membershipSlice';
import MemberTable from '../components/Members/MemberTable';
import MemberModal from '../components/Members/MemberModal';
import MemberFilters from '../components/Filters/MemberFilters';
import { Plus, RefreshCw } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const Members = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const dispatch = useDispatch();
  const { loading, filters, sorting } = useSelector((state) => state.members);
  const { list: memberships } = useSelector((state) => state.memberships);

  useEffect(() => {
    dispatch(fetchMemberships());
  }, [dispatch]);

  useEffect(() => {
    // Fetch members when component mounts and whenever filters or sorting change
    dispatch(fetchMembers({ ...filters, ...sorting }));
  }, [dispatch, filters, sorting]);

  const handleRefresh = () => {
    dispatch(fetchMembers({ ...filters, ...sorting }));
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-text">Members</h1>
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
            Add Member
          </button>
        </div>
      </div>

      <MemberFilters />
      
      <div className="card mt-6">
        <MemberTable onEdit={handleEdit} />
      </div>

      <MemberModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        member={editingMember}
        memberships={memberships}
      />
    </div>
  );
};

export default Members;