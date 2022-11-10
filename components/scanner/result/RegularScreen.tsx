import type { ScannerResultProps } from 'components/scanner/result/ScannerResult';
import { useCallback, useEffect, useRef } from 'react';
import { useModal } from 'hooks/useModal';
import { useScannerResult } from 'hooks/useScannerResult';
import { Box, Button } from '@mui/material';

import dynamic from 'next/dynamic';
const SingleResult = dynamic(
  () => import('components/scanner/result/SingleResult')
);

export const RegularScreen: React.FC<ScannerResultProps> = ({
  open = false,
  setOpen = () => console.warn('no setOpen given RegularScreen'),
  scannerConfig,
}) => {
  const modalOpenRef = useRef<boolean>(false);
  const [showModal, hideModal] = useModal();
  const scannerResultRef = useScannerResult();

  const closeModal = useCallback(() => {
    hideModal();
    setOpen(false);
    modalOpenRef.current = false;
  }, [hideModal, setOpen]);

  const showResult = useCallback(() => {
    showModal({
      modalType: 'CONFIRM',
      props: {
        title: 'Scanned Result',
        bodyEl: (
          <SingleResult
            scannedResult={scannerResultRef.current}
            task={scannerConfig?.task}
          />
        ),
        onConfirm: () => {
          closeModal();
        },
        onClose: () => {
          closeModal();
        },
      },
    });
  }, [scannerResultRef, scannerConfig?.task, showModal, closeModal]);

  useEffect(() => {
    if (open && !modalOpenRef.current) {
      showResult();
      modalOpenRef.current = true;
    }
  }, [open, showResult]);

  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        bottom: 0,
        px: 2,
        pb: 2,
        width: '100%',
        maxWidth: (theme) => theme.layout.size.portMaxWidth,
      }}
    >
      <Button
        variant="contained"
        onClick={showResult}
        sx={{
          width: '100%',
          marginX: 'auto',
          maxWidth: (theme) => theme.layout.size.btnMaxWidth,
        }}
      >
        Result
      </Button>
    </Box>
  );
};

export default RegularScreen;
