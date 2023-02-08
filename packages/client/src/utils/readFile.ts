export const readFile = (file: File): Promise<string> => new Promise((resolve) => {
  const reader = new FileReader();
  reader.onload = () => resolve((reader.result || '').toString());
  reader.onerror = () => resolve('');
  reader.readAsDataURL(file);
});
