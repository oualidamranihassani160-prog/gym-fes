import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RefreshCw, RotateCcw } from 'lucide-react';
import { restoreMember, fetchMembers } from '../../store/slices/memberSlice';
import { memberAPI } from '../../services/api';
import ConfirmDialog from '../Common/ConfirmDialog';
import StatusBadge from '../Common/StatusBadge';

const ArchivedMembers = () => {
  const dispatch = useDispatch();
  const [archivedMembers, setArchivedMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(null);

  const fetchArchivedMembers = async () => {
    setLoading(true);
    try {
      const response = await memberAPI.getAll({ archived: true });
      setArchivedMembers(response.data);
    } catch (error) {
      console.error('Error fetching archived members:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchivedMembers();
  }, []);

  const handleRestore = async (member) => {
    await dispatch(restoreMember(member.id));
    await fetchArchivedMembers();
    await dispatch(fetchMembers());
    setShowRestoreConfirm(null);
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Loading archived members...</div>;
  }

  if (archivedMembers.length === 0) {
    return <div className="text-center py-8 text-gray-400">No archived members found</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-text">Archived Members</h2>
        <button onClick={fetchArchivedMembers} className="btn-secondary flex items-center gap-2">
          <RefreshCw className="w-5 h-5" />
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="table-header">ID</th>
              <th className="table-header">CIN</th>
              <th className="table-header">Full Name</th>
              <th className="table-header">Phone Number</th>
              <th className="table-header">Deleted At</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {archivedMembers.map((member) => (
              <tr key={member.id} className="hover:bg-gray-800 transition-colors">
                <td className="table-cell">#{member.id}</td>
                <td className="table-cell font-mono text-sm">{member.cin}</td>
                <td className="table-cell font-medium">{member.full_name}</td>
                <td className="table-cell">{member.phone_number}</td>
                <td className="table-cell">{new Date(member.deleted_at).toLocaleDateString()}</td>
                <td className="table-cell">
                  <button
                    onClick={() => setShowRestoreConfirm(member)}
                    className="btn-primary flex items-center gap-2 px-3 py-1 text-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Restore
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={!!showRestoreConfirm}
        onClose={() => setShowRestoreConfirm(null)}
        onConfirm={() => handleRestore(showRestoreConfirm)}
        title="Restore Member"
        message={`Are you sure you want to restore ${showRestoreConfirm?.full_name}?`}
        variant="info"
      />
    </div>
  );
};

export default ArchivedMembers;