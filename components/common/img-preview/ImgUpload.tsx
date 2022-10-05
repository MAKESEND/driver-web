import UploadProgress from './UploadProgress';

export interface IImgUploadProps {
  images: File[];
}

export const ImgUpload: React.FC<IImgUploadProps> = ({ images }) => {
  return (
    <>
      {images.map((image, index) => (
        <UploadProgress key={image.lastModified + index} image={image} />
      ))}
    </>
  );
};

export default ImgUpload;
