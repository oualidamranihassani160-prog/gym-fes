import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Upload } from 'lucide-react';
import { createMember, updateMember, renewMember, fetchMembers } from '../../store/slices/memberSlice';

const MemberModal = ({ isOpen, onClose, member, memberships }) => {
  const dispatch = useDispatch();
  const { filters, sorting } = useSelector((state) => state.members);
  const [formData, setFormData] = useState({
    cin: '',
    full_name: '',
    phone_number: '',
    membership_id: '',
    start_date: new Date().toISOString().split('T')[0],
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (member) {
      setFormData({
        cin: member.cin || '',
        full_name: member.full_name || '',
        phone_number: member.phone_number || '',
        membership_id: member.membership_id || '',
        start_date: member.start_date?.split('T')[0] || new Date().toISOString().split('T')[0],
        image: null,
      });
      if (member.image_path) {
        setImagePreview(`http://localhost:8000/storage/${member.image_path}`);
      }
    } else {
      resetForm();
    }
  }, [member]);

  const resetForm = () => {
    setFormData({
      cin: '',
      full_name: '',
      phone_number: '',
      membership_id: memberships[0]?.id || '',
      start_date: new Date().toISOString().split('T')[0],
      image: null,
    });
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (member?.renew) {
        await dispatch(renewMember({ id: member.id, membershipId: formData.membership_id }));
      } else if (member) {
        await dispatch(updateMember({ id: member.id, data: formData }));
      } else {
        await dispatch(createMember(formData));
      }
      await dispatch(fetchMembers({ ...filters, ...sorting }));
      onClose();
      resetForm();
    } catch (error) {
      console.error('Error saving member:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const isRenew = member?.renew;
  const title = isRenew ? 'Renew Membership' : (member ? 'Edit Member' : 'Add New Member');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-text">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-text transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {!isRenew ? (
            <div className="flex flex-col md:flex-row gap-6 items-stretch">
              <div className="w-full md:w-1/2 flex-shrink-0 flex flex-col">
                <label className="block text-text mb-2">Profile Image</label>
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-full h-full max-w-full md:max-w-[520px]">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="h-full w-auto rounded-lg object-cover" />
                    ) : (
                      <div className="w-full h-full rounded-lg bg-gray-700 flex items-center justify-center">
                        <span className="text-sm">No Image</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-3 flex justify-center md:justify-start">
                  <label className="btn-secondary cursor-pointer flex items-center gap-2 text-sm px-3 py-2">
                    <Upload className="w-4 h-4" />
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="w-full md:w-1/2 space-y-4">
                <div>
                  <label className="block text-text mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-text mb-2">CIN *</label>
                    <input
                      type="text"
                      value={formData.cin}
                      onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-text mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.phone_number}
                      onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-text mb-2">Membership Type *</label>
                  <select
                    value={formData.membership_id}
                    onChange={(e) => setFormData({ ...formData, membership_id: e.target.value })}
                    className="input-field"
                    required
                  >
                    {memberships.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name} - {type.price} DH ({type.duration_months} months)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-text mb-2">Start Date *</label>
                  <input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-text mb-2">Membership Type *</label>
                <select
                  value={formData.membership_id}
                  onChange={(e) => setFormData({ ...formData, membership_id: e.target.value })}
                  className="input-field"
                  required
                >
                  {memberships.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name} - {type.price} DH ({type.duration_months} months)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Saving...' : (isRenew ? 'Renew' : (member ? 'Update' : 'Create'))}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberModal;