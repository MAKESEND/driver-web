export type TModelProps = {
  title: string;
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
};

export type ModalProps = {
  CONFIRM: TModelProps;
  ALERT: Omit<TModelProps, 'onConfirm' | 'confirmText'>;
};

export type ModalType = keyof ModalProps;

export type ConfirmModalProps = ModalProps[ModalType.CONFIRM];

export interface ShowAction<T extends ModalType> {
  type: 'open';
  handleClose: () => void;
  props?: ModalProps[T];
  modalType: T;
}

export type HideAction = {
  type: 'close';
  handleClose?: never;
};

export type Action = ShowAction | HideAction;
