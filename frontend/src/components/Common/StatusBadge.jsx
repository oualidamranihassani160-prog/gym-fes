import { getMemberStatusConfig, getProductAvailabilityConfig } from '../../utils/statusUtils';

const StatusBadge = ({ status, type = 'member' }) => {
  const config = type === 'member' 
    ? getMemberStatusConfig(status)
    : getProductAvailabilityConfig(status);
  
  const colorClasses = {
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
  };

  return (
    <span className={`badge ${colorClasses[config.color]}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;