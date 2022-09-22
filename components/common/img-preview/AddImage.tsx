import type { FC } from 'react';
import { SquareBox } from './ImageThumb';
import { Card, IconButton } from '@mui/material';

import dynamic from 'next/dynamic';
const AddIcon = dynamic(() => import('@mui/icons-material/Add'));

export interface IAddImageProps {
  onClick?: () => void;
}

export const AddImage: FC<IAddImageProps> = ({ onClick = () => undefined }) => {
  return (
    <SquareBox>
      <Card sx={{ width: '100%', height: '100%' }}>
        <IconButton sx={{ width: '100%', height: '100%' }} onClick={onClick}>
          <AddIcon />
        </IconButton>
      </Card>
    </SquareBox>
  );
};

export default AddImage;
