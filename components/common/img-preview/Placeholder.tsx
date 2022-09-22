import type { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { Button, Typography } from '@mui/material';

import dynamic from 'next/dynamic';
const ImageIcon = dynamic(() => import('@mui/icons-material/ImageOutlined'));

export interface IPlaceholderProps {
  onClick?: () => void;
}

export const Placeholder: FC<IPlaceholderProps> = ({
  onClick = () => undefined,
}) => {
  const { t } = useTranslation('common');

  return (
    <>
      <ImageIcon sx={{ width: '5rem', height: '5rem' }} />
      <Typography>{t('imgPreview.upload')}</Typography>
      <Button onClick={onClick}>{t('imgPreview.btn.browse')}</Button>
    </>
  );
};

export default Placeholder;
