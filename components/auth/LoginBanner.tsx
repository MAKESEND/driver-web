import { useState, useRef, useLayoutEffect } from 'react';
import { useWindowSize } from 'react-use';
import Image from 'components/common/StyledImage';
import { Box } from '@mui/material';

export const LoginBanner: React.FC = () => {
  const { width } = useWindowSize();

  const [height, setHeight] = useState<number>(0);
  const imgContainerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    setHeight((imgContainerRef.current?.clientWidth ?? 0) / 3.9125);
  }, [width]);

  if (typeof globalThis.window === 'undefined') return null;

  return (
    <Box p={2}>
      <Box
        ref={imgContainerRef}
        sx={{
          position: 'relative',
          width: '100%',
          height,
        }}
      >
        <Image
          priority
          src="/imgs/ms_logo/makesend_logo.png"
          alt="makesend_logo"
          layout="fill"
        />
      </Box>
    </Box>
  );
};

export default LoginBanner;
