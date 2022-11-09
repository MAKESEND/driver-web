import { useState, useEffect } from 'react';

export const useTouchScreen = () => {
  const [isTouchScreen, setIsTouchScreen] = useState(false);

  useEffect(() => {
    if (
      globalThis?.window &&
      globalThis.window.hasOwnProperty('ontouchstart')
    ) {
      setIsTouchScreen(true);
    }
  }, []);

  return isTouchScreen;
};

export default useTouchScreen;
