import { useLayoutEffect, useRef, useState } from 'react';
import { SquareBox } from './ImageThumb';
import { Card, IconButton } from '@mui/material';

import dynamic from 'next/dynamic';
const AddIcon = dynamic(() => import('@mui/icons-material/Add'));

export interface IAddImageProps {
  onClick?: () => void;
}

export const AddImage: React.FC<IAddImageProps> = ({
  onClick = () => undefined,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    setHeight(containerRef.current?.clientWidth ?? 0);
  }, []);

  return (
    <SquareBox ref={containerRef}>
      <Card sx={{ width: '100%', height }}>
        <IconButton sx={{ width: '100%', height: '100%' }} onClick={onClick}>
          <AddIcon />
        </IconButton>
      </Card>
    </SquareBox>
  );
};

export default AddImage;
