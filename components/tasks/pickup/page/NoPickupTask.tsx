import type { FC } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { Box, Typography } from '@mui/material';

export const NoPickupTask: FC = () => {
  const { t } = useTranslation('tasks');

  return (
    <Box
      sx={{
        height: '100%',
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: { sm: 'center' },
      }}
    >
      <Image
        src="/imgs/faq_primary_blue.svg"
        alt="faq"
        layout="intrinsic"
        width={250}
        height={250}
        priority
      />
      <Typography variant="h2">{t('title.noTask')}</Typography>
    </Box>
  );
};

export default NoPickupTask;
