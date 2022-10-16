import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export const ReactPortal = ({
  children,
  wrapperId = 'portal',
}: {
  children: React.ReactNode;
  wrapperId?: string;
}) => {
  const [wrapperEl, setWrapperEl] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    setWrapperEl(document.getElementById(wrapperId));

    return () => {
      setWrapperEl(null);
    };
  }, [wrapperId]);

  if (typeof globalThis.window === 'undefined' || !wrapperEl) {
    return null;
  }

  return createPortal(children, wrapperEl);
};

export default ReactPortal;
