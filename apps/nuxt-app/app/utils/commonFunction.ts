export const capitalizeWords = (text: string) => {
  if (!text) return '';
  return text[0]?.toUpperCase() + text.slice(1);
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleString();
};

export const formatSize = (size: number) => {
  return (size / 1024).toFixed(2);
};
