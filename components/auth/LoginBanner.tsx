import Image from 'components/common/StyledImage';
import { useState, useRef, useLayoutEffect } from 'react';
import { useWindowSize } from 'react-use';
import { Box } from '@mui/material';

export const LoginBanner: React.FC = () => {
  const imgContainerRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number>(0);
  const { width } = useWindowSize();

  useLayoutEffect(() => {
    setHeight((imgContainerRef.current?.clientWidth ?? 0) / 2);

    return () => setHeight(0);
  }, [width]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height,
      }}
      ref={imgContainerRef}
    >
      <Image
        priority
        src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/bxbwwosk6mzkk1vdukcs"
        alt="makesend_logo"
        layout="fill"
      />
    </Box>
  );
};

export default LoginBanner;
