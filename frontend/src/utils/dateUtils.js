export const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getDaysLeft = (endDate) => {
  const today = new Date();
  const end = new Date(endDate);
  const diffTime = end - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getMemberStatus = (endDate) => {
  const daysLeft = getDaysLeft(endDate);
  if (daysLeft > 7) return 'active';
  if (daysLeft >= 0 && daysLeft <= 7) return 'expiring_soon';
  return 'expired';
};