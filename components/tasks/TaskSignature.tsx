import {
  forwardRef,
  useLayoutEffect,
  useRef,
  useState,
  useImperativeHandle,
} from 'react';
import ReactSignatureCanvas from 'react-signature-canvas';
import { useWindowSize } from 'react-use';
import { Box, IconButton, styled } from '@mui/material';
import { red } from '@mui/material/colors';

import dynamic from 'next/dynamic';
const HighlightOffIcon = dynamic(
  () => import('@mui/icons-material/HighlightOff'),
  { ssr: false }
);

const SignatureCanvas = styled(ReactSignatureCanvas)(() => ({
  width: '100%',
  height: '100%',
}));

export interface TaskSignatureProps {
  disabled?: boolean;
  errorSignPad?: boolean;
  setErrorSignPad?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TaskSignature = forwardRef<
  ReactSignatureCanvas,
  TaskSignatureProps
>(
  (
    {
      disabled = false,
      errorSignPad = false,
      setErrorSignPad = () =>
        console.warn('no setErrorSignPad given to TaskSignature'),
    },
    ref
  ) => {
    const { width } = useWindowSize();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const signPadRef = useRef<ReactSignatureCanvas | null>(null);
    const [canvasWidth, setCanvasWidth] = useState<number>(0);
    const [canvasHeight, setCanvasHeight] = useState<number>(0);

    useImperativeHandle(ref, () => signPadRef.current as ReactSignatureCanvas);

    useLayoutEffect(() => {
      setCanvasWidth(containerRef.current?.clientWidth ?? 0);
      setCanvasHeight(containerRef.current?.clientHeight ?? 0);

      return () => {
        setCanvasWidth(0);
        setCanvasHeight(0);
      };
    }, [width]);

    if (disabled) return null;

    return (
      <Box
        ref={containerRef}
        sx={{
          position: 'relative',
          width: '100%',
          height: (t) => t.spacing(20),
          border: '2px solid #ccc',
          borderColor: errorSignPad ? red['500'] : '#ccc',
        }}
      >
        <IconButton
          disabled={disabled}
          onClick={() => signPadRef.current?.clear()}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        >
          <HighlightOffIcon
            sx={{ color: errorSignPad ? red['500'] : 'inherit' }}
          />
        </IconButton>
        <SignatureCanvas
          ref={signPadRef}
          canvasProps={{
            width: canvasWidth,
            height: canvasHeight,
          }}
          onBegin={() => setErrorSignPad(false)}
        />
      </Box>
    );
  }
);

TaskSignature.displayName = 'TaskSignature';

export default TaskSignature;
