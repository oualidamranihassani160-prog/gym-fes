import { useState } from 'react';
import { Upload, X } from 'lucide-react';

const ImageUpload = ({ onImageChange, currentImage, className = "" }) => {
  const [preview, setPreview] = useState(currentImage || null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onImageChange(null);
  };

  return (
    <div className={`${className}`}>
      {preview ? (
        <div className="relative inline-block">
          <img src={preview} alt="Preview" className="w-24 h-24 rounded-lg object-cover" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 p-1 bg-danger rounded-full text-white hover:bg-opacity-90"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="cursor-pointer">
          <div className="w-24 h-24 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center hover:border-primary transition-colors">
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">Upload</span>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};

export default ImageUpload;