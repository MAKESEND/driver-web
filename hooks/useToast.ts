import type { CustomAlertProps } from 'types';
import { useRef, useCallback, useContext } from 'react';
import { ToastContext } from 'components/_app/ToastProvider';

export const useToast = (timeout = 3000) => {
  const context = useContext(ToastContext);
  const timerRef = useRef<NodeJS.Timeout>();

  if (!context) {
    throw new Error('useToast should only be used in ToastProvider');
  }

  const [, dispatch] = context;

  const show = useCallback(
    (message: string, props?: CustomAlertProps) => {
      clearTimeout(timerRef.current);

      dispatch({ type: 'show', message, props });

      if (props?.autoHide || typeof props?.autoHide === 'undefined') {
        timerRef.current = setTimeout(() => {
          dispatch({ type: 'hide' });
        }, timeout);
      }
    },
    [dispatch, timeout]
  );

  const hide = () => dispatch({ type: 'hide' });

  return [show, hide];
};

export default useToast;
