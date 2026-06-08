import { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';

const ProductForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: 0,
    price: 0,
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        quantity: initialData.quantity || 0,
        price: initialData.price || 0,
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
    let parsedValue = value;
    
    if (name === 'quantity') {
      parsedValue = parseInt(value) || 0;
      if (parsedValue < 0) parsedValue = 0;
    } else if (name === 'price') {
      parsedValue = parseFloat(value) || 0;
      if (parsedValue < 0) parsedValue = 0;
    }
    
    setFormData({ ...formData, [name]: parsedValue });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (formData.quantity < 0) newErrors.quantity = 'Quantity cannot be negative';
    if (formData.price < 0) newErrors.price = 'Price cannot be negative';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getAvailabilityHint = (quantity) => {
    if (quantity > 5) return 'Available';
    if (quantity > 0) return 'Low Stock';
    return 'Out of Stock';
  };

  const availabilityStatus = getAvailabilityHint(formData.quantity);
  const statusColor = 
    formData.quantity > 5 ? 'text-success' : 
    formData.quantity > 0 ? 'text-warning' : 
    'text-danger';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-text mb-2">Product Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`input-field ${errors.name ? 'border-danger' : ''}`}
          disabled={isLoading}
          placeholder="Enter product name"
        />
        {errors.name && <p className="text-danger text-xs mt-1">{errors.name}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-text mb-2">Quantity *</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className={`input-field ${errors.quantity ? 'border-danger' : ''}`}
            disabled={isLoading}
            min="0"
            step="1"
          />
          {errors.quantity && <p className="text-danger text-xs mt-1">{errors.quantity}</p>}
          <p className="text-xs mt-1">
            Status: <span className={statusColor}>{availabilityStatus}</span>
          </p>
        </div>

        <div>
          <label className="block text-text mb-2">Price (DH) *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`input-field ${errors.price ? 'border-danger' : ''}`}
            disabled={isLoading}
            min="0"
            step="0.01"
          />
          {errors.price && <p className="text-danger text-xs mt-1">{errors.price}</p>}
        </div>
      </div>

      <div>
        <label className="block text-text mb-2">Product Image</label>
        <div className="flex items-center gap-4">
          {imagePreview && (
            <div className="relative">
              <img src={imagePreview} alt="Preview" className="w-24 h-24 rounded-lg object-cover" />
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
        <p className="text-gray-500 text-xs mt-1">Max size: 2MB. Allowed: JPG, PNG. Recommended size: 200x200</p>
      </div>

      {initialData && (
        <div className="bg-gray-800 p-3 rounded-lg">
          <p className="text-sm text-gray-400">Current Stock Level:</p>
          <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                formData.quantity === 0 ? 'bg-danger' :
                formData.quantity <= 5 ? 'bg-warning' : 'bg-success'
              }`}
              style={{ width: `${Math.min((formData.quantity / 100) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {formData.quantity === 0 ? 'Out of stock - needs restocking' :
             formData.quantity <= 5 ? `Low stock - only ${formData.quantity} units left` :
             `Good stock level - ${formData.quantity} units available`}
          </p>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4">
        <button type="button" onClick={onCancel} className="btn-secondary" disabled={isLoading}>
          Cancel
        </button>
        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : (initialData ? 'Update Product' : 'Create Product')}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;