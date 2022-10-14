import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { rememberUserState } from 'states/auth';
import { useTranslation } from 'next-i18next';
import Anchor from 'components/common/StyledAnchor';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';

export interface LoginFormOptionsProps {
  setRemember?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginFormOptions: React.FC<LoginFormOptionsProps> = ({
  setRemember = () => console.warn('no setRemember given LoginFormOptions'),
}) => {
  const { t } = useTranslation('common');
  const [isRemembered, setIsRemembered] = useRecoilState(rememberUserState);

  useEffect(() => {
    setRemember(isRemembered);
  }, [setRemember, isRemembered, setIsRemembered]);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: (t) => t.layout.size.btnMaxWidth,
        display: 'inline-flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        px: 1,
      }}
    >
      <FormControlLabel
        onChange={(_e, checked) => setIsRemembered(checked)}
        control={
          <Checkbox
            checked={isRemembered}
            sx={{ maxWidth: '40px', maxHeight: '40px' }}
          />
        }
        label={
          <Typography variant="secondary" fontSize="0.75rem">
            {t('hint.rememberMe')}
          </Typography>
        }
      />
      <Anchor href="https://makesend.asia" rel="noreferrer" target="_blank">
        <Typography sx={{ fontSize: '0.75rem' }}>
          {t('hint.forgetPassword')}
        </Typography>
      </Anchor>
    </Box>
  );
};

export default LoginFormOptions;
