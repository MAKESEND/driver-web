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

interface ModalShowAction {
  type: 'show';
  handleClose: () => void;
  props?: ModalProps[keyof ModalProps];
  modalType: ModalType;
}

type ModalHideAction = {
  type: 'hide';
  handleClose?: never;
};

export type ModalAction = ModalShowAction | ModalHideAction;
