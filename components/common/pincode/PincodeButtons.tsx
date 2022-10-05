import type { Dispatch, FC, SetStateAction, MutableRefObject } from 'react';
import { useEffect, useMemo, memo } from 'react';
import { v4 } from 'uuid';
import {
  Box,
  Button as MuiButton,
  Typography as MuiTypography,
  IconButton as MuiIconButton,
  styled,
} from '@mui/material';

import dynamic from 'next/dynamic';
import { useWindowSize } from 'react-use';
const BackspaceIcon = dynamic(() => import('@mui/icons-material/Backspace'));
const PersonIcon = dynamic(() => import('@mui/icons-material/Person'));

const Button = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'minEdge',
})<{ minEdge?: number | string }>(({ minEdge }) => ({
  fontSize: '1.2rem',
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  width: minEdge + 'px',
  height: minEdge + 'px',
  minWidth: '3rem',
  minHeight: '3rem',
  maxWidth: '5rem',
  maxHeight: '5rem',
  borderRadius: '50%',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const IconButton = styled(MuiIconButton, {
  shouldForwardProp: (prop) => prop !== 'minEdge',
})<{ minEdge?: number | string }>(({ minEdge }) => ({
  width: minEdge + 'px',
  height: minEdge + 'px',
  minWidth: '3rem',
  minHeight: '3rem',
  maxWidth: '5rem',
  maxHeight: '5rem',
}));

const Typography = styled(MuiTypography)(({ theme }) => ({
  color: theme.palette.white.main,
  fontSize: '1.4rem',
}));

export interface PincodeButtonsProps {
  setPincode: Dispatch<SetStateAction<string[]>>;
  pincodeRef?: MutableRefObject<string[]>;
  numbers?: number[];
  digits?: number;
}

const Component: FC<PincodeButtonsProps> = ({
  setPincode,
  pincodeRef = { current: [] },
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9],
  digits = 4,
}) => {
  const { width, height } = useWindowSize();
  const size = useMemo(() => {
    const minEdge = Math.min(width, height);
    return minEdge / 5;
  }, [width, height]);

  const setPin = (num: number) => {
    if (pincodeRef.current.length < digits) {
      setPincode((list) => {
        if (list.length < digits) {
          return [...list, num.toString()];
        }
        return [...list];
      });
    }
  };

  const removePin = () =>
    setPincode((pincode) => {
      if (!pincode.length) {
        return pincode;
      }
      return pincode.slice(0, pincode.length - 1);
    });

  const keyDownHandler = (event: KeyboardEvent) => {
    if (pincodeRef.current.length < digits) {
      if (!Number.isNaN(parseInt(event.key))) {
        setPin(parseInt(event.key));
      }
    }

    if (event.key === 'Backspace') {
      removePin();
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', keyDownHandler);
    }

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(4, 1fr)',
        justifyItems: 'center',
        gap: '2rem',
        marginX: 'auto',
        marginTop: '2.5rem',
      }}
    >
      {numbers.map((num) => (
        <Button key={v4() + num} onClick={() => setPin(num)} minEdge={size}>
          <Typography>{num}</Typography>
        </Button>
      ))}
      <IconButton onClick={() => removePin()}>
        <BackspaceIcon sx={{ color: (theme) => theme.palette.white.main }} />
      </IconButton>
      <Button onClick={() => setPin(0)} minEdge={size}>
        <Typography>0</Typography>
      </Button>
      <IconButton>
        <PersonIcon sx={{ color: (theme) => theme.palette.white.main }} />
      </IconButton>
    </Box>
  );
};

export const PincodeButtons = memo(Component);
export default PincodeButtons;
