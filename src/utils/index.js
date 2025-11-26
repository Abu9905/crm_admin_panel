// Utility functions

/**
 * Format date to readable string
 */
export const formatDate = (date) => {
  if (!date) return 'Not available';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format currency
 */
export const formatCurrency = (amount) => {
  if (!amount) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Truncate text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Get status badge class
 */
export const getStatusBadgeClass = (status) => {
  const statusColors = {
    'New Lead': 'bg-green-400 text-white',
    'Hot Lead': 'bg-red-500 text-white',
    'Warm Lead': 'bg-orange-400 text-white',
    'Cold Lead': 'bg-blue-400 text-white',
    'Gold Lead': 'bg-pink-500 text-white',
    Unread: 'bg-blue-600 text-white',
  };
  return statusColors[status] || 'bg-gray-400 text-white';
};

