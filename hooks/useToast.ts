import type { CustomAlertProps } from 'types';
import { useState, useCallback, useContext } from 'react';
import { ToastContext } from 'components/common/_app/ToastProvider';

export const useToast = () => {
  const context = useContext(ToastContext);
  const [timeout, setNewTimeout] = useState<NodeJS.Timeout | null>(null);

  if (!context) {
    throw new Error('useToast should only be used in ToastProvider');
  }

  const [, dispatch] = context;

  const show = useCallback(
    (message: string, props?: CustomAlertProps) => {
      if (!dispatch) return;

      if (timeout) {
        clearTimeout(timeout);
      }

      dispatch({ type: 'show', message, props });

      if (props?.autoHide || typeof props?.autoHide === 'undefined') {
        const currentTimeout = setTimeout(() => {
          dispatch({ type: 'hide' });
        }, 3000);

        setNewTimeout(currentTimeout);
      }
    },
    [dispatch, timeout]
  );

  const hide = () => dispatch({ type: 'hide' });

  return [show, hide];
};

export default useToast;
