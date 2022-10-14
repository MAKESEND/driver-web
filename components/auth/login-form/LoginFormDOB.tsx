import type { LoginFormComponentProps } from '../LoginForm';
import { useEffect, useRef, memo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { userDOBState } from 'states/auth';
import { InputWrapper } from './InputWrapper';
import { Divider, IconButton, InputBase } from '@mui/material';

import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
const CalendarMonthIcon = dynamic(
  () => import('@mui/icons-material/CalendarMonthOutlined')
);

export const LoginFormDOB: React.FC<LoginFormComponentProps> = ({
  formId,
  remember = false,
}) => {
  const { t } = useTranslation('common');
  const thisYear = new Date().getUTCFullYear();
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const initRef = useRef(true);
  const [userDOB, setUserDOB] = useRecoilState(userDOBState);
  const { control, formState, getValues, clearErrors } = useFormContext();

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
      initRef.current = true;
    };
  }, []);

  return (
    <Controller
      name="dob"
      control={control}
      rules={{ required: true }}
      defaultValue={userDOB}
      render={({ field: { onChange, value, ...field } }) => (
        <InputWrapper sx={{ mb: 2 }}>
          <InputBase
            id="user_dob"
            type="date"
            required
            inputProps={{
              min: `${thisYear - 80}-01-01`, // up to 80-year-old
              max: `${thisYear - 18}-12-31`, // at least 18-year-old
            }}
            placeholder={t('auth.dob')}
            sx={{
              width: '100%',
              '& > input[type=date]::-webkit-inner-spin-button, & > input[type="date"]::-webkit-calendar-picker-indicator':
                { display: 'none', WebkitAppearance: 'none' },
            }}
            value={value}
            onChange={(...args) => {
              const [event] = args;
              if (remember) {
                setUserDOB(event.target.value);
              }

              if (formState.errors?.dob) {
                clearErrors('dob');
              }

              return onChange(...args);
            }}
            {...field}
            inputRef={dateInputRef}
          />
          <Divider orientation="vertical" sx={{ height: '32px' }} />
          <label htmlFor="user_dob" form={formId}>
            <IconButton
              onClick={() => {
                if (dateInputRef.current?.showPicker) {
                  dateInputRef.current?.showPicker();
                }
              }}
            >
              <CalendarMonthIcon
                sx={{ color: (t) => t.palette.common.darkGrey }}
              />
            </IconButton>
          </label>
        </InputWrapper>
      )}
    />
  );
};

export const MemoizedLoginFormDOB = memo(LoginFormDOB);

export default MemoizedLoginFormDOB;
