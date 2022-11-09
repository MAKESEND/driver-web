import type { ToastAction } from 'types';
import { useReducer, createContext } from 'react';
import { toastInitState, toastReducer } from 'components/common/toast/reducer';
import { Alert, AlertTitle, Collapse } from '@mui/material';

export const ToastContext = createContext<
  [typeof toastInitState, React.Dispatch<ToastAction>] | null
>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(toastReducer, toastInitState);
  const { message, title, props } = state;

  return (
    <ToastContext.Provider value={[state, dispatch]}>
      <Collapse
        in={state.show}
        sx={{
          position: 'fixed',
          top: 20,
          zIndex: (t) => t.zIndex.drawer + 1,
        }}
      >
        <Alert {...props}>
          {title && <AlertTitle>{title}</AlertTitle>}
          {message}
        </Alert>
      </Collapse>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
