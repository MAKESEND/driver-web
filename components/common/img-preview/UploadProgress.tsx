import { FC, useState } from 'react';
import axios from 'axios';
import { useEffect, useMemo, useCallback, useRef } from 'react';
import imageCompression from 'browser-image-compression';
import {
  Box,
  IconButton,
  Card,
  LinearProgress,
  Typography,
} from '@mui/material';

import dynamic from 'next/dynamic';
const CheckCircleIcon = dynamic(
  () => import('@mui/icons-material/CheckCircleOutline')
);
const HighlightOffIcon = dynamic(
  () => import('@mui/icons-material/HighlightOff')
);

export interface IUploadProgressProps {
  image: File;
}

export const UploadProgress: FC<IUploadProgressProps> = ({ image }) => {
  const [isDone, setIsDone] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [compressedImg, setCompressedImg] = useState<File | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const uploaded = useRef<boolean>(false);

  const imgSize = useMemo(() => {
    const size = ((compressedImg?.size ?? 0) / 1024).toFixed(2);
    return size;
  }, [compressedImg]);

  useEffect(() => {
    return () => {
      controllerRef.current = null;
      uploaded.current = false;
      setProgress(0);
      setIsDone(false);
      setCompressedImg(null);
    };
  }, []);

  return (
    <Card sx={{ py: 1, px: 2 }}>
      <Typography
        sx={{
          display: 'inline-flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Typography component="span">{image.name}</Typography>
        &nbsp;
        <Typography component="span">{imgSize} KB</Typography>
      </Typography>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box>
          <Typography sx={{ whiteSpace: 'nowrap' }}>{progress} %</Typography>
        </Box>
        <Box sx={{ width: '100%', mx: 1 }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {isDone ? (
            <CheckCircleIcon sx={{ color: 'green' }} />
          ) : (
            <IconButton onClick={() => controllerRef.current?.abort()}>
              <HighlightOffIcon sx={{ color: 'red' }} />
            </IconButton>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default UploadProgress;
