export const blobToBase64 = (
  blob: File,
  _mimeType?: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // const dataUrlPrefix = `data:${mimeType};base64,`;
      // const base64WithDataUrlPrefix = reader.result as string;
      // const base64 = base64WithDataUrlPrefix.replace(dataUrlPrefix, '');
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export default blobToBase64;
