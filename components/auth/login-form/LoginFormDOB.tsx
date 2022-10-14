import type { LoginFormComponentProps } from '../LoginForm';
import { useState, useEffect, useRef, memo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { userDOBState } from 'states/auth';
import { InputWrapper } from './InputWrapper';
import { FormInputAlert } from './FormInputAlert';
import {
  Box,
  Fade,
  Divider,
  IconButton,
  InputBase,
  Typography,
} from '@mui/material';

import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
const CalendarMonthIcon = dynamic(
  () => import('@mui/icons-material/CalendarMonthOutlined')
);
const ClearIcon = dynamic(() => import('@mui/icons-material/Clear'));

export const LoginFormDOB: React.FC<LoginFormComponentProps> = ({
  formId,
  remember = false,
}) => {
  const { t } = useTranslation('common');
  const thisYear = new Date().getUTCFullYear();
  const [isError, setIsError] = useState(false);
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const initRef = useRef(true);
  const [userDOB, setUserDOB] = useRecoilState(userDOBState);
  const { control, formState, getValues, clearErrors, setValue } =
    useFormContext();

  useEffect(() => {
    if (formState.errors?.dob || formState.errors?.login_failed) {
      setIsError(true);
    }

    if (!formState.errors?.dob && !formState.errors?.login_failed) {
      setIsError(false);
    }
  }, [formState.errors?.dob, formState.errors?.login_failed]);

  useEffect(() => {
    if (!remember && !initRef.current) {
      setUserDOB('');
    } else if (remember) {
      setUserDOB(getValues('dob'));
    }

    initRef.current = false;
  }, [remember, setUserDOB, getValues]);

  useEffect(() => {
    return () => {
      setIsError(false);
      initRef.current = true;
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        pb: 3,
        mb: 0.5,
        width: '100%',
        maxWidth: (t) => t.layout.size.btnMaxWidth,
        textAlign: 'start',
      }}
    >
      <label htmlFor="user_dob" form={formId}>
        <Typography component="span" sx={{ ml: 1, fontSize: '0.875rem' }}>
          {t('auth.dob')}
        </Typography>
      </label>
      <Controller
        name="dob"
        control={control}
        rules={{
          required: {
            value: true,
            message: t('auth.error.required', { field: t('auth.dob') }),
          },
          pattern: {
            value: /\d{4}-\d{2}-\d{2}/g,
            message: t('auth.error.invalidPhone'),
          },
        }}
        defaultValue={userDOB}
        render={({ field: { onChange, value, ...field } }) => (
          <InputWrapper
            sx={{
              borderColor: (t) => (isError ? t.palette.error.main : ''),
            }}
          >
            <InputBase
              id="user_dob"
              type="date"
              required
              value={value}
              placeholder={t('auth.dob')}
              inputRef={dateInputRef}
              endAdornment={
                value && (
                  <IconButton
                    color={isError ? 'error' : undefined}
                    onClick={() => setValue('dob', '')}
                  >
                    <ClearIcon />
                  </IconButton>
                )
              }
              inputProps={{
                min: `${thisYear - 80}-01-01`, // up to 80-year-old
                max: `${thisYear - 18}-12-31`, // at least 18-year-old
              }}
              sx={{
                width: '100%',
                '& > input[type=date]::-webkit-inner-spin-button, & > input[type="date"]::-webkit-calendar-picker-indicator':
                  { display: 'none', WebkitAppearance: 'none' },
                color: (t) => (isError ? t.palette.error.main : ''),
              }}
              onChange={(...args) => {
                const [event] = args;
                if (remember) {
                  setUserDOB(event.target.value);
                }

                setIsError(false);
                if (formState.errors?.dob || formState.errors?.login_failed) {
                  clearErrors(['dob', 'login_failed']);
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
            <label htmlFor="user_dob" form={formId}>
              <IconButton
                onClick={() => {
                  if (dateInputRef.current?.showPicker) {
                    dateInputRef.current?.showPicker();
                  }
                }}
              >
                <CalendarMonthIcon
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
      <FormInputAlert show={isError} sx={{ position: 'absolute', left: 0 }}>
        {(formState.errors?.dob?.message as string) ||
          (formState.errors?.login_failed?.message as string)}
      </FormInputAlert>
    </Box>
  );
};

export const MemoizedLoginFormDOB = memo(LoginFormDOB);

export default MemoizedLoginFormDOB;
