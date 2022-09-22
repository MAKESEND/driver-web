import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useDropzone } from 'react-dropzone';
import { Box, Card, CardContent, Divider, TextField } from '@mui/material';
import ImageThumb from './ImageThumb';
import Placeholder from './Placeholder';
import AddImage from './AddImage';
import ImgUpload from './ImgUpload';

export interface IImgPreviewProps {
  max?: number;
}

export const ImgPreview: FC<IImgPreviewProps> = ({ max = 3 }) => {
  const { t } = useTranslation('common');
  const [images, setImages] = useState<File[]>([]);
  const [maxImgs, setMaxImgs] = useState<number>(max);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: { 'image/*': ['.png', '.jpeg'] },
    noClick: true,
    maxFiles: maxImgs,
    onDrop: (files) => {
      if (images.length < maxImgs) {
        const slicer = maxImgs - images.length;
        setImages((list) => [...list, ...files.slice(0, slicer)]);
      }
    },
  });

  useEffect(() => {
    return () => {
      setMaxImgs(max);
      setImages([]);
    };
  }, [max]);

  return (
    <>
      <>
        <TextField
          size="small"
          value={maxImgs}
          helperText={t('imgPreview.helper')}
          inputProps={{
            inputMode: 'numeric',
            min: 1,
            max: 10,
            'aria-label': 'maximum-img',
          }}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setMaxImgs(!Number.isNaN(value) ? value : 0);
          }}
        />
        <br />
      </>
      <Divider />
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Card>
          <CardContent>
            {images.length === 0 ? (
              <Placeholder onClick={open} />
            ) : (
              <Box
                sx={{
                  display: 'grid',
                  width: '100%',
                  gap: '1rem',
                  gridTemplateColumns:
                    'repeat(auto-fill, minmax(6.25rem, 1fr))',
                }}
              >
                {images.map((image, index) => (
                  <ImageThumb
                    key={image.lastModified + index}
                    image={image}
                    index={index}
                    setImages={setImages}
                  />
                ))}
                {images.length < maxImgs && <AddImage onClick={open} />}
              </Box>
            )}
          </CardContent>
        </Card>
      </div>
      <Divider />
      <ImgUpload images={images} />
    </>
  );
};

export default ImgPreview;
