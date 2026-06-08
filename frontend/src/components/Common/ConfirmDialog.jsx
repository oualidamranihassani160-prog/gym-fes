import { AlertTriangle } from 'lucide-react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, variant = 'warning' }) => {
  if (!isOpen) return null;

  const variantColors = {
    warning: 'text-warning',
    danger: 'text-danger',
    info: 'text-primary',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className={`w-6 h-6 ${variantColors[variant]}`} />
            <h2 className="text-xl font-bold text-text">{title}</h2>
          </div>
          
          <p className="text-gray-300 mb-6">{message}</p>
          
          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button onClick={onConfirm} className={`btn-${variant === 'danger' ? 'danger' : 'primary'}`}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;