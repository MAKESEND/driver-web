import type { Dispatch, FC, SetStateAction } from 'react';
import { useState, useEffect } from 'react';
import { blobToBase64 } from 'utils/common/blobToBase64';
import { styled, Box, Card, CircularProgress, IconButton } from '@mui/material';

import dynamic from 'next/dynamic';
const CloseIcon = dynamic(() => import('@mui/icons-material/Close'));

const Image = styled('img')(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'fill',
}));

export const SquareBox = styled(Box)(() => ({
  width: '6.25rem',
  height: '6.25rem',
}));

export interface IImageThumbProps {
  image: File;
  setImages?: Dispatch<SetStateAction<File[]>>;
  index?: number;
}

export const ImageThumb: FC<IImageThumbProps> = ({
  image,
  setImages,
  index = 0,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>('');

  useEffect(() => {
    const readAsBase64 = async (image: File) => {
      const serializedImg = await blobToBase64(image);
      setImgSrc(serializedImg);
    };

    readAsBase64(image);

    return () => {
      setIsLoading(false);
      setImgSrc('');
    };
  }, [image]);

  return (
    <SquareBox sx={{ position: 'relative' }}>
      <Card
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Image src={imgSrc} alt={image.name} />
        )}
      </Card>
      {!!setImages && (
        <IconButton
          sx={{
            position: 'absolute',
            top: -10,
            right: -10,
          }}
          onClick={() => {
            setImages((list) => {
              const imgList = [...list];
              imgList.splice(index, 1);
              return imgList;
            });
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
    </SquareBox>
  );
};

export default ImageThumb;
