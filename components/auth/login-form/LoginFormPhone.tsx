import type { LoginFormComponentProps } from '../LoginForm';
import { memo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { InputWrapper } from './InputWrapper';
import { Divider, IconButton, InputBase } from '@mui/material';

import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
const PhoneIcon = dynamic(
  () => import('@mui/icons-material/LocalPhoneOutlined')
);

export const LoginFormPhone: React.FC<LoginFormComponentProps> = ({
  formId,
}) => {
  const { t } = useTranslation('common');
  const { control } = useFormContext();

  return (
    <Controller
      name="phone"
      control={control}
      rules={{ required: true, pattern: /^0\d{9}$/g }}
      defaultValue=""
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
            onChange={onChange}
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
