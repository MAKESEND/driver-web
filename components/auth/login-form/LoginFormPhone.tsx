import type { LoginFormComponentProps } from '../LoginForm';
import { memo, useEffect, useRef } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { userPhoneState } from 'states/auth';
import { InputWrapper } from './InputWrapper';
import { Divider, IconButton, InputBase } from '@mui/material';

import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
const PhoneIcon = dynamic(
  () => import('@mui/icons-material/LocalPhoneOutlined')
);

export const LoginFormPhone: React.FC<LoginFormComponentProps> = ({
  formId,
  remember = false,
}) => {
  const { t } = useTranslation('common');
  const initRef = useRef(true);
  const { control } = useFormContext();
  const [userPhone, setUserPhone] = useRecoilState(userPhoneState);

  useEffect(() => {
    if (!remember && !initRef.current) {
      setUserPhone('');
    } else if (remember && control._formValues?.phone) {
      setUserPhone(control._formValues.phone);
    }

    initRef.current = false;
  }, [control, remember, setUserPhone]);

  useEffect(() => {
    return () => {
      initRef.current = true;
    };
  }, []);

  return (
    <Controller
      name="phone"
      control={control}
      rules={{ required: true, pattern: /^0\d{9}$/g }}
      defaultValue={userPhone}
      render={({ field: { onChange, value, ...field } }) => (
        <InputWrapper>
          <InputBase
            id="user_phone"
            type="tel"
            autoFocus
            required
            placeholder={t('auth.phone')}
            sx={{ flexGrow: 1 }}
            value={value}
            onChange={(...args) => {
              const [event] = args;
              if (remember) {
                setUserPhone(event.target.value);
              }
              return onChange(...args);
            }}
            {...field}
          />
          <Divider orientation="vertical" sx={{ height: 32 }} />
          <label htmlFor="user_phone" form={formId}>
            <IconButton disabled>
              <PhoneIcon sx={{ color: (t) => t.palette.common.darkGrey }} />
            </IconButton>
          </label>
        </InputWrapper>
      )}
    />
  );
};

export const MemoizedLoginFormPhone = memo(LoginFormPhone);

export default MemoizedLoginFormPhone;
