import type { LoginFormComponentProps } from '../LoginForm';
import { memo, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { useFormContext, Controller } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { userPhoneState } from 'states';
import { InputWrapper } from './InputWrapper';
import FormInputAlert from './FormInputAlert';
import { Box, Divider, IconButton, InputBase, Typography } from '@mui/material';

import dynamic from 'next/dynamic';
const PhoneIcon = dynamic(
  () => import('@mui/icons-material/LocalPhoneOutlined')
);
const ClearIcon = dynamic(() => import('@mui/icons-material/Clear'));

export const LoginFormPhone: React.FC<LoginFormComponentProps> = ({
  formId,
  remember,
  hintSpace = false,
  clearable = false,
  showLabel = false,
  lastItem = false,
}) => {
  const { t } = useTranslation('common');
  const initRef = useRef(true);
  const [isError, setIsError] = useState(false);
  const [userPhone, setUserPhone] = useRecoilState(userPhoneState);
  const { control, formState, getValues, clearErrors, setValue } =
    useFormContext();

  useEffect(() => {
    if (formState.errors?.phone || formState.errors?.login_failed) {
      setIsError(true);
    }

    if (!formState.errors?.phone && !formState.errors?.login_failed) {
      setIsError(false);
    }
  }, [formState.errors?.phone, formState.errors?.login_failed]);

  useEffect(() => {
    if (!remember && !initRef.current) {
      setUserPhone('');
    } else if (remember) {
      setUserPhone(getValues('phone'));
    }

    initRef.current = false;
  }, [remember, setUserPhone, getValues]);

  useEffect(() => {
    return () => {
      setIsError(false);
      initRef.current = true;
    };
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: (t) => t.layout.size.btnMaxWidth,
        ...(!lastItem && { mb: isError ? 0 : 2 }),
        ...(hintSpace && { textAlign: 'start', position: 'relative', pb: 3 }),
      }}
    >
      {showLabel && (
        <label htmlFor="user_phone" form={formId}>
          <Typography component="span" sx={{ ml: 1, fontSize: '0.875rem' }}>
            {t('auth.phone')}
          </Typography>
        </label>
      )}
      <Controller
        name="phone"
        control={control}
        rules={{
          required: {
            value: true,
            message: t('auth.error.required', { field: t('auth.phone') }),
          },
          pattern: {
            value: /^0\d{9}$/g,
            message: t('auth.error.invalidPhone'),
          },
        }}
        defaultValue={userPhone}
        render={({ field: { onChange, value, ...field } }) => (
          <InputWrapper
            sx={{
              borderColor: (t) => (isError ? t.palette.error.main : ''),
            }}
          >
            <InputBase
              id="user_phone"
              type="tel"
              autoFocus
              required
              value={value}
              placeholder={t('auth.phone')}
              endAdornment={
                clearable &&
                value && (
                  <IconButton
                    color={isError ? 'error' : undefined}
                    onClick={() => setValue('phone', '')}
                  >
                    <ClearIcon />
                  </IconButton>
                )
              }
              sx={{
                flexGrow: 1,
                color: (t) => (isError ? t.palette.error.main : ''),
              }}
              onChange={(...args) => {
                const [event] = args;
                if (remember) {
                  setUserPhone(event.target.value);
                }

                setIsError(false);
                if (formState.errors?.phone || formState.errors?.login_failed) {
                  clearErrors(['phone', 'login_failed']);
                }

                return onChange(...args);
              }}
              {...field}
            />
            <Divider
              orientation="vertical"
              sx={{
                height: '32px',
                borderColor: (t) => (isError ? t.palette.error.main : ''),
              }}
            />
            <label htmlFor="user_phone" form={formId}>
              <IconButton disabled>
                <PhoneIcon
                  sx={{
                    color: (t) =>
                      isError
                        ? t.palette.error.main
                        : t.palette.common.darkGrey,
                  }}
                />
              </IconButton>
            </label>
          </InputWrapper>
        )}
      />
      <FormInputAlert
        show={isError}
        sx={{
          ...(hintSpace && {
            position: 'absolute',
            left: 0,
          }),
        }}
      >
        {(formState.errors?.phone?.message as string) ||
          (formState.errors?.login_failed?.message as string)}
      </FormInputAlert>
    </Box>
  );
};

export const MemoizedLoginFormPhone = memo(LoginFormPhone);

export default MemoizedLoginFormPhone;
