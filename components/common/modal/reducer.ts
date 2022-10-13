import type { ModalType, Action, ModalProps } from 'types';

export const initState: Omit<Action, 'type'> & {
  show: boolean;
  props?: ModalProps[keyof ModalProps];
  modalType?: ModalType;
} = {
  show: false,
};

export const reducer = (
  state: typeof initState,
  action: Action
): typeof initState => {
  switch (action.type) {
    case 'show':
      return { show: true, ...action };
    case 'hide':
      return { ...state, show: false };
    default:
      return state;
  }
};
