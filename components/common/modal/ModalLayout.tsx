import React, { forwardRef } from 'react';
import { Stack } from '@mui/material';

export const ModalLayout: React.FC<{
  children?: React.ReactNode;
  ref?: React.Ref<unknown>;
}> = forwardRef(({ children }, ref) => {
  return (
    <Stack
      ref={ref}
      id="modal-layout"
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { sm: 280 },
        minWidth: 280,
        bgColor: (t) => t.palette.common.white,
        boxShadown: '0px 4x 12px rgba(0, 0, 0, 0.16)',
        borderRadius: 2,
        p: 3,
      }}
    >
      {children}
    </Stack>
  );
});

ModalLayout.displayName = 'ModalLayout';

export default ModalLayout;
