import type { ModalType, ShowAction } from 'types';
import { useContext } from 'react';
import { ModalContext } from 'components/common/_app/ModalProvider';

type TProps = Omit<ShowAction<ModalType>, 'type'>;

export const useModal = (): [(props: TProps) => void, () => void] => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal should only be used in ModalProvider');
  }

  const [_state, dispatch] = context;

  const show = (props: TProps) => dispatch({ ...props, type: 'show' });
  const hide = () => dispatch({ type: 'hide' });

  return [show, hide];
};

export default useModal;
