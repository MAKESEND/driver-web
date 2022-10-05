import { FC, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { pincodeState } from 'states';
import { Backdrop } from '@mui/material';
import PincodePanel from './PincodePanel';

export const Pincode: FC = () => {
  const [open, setOpen] = useRecoilState(pincodeState);

  useEffect(() => {
    return () => {
      setOpen(false);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backdropFilter: 'blur(10px)',
      }}
    >
      <PincodePanel />
    </Backdrop>
  );
};

export default Pincode;
