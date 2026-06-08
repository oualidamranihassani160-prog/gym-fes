import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pencil, RefreshCw, Archive, Trash2 } from 'lucide-react';
import ImageModal from '../Common/ImageModal';
import { formatDate, getDaysLeft, getMemberStatus } from '../../utils/dateUtils';
import { getMemberStatusConfig } from '../../utils/statusUtils';
import { archiveMember, forceDeleteMember, fetchMembers } from '../../store/slices/memberSlice';
import ConfirmDialog from '../Common/ConfirmDialog';
import StatusBadge from '../Common/StatusBadge';

const MemberTable = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { list: members, loading, filters, sorting } = useSelector((state) => state.members);
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleArchive = async (member) => {
    await dispatch(archiveMember(member.id));
    await dispatch(fetchMembers({ ...filters, ...sorting }));
    setShowArchiveConfirm(null);
  };

  const handleForceDelete = async (member) => {
    await dispatch(forceDeleteMember(member.id));
    await dispatch(fetchMembers({ ...filters, ...sorting }));
    setShowDeleteConfirm(null);
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Loading members...</div>;
  }

  if (members.length === 0) {
    return <div className="text-center py-8 text-gray-400">No members found</div>;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="table-header">ID</th>
              <th className="table-header">Photo</th>
              <th className="table-header">CIN</th>
              <th className="table-header">Full Name</th>
              <th className="table-header">Phone Number</th>
              <th className="table-header">Membership</th>
              <th className="table-header">Start Date</th>
              <th className="table-header">End Date</th>
              <th className="table-header">Days Left</th>
              <th className="table-header">Status</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {members.map((member) => {
              const daysLeft = getDaysLeft(member.end_date);
              const status = getMemberStatus(member.end_date);
              const statusConfig = getMemberStatusConfig(status);
              const isArchived = !!member.deleted_at;
              
              return (
                <tr key={member.id} className="hover:bg-gray-800 transition-colors">
                  <td className="table-cell">#{member.id}</td>
                  <td className="table-cell">
                    {member.image_path ? (
                      <img 
                        src={`http://localhost:8000/storage/${member.image_path}`} 
                        alt={member.full_name}
                        className="w-10 h-10 rounded-full object-cover cursor-pointer"
                        onClick={() => setSelectedImage(`http://localhost:8000/storage/${member.image_path}`)}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                        <span className="text-sm font-medium">{member.full_name?.charAt(0)}</span>
                      </div>
                    )}
                  </td>
                  <td className="table-cell font-mono text-sm">{member.cin}</td>
                  <td className="table-cell font-medium">{member.full_name}</td>
                  <td className="table-cell">{member.phone_number}</td>
                  <td className="table-cell">
                    <span className="membership-badge">
                      {member.membership?.name}
                    </span>
                  </td>
                  <td className="table-cell">{formatDate(member.start_date)}</td>
                  <td className="table-cell">{formatDate(member.end_date)}</td>
                  <td className="table-cell">
                    <span className={daysLeft < 0 ? 'text-danger' : daysLeft <= 7 ? 'text-warning' : 'text-success'}>
                      {daysLeft < 0 ? 'Expired' : `${daysLeft} days`}
                    </span>
                  </td>
                  <td className="table-cell">
                    <StatusBadge status={status} />
                  </td>
                  <td className="table-cell">
                    <div className="flex gap-2">
                      {!isArchived ? (
                        <>
                          <button 
                            onClick={() => setShowArchiveConfirm(member)}
                            className="p-1 hover:bg-gray-700 rounded transition-colors"
                            title="Archive"
                          >
                            <Archive className="w-5 h-5 text-orange-400" />
                          </button>
                          <button 
                            onClick={() => onEdit(member)}
                            className="p-1 hover:bg-gray-700 rounded transition-colors"
                            title="Edit Info"
                          >
                            <Pencil className="w-5 h-5 text-yellow-400" />
                          </button>
                          {status === 'expiring_soon' && (
                            <button 
                              onClick={() => onEdit({ ...member, renew: true })}
                              className="p-1 hover:bg-gray-700 rounded transition-colors"
                              title="Renew Membership"
                            >
                              <RefreshCw className="w-5 h-5 text-green-400" />
                            </button>
                          )}
                        </>
                      ) : (
                        // Archived members: only allow Renew and Force Delete
                        <>
                          <button 
                            onClick={() => onEdit({ ...member, renew: true })}
                            className="p-1 hover:bg-gray-700 rounded transition-colors"
                            title="Renew Membership"
                          >
                            <RefreshCw className="w-5 h-5 text-green-400" />
                          </button>
                          <button 
                            onClick={() => setShowDeleteConfirm(member)}
                            className="p-1 hover:bg-gray-700 rounded transition-colors"
                            title="Force Delete"
                          >
                            <Trash2 className="w-5 h-5 text-red-400" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={!!showArchiveConfirm}
        onClose={() => setShowArchiveConfirm(null)}
        onConfirm={() => handleArchive(showArchiveConfirm)}
        title="Archive Member"
        message={`Are you sure you want to archive ${showArchiveConfirm?.full_name}? This member can be restored later.`}
      />

      <ConfirmDialog
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        onConfirm={() => handleForceDelete(showDeleteConfirm)}
        title="Permanently Delete Member"
        message={`Are you sure you want to permanently delete ${showDeleteConfirm?.full_name}? This action cannot be undone.`}
        variant="danger"
      />

      <ImageModal
        isOpen={!!selectedImage}
        src={selectedImage}
        alt="Member image"
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
};

export default MemberTable;