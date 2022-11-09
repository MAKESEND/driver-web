import type { ModalType, ModalAction, ModalProps } from 'types';

export const modalInitState: Omit<ModalAction, 'type'> & {
  show: boolean;
  props?: ModalProps[keyof ModalProps];
  modalType?: ModalType;
} = {
  show: false,
};

export const modalReducer = (
  state: typeof modalInitState,
  action: ModalAction
): typeof modalInitState => {
  switch (action.type) {
    case 'show':
      return { show: true, ...action };
    case 'hide':
      return { ...state, show: false };
    default:
      return state;
  }
};
