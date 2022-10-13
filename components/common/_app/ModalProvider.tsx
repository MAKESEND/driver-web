import type { Action, ModalType } from 'types';
import { useReducer, createContext } from 'react';
import { initState, reducer } from 'components/common/modal/reducer';
import { Modal } from '@mui/material';
import ConfirmModal from 'components/common/modal/confirm-modal/ConfirmModal';

export const ModalContext = createContext<
  [typeof initState, React.Dispatch<Action>] | null
>(null);

const MODAL: {
  [key in ModalType]?: React.FC<any>;
} = {
  CONFIRM: ConfirmModal,
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const { props, modalType } = state;
  const ModalComponent = modalType ? MODAL[modalType] ?? null : null;

  return (
    <ModalContext.Provider value={[state, dispatch]}>
      {state.show && ModalComponent && (
        <Modal open={state.open}>
          <ModalComponent {...props} />
        </Modal>
      )}
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
