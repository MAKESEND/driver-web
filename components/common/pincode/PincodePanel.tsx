import { FC, useEffect, useRef } from 'react';
import { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { pincodeAuthState, pincodeState } from 'states';
import { Box } from '@mui/material';
import PincodeDots from './PincodeDots';
import PincodeButtons from './PincodeButtons';

import dynamic from 'next/dynamic';
const LockIcon = dynamic(() => import('@mui/icons-material/Lock'), {
  ssr: false,
});

const maxWidth = '500px';

export const PincodePanel: FC = () => {
  const [pincode, setPincode] = useState<string[]>([]);
  const [digits, setDigits] = useState<number>(4);
  const pincodeRef = useRef(pincode);
  const [isError, setIsError] = useState<boolean>(false);
  const pincodeAuth = useRecoilValue(pincodeAuthState);
  const [open, setOpen] = useRecoilState(pincodeState);

  useEffect(() => {
    pincodeRef.current = pincode;
    if (isError && pincode.length) {
      setIsError(false);
    }

    if (pincode.length === 4) {
      const code = pincode.join('');
      if (code !== '0000') {
        setIsError(true);
        setTimeout(() => {
          setPincode([]);
        }, 1000);
      } else {
        pincodeAuth();
        setOpen(false);
        setPincode([]);
        pincodeRef.current = [];
        setIsError(false);
        setDigits(4);
      }
    }
  }, [pincode, isError, pincodeAuth, setOpen]);

  useEffect(() => {
    setPincode([]);
  }, [open]);

  useEffect(() => {
    return () => {
      setPincode([]);
      pincodeRef.current = [];
      setIsError(false);
      setDigits(4);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Box width="100%" height="100%" sx={{ maxWidth, padding: '2rem' }}>
      <LockIcon sx={{ color: (theme) => theme.palette.white.main }} />
      <PincodeDots pincode={pincode} isError={isError} digits={digits} />
      {open && (
        <PincodeButtons
          setPincode={setPincode}
          pincodeRef={pincodeRef}
          digits={digits}
        />
      )}
    </Box>
  );
};

export default PincodePanel;
