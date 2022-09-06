import type { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { Box, styled, Typography as MuiTypography } from '@mui/material';

export interface PincodeDotsProps {
  pincode: string[];
  isError?: boolean;
  digits?: number;
  gap?: string;
}

const Typography = styled(MuiTypography, {
  shouldForwardProp: (prop) => prop !== 'isError',
})<{ isError?: boolean }>(({ isError = false }) => ({
  ...(isError && {
    animation: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
    transform: 'translate3d(0, 0, 0)',
    '@keyframes shake': {
      '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
      '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
      '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
      '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
    },
  }),
}));

export const PincodeDots: FC<PincodeDotsProps> = ({
  pincode,
  isError = false,
  digits = 4,
  gap = '7rem',
}) => {
  const { t } = useTranslation('common');

  return (
    <Box sx={{ height: '1.125rem' }}>
      {pincode.length === 0 || isError ? (
        <Typography
          variant="h2"
          sx={{
            marginTop: gap,
            color: (theme) => theme.palette.white.main,
            fontWeight: 400,
          }}
          isError={isError}
        >
          {isError
            ? t('pincode.title.incorrectPin')
            : t('pincode.title.insertPincode')}
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gap: '0.05rem',
            width: `calc(0.75rem * ${digits})`,
            gridTemplateColumns: `repeat(${digits}, 1fr)`,
            marginX: 'auto',
            marginTop: gap,
          }}
        >
          {pincode.map((code, index) => (
            <Box
              key={code + index}
              sx={{
                borderRadius: '50%',
                width: '0.5rem',
                height: '0.5rem',
                backgroundColor: (theme) => {
                  return index < pincode.length
                    ? theme.palette.white.main
                    : 'rgba(0, 0, 0, 0.26)';
                },
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PincodeDots;
