import { AlertCircle, X } from 'lucide-react';

const ErrorAlert = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="bg-danger bg-opacity-10 border border-danger rounded-lg p-4 mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-danger" />
        <span className="text-danger">{message}</span>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-danger hover:text-danger-dark">
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default ErrorAlert;