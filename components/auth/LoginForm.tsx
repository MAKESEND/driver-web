import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputBase,
  Paper,
  Typography,
  styled,
} from '@mui/material';

import dynamic from 'next/dynamic';
const TextField = dynamic(() => import('@mui/material/TextField'));
const PhoneIcon = dynamic(
  () => import('@mui/icons-material/LocalPhoneOutlined')
);
const CalendarMonthIcon = dynamic(
  () => import('@mui/icons-material/CalendarMonthOutlined')
);

const Anchor = styled('a')(() => ({}));

const InputPaper = styled(Paper)(({ theme }) => ({
  paddingLeft: theme.spacing(1.75),
  width: '100%',
  maxWidth: theme.layout.size.btnMaxWidth,
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.palette.common.lightGrey}`,
}));

InputPaper.defaultProps = {
  elevation: 0,
};

type LoginInputs = {
  phone: string;
  dob: string;
};

export interface LoginFormProps {
  id?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ id }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginInputs>();
  const { t } = useTranslation('common');
  const [driverDOB, setDriverDOB] = useState<string>('');
  const [driverPhone, setDriverPhone] = useState<string>('');

  useEffect(() => {
    return () => {
      setDriverPhone('');
      setDriverDOB('');
    };
  }, []);

  return (
    <form
      id={id}
      name={id}
      method="post"
      action="/api/auth/login"
      encType="application/x-www-form-urlencoded"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <InputPaper sx={{ mb: 2 }}>
          <InputBase
            placeholder={t('auth.phone')}
            sx={{ flexGrow: 1 }}
            {...register('phone')}
          />
          <Divider orientation="vertical" sx={{ height: 32 }} />
          <IconButton disabled>
            <PhoneIcon
              sx={{
                color: (t) => t.palette.common.darkGrey,
              }}
            />
          </IconButton>
        </InputPaper>
        <InputPaper>
          <InputBase
            placeholder={t('auth.dob')}
            {...register('dob')}
            sx={{
              width: '100%',
            }}
          />
          <Divider orientation="vertical" sx={{ height: 32 }} />
          <IconButton>
            <CalendarMonthIcon
              sx={{ color: (t) => t.palette.common.darkGrey }}
            />
          </IconButton>
        </InputPaper>
        <Box
          sx={{
            width: '100%',
            maxWidth: (t) => t.layout.size.btnMaxWidth,
            display: 'inline-flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  maxWidth: '40px',
                  maxHeight: '40px',
                }}
              />
            }
            label={
              <Typography variant="secondary" fontSize="0.75rem">
                {t('hint.rememberMe')}
              </Typography>
            }
          />
          <Anchor href="https://makesend.asia" rel="noreferrer" target="_blank">
            <Typography fontSize="0.75rem">
              {t('hint.forgetPassword')}
            </Typography>
          </Anchor>
        </Box>
      </Box>
    </form>
  );
};

export default LoginForm;
