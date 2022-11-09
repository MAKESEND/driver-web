import type { ToastAction } from 'types';

export const toastInitState: Omit<
  Extract<ToastAction, { type: 'show' }>,
  'type'
> & {
  show: boolean;
} = {
  show: false,
};

export const toastReducer = (
  state: typeof toastInitState,
  action: ToastAction
) => {
  switch (action.type) {
    case 'show':
      return {
        show: true,
        message: action.message,
        props: action?.props ?? {},
      };
    case 'hide':
      return { ...state, show: false };
    default:
      return state;
  }
};
