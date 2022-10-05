import imageCompression from 'browser-image-compression';

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

export type compressionArgs = Parameters<typeof imageCompression>;

const imgZipDefaultOptions = {
  maxSizeMB: 0.1,
  // maxWidthOrHeight: 1920,
  useWebWorker: true,
};

/**
 * Compress and encode with Base64
 * @param images
 * @param imgZipOptions
 * @returns
 */
export const imgProcesser = async (
  images: File[],
  imgZipOptions?: compressionArgs[1]
) => {
  const imgCompression = images.map((img) =>
    imageCompression(img, { ...imgZipDefaultOptions, ...imgZipOptions })
  );
  const compressedImgs = await Promise.all(imgCompression);
  const imgSerializing = compressedImgs.map((img) =>
    blobToBase64(img, img.type)
  );
  const serializedImg = await Promise.all(imgSerializing);
  return serializedImg;
};

export default imgProcesser;
