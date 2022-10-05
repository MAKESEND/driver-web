import type { Dispatch, FC, SetStateAction } from 'react';
import { memo } from 'react';
import { useDropzone } from 'react-dropzone';
import { Placeholder } from 'components/common/img-preview/Placeholder';
import { ImageThumb } from 'components/common/img-preview/ImageThumb';
import { AddImage } from 'components/common/img-preview/AddImage';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Typography,
} from '@mui/material';

import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
const ExpandMoreIcon = dynamic(() => import('@mui/icons-material/ExpandMore'));

export interface TaskMediaProps {
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
  maxImgs?: number;
  sticky?: boolean;
  defaultExpanded?: boolean;
  disabled?: boolean;
}

export const TaskMedia: FC<TaskMediaProps> = ({
  images = [],
  setImages = () => console.warn('no setImages given to TaskMedia'),
  maxImgs = 3,
  sticky = false,
  defaultExpanded = false,
  disabled = false,
}) => {
  const { t } = useTranslation('tasks');

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

  if (disabled) return null;

  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      sx={{
        ...(sticky && {
          position: 'sticky',
          top: 0,
          zIndex: (t) => t.zIndex.drawer,
        }),
      }}
    >
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
            alignItems="stretch"
            columnSpacing={{ xs: 2 }}
          >
            {images.map((image, index) => (
              <Grid item xs={6} sm={4} key={image.lastModified + index}>
                <ImageThumb image={image} index={index} setImages={setImages} />
              </Grid>
            ))}
            {images.length < maxImgs && (
              <Grid item xs={6} sm={4}>
                <AddImage onClick={open} />
              </Grid>
            )}
          </Grid>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export const MemoizedTaskMedia = memo(TaskMedia);

export default MemoizedTaskMedia;
