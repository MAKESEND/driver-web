import type { Dispatch, FC, SetStateAction } from 'react';
import { useState, useEffect, memo } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Typography,
} from '@mui/material';
import { Placeholder } from 'components/common/img-preview/Placeholder';
import { ImageThumb } from 'components/common/img-preview/ImageThumb';
import { AddImage } from 'components/common/img-preview/AddImage';

import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
const ExpandMoreIcon = dynamic(() => import('@mui/icons-material/ExpandMore'));

export interface TaskMediaProps {
  media: string[];
  setter: Dispatch<SetStateAction<string[]>>;
  maxImgs?: number;
  sticky?: boolean;
}

export const TaskMedia: FC<TaskMediaProps> = ({
  media = [],
  setter = () => console.warn('no setter given to TaskMedia'),
  maxImgs = 3,
  sticky = false,
}) => {
  const { t } = useTranslation('tasks');
  const [images, setImages] = useState<File[]>([]);

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
      setImages([]);
    };
  }, []);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>
          {t('title.uploadPhotos')}&nbsp;
          {`(${images.length})`}
        </Typography>
      </AccordionSummary>
      <AccordionDetails {...getRootProps()}>
        <input {...getInputProps()} />
        {images.length === 0 ? (
          <Placeholder onClick={open} />
        ) : (
          <Grid
            container
            width="100%"
            justifyContent="space-between"
            alignItems="center"
            gridColumn={3}
            spacing={1}
          >
            {images.map((image, index) => (
              <Grid item key={image.lastModified + index}>
                <ImageThumb image={image} index={index} setImages={setImages} />
              </Grid>
            ))}
            {images.length < maxImgs && <AddImage onClick={open} />}
          </Grid>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export const MemoizedTaskMedia = memo(TaskMedia);

export default MemoizedTaskMedia;
