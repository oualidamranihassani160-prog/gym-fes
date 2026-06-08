export const getMemberStatusConfig = (status) => {
  const configs = {
    active: { label: 'Active', color: 'success' },
    expiring_soon: { label: 'Expiring Soon', color: 'warning' },
    expired: { label: 'Expired', color: 'danger' },
  };
  return configs[status] || configs.expired;
};

export const getProductAvailabilityConfig = (availability) => {
  const configs = {
    available: { label: 'Available', color: 'success' },
    low_stock: { label: 'Low Stock', color: 'warning' },
    out_of_stock: { label: 'Out of Stock', color: 'danger' },
  };
  return configs[availability] || configs.out_of_stock;
};