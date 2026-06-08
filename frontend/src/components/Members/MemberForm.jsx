import { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';

const MemberForm = ({ initialData, memberships, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    cin: '',
    full_name: '',
    phone_number: '',
    membership_id: '',
    start_date: new Date().toISOString().split('T')[0],
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        cin: initialData.cin || '',
        full_name: initialData.full_name || '',
        phone_number: initialData.phone_number || '',
        membership_id: initialData.membership_id || '',
        start_date: initialData.start_date?.split('T')[0] || new Date().toISOString().split('T')[0],
        image: null,
      });
      if (initialData.image_path) {
        setImagePreview(`http://localhost:8000/storage/${initialData.image_path}`);
      }
    }
  }, [initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors({ ...errors, image: 'Image size should be less than 2MB' });
        return;
      }
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, image: 'Please upload a valid image file' });
        return;
      }
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setErrors({ ...errors, image: null });
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, image: null });
    setImagePreview(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.cin) newErrors.cin = 'CIN is required';
    if (!formData.full_name) newErrors.full_name = 'Full name is required';
    if (!formData.phone_number) newErrors.phone_number = 'Phone number is required';
    if (!formData.membership_id) newErrors.membership_id = 'Membership type is required';
    if (!formData.start_date) newErrors.start_date = 'Start date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const isRenew = initialData?.renew;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-text mb-2">CIN *</label>
          <input
            type="text"
            name="cin"
            value={formData.cin}
            onChange={handleChange}
            className={`input-field ${errors.cin ? 'border-danger' : ''}`}
            disabled={isLoading}
          />
          {errors.cin && <p className="text-danger text-xs mt-1">{errors.cin}</p>}
        </div>

        <div>
          <label className="block text-text mb-2">Full Name *</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className={`input-field ${errors.full_name ? 'border-danger' : ''}`}
            disabled={isLoading}
          />
          {errors.full_name && <p className="text-danger text-xs mt-1">{errors.full_name}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-text mb-2">Phone Number *</label>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className={`input-field ${errors.phone_number ? 'border-danger' : ''}`}
            disabled={isLoading}
          />
          {errors.phone_number && <p className="text-danger text-xs mt-1">{errors.phone_number}</p>}
        </div>

        <div>
          <label className="block text-text mb-2">Membership Type *</label>
          <select
            name="membership_id"
            value={formData.membership_id}
            onChange={handleChange}
            className={`input-field ${errors.membership_id ? 'border-danger' : ''}`}
            disabled={isLoading}
          >
            <option value="">Select Membership</option>
            {memberships.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name} - {type.price} DH ({type.duration_months} months)
              </option>
            ))}
          </select>
          {errors.membership_id && <p className="text-danger text-xs mt-1">{errors.membership_id}</p>}
        </div>
      </div>

      {!isRenew && (
        <div>
          <label className="block text-text mb-2">Start Date *</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className={`input-field ${errors.start_date ? 'border-danger' : ''}`}
            disabled={isLoading}
          />
          {errors.start_date && <p className="text-danger text-xs mt-1">{errors.start_date}</p>}
        </div>
      )}

      {!isRenew && (
        <div>
          <label className="block text-text mb-2">Profile Image</label>
          <div className="flex items-center gap-4">
            {imagePreview && (
              <div className="relative">
                <img src={imagePreview} alt="Preview" className="w-20 h-20 rounded-full object-cover" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 p-1 bg-danger rounded-full text-white hover:bg-opacity-90"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <label className="btn-secondary cursor-pointer flex items-center gap-2">
              <Upload className="w-5 h-5" />
              {imagePreview ? 'Change Image' : 'Upload Image'}
              <input
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                onChange={handleImageChange}
                className="hidden"
                disabled={isLoading}
              />
            </label>
          </div>
          {errors.image && <p className="text-danger text-xs mt-1">{errors.image}</p>}
          <p className="text-gray-500 text-xs mt-1">Max size: 2MB. Allowed: JPG, PNG</p>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4">
        <button type="button" onClick={onCancel} className="btn-secondary" disabled={isLoading}>
          Cancel
        </button>
        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : (isRenew ? 'Renew Membership' : (initialData ? 'Update Member' : 'Create Member'))}
        </button>
      </div>
    </form>
  );
};

export default MemberForm;