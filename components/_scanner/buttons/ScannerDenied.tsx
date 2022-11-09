import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Box, Button, Typography } from '@mui/material';

export const ScannerDenied: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation(['scanner']);

  return (
    <Box>
      <Typography variant="body1">{t('title.cameraDenied')}</Typography>
      <Button onClick={() => router.reload()}>{t('btn.reload')}</Button>
    </Box>
  );
};

export default ScannerDenied;
