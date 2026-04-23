export const capitalizeWords = (text: string) => {
  if (!text) return '';
  return text[0]?.toUpperCase() + text.slice(1);
};
