import type { ImageType } from 'types';
import type SignatureCanvas from 'react-signature-canvas';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import imgProcesser from 'utils/common/imgProcessor';
import { useUploadImage } from 'hooks/useMutateData';
import BottomContainer from 'components/common/mobile/BottomContainer';
import { Button } from '@mui/material';

enum UnhandledError {
  no_sign = 'no_sign',
  no_pod = 'no_pod',
}

const unhandledError: { [key in UnhandledError]: string } = {
  no_sign: 'no_sign',
  no_pod: 'no_pod',
};

export interface DropoffConfirmButtonProps {
  trackingId: string;
  images?: File[];
  disabled?: boolean;
  float?: boolean;
  signPad: SignatureCanvas | null;
  setErrorSignPad?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DropoffConfirmButton: React.FC<DropoffConfirmButtonProps> = ({
  trackingId,
  images = [],
  disabled = false,
  float = false,
  signPad = null,
  setErrorSignPad = () =>
    console.warn('no setErrorSignPad given to DropoffConfirmButton'),
}) => {
  const { push } = useRouter();
  const { t } = useTranslation('tasks');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const {
    isLoading: uploadingPodImg,
    mutate: mutatePodImg,
    isSuccess: podUploaded,
  } = useUploadImage();

  const {
    isLoading: uploadingSignImg,
    mutate: mutateSignImg,
    isSuccess: signUploaded,
  } = useUploadImage();

  useEffect(() => {
    return () => {
      setIsLoading(false);
      setIsDisabled(false);
    };
  }, []);

  useEffect(() => {
    setIsDisabled(uploadingPodImg || uploadingSignImg || isLoading || disabled);
  }, [uploadingPodImg, uploadingSignImg, isLoading, disabled]);

  useEffect(() => {
    if (podUploaded && signUploaded) {
      push('/tasks/dropoff');
    }
  }, [push, podUploaded, signUploaded]);

  const onConfirm = async () => {
    setIsLoading(true);
    try {
      const isEmpty = signPad?.isEmpty();
      const base64SignImg = signPad?.toDataURL();
      const serializedImg = await imgProcesser(images);

      if (isEmpty) {
        setErrorSignPad(isEmpty);
        throw new Error('no_sign');
      }

      if (!serializedImg.length) {
        throw new Error('no_pod');
      }

      mutatePodImg({
        trackingID: trackingId,
        type: 'dropPOD' as ImageType,
        PODImage: serializedImg,
      });

      mutateSignImg({
        trackingID: trackingId,
        type: 'signature' as ImageType,
        PODImage: [base64SignImg as string],
      });
    } catch (error: any) {
      if (!unhandledError[error?.message as UnhandledError]) {
        console.log("something went wrong 'onConfirm' pickup parcels");
        console.warn(error?.message ?? error);
      }
    }

    setIsLoading(false);
  };

  if (disabled || !trackingId) return null;

  return (
    <BottomContainer float={float}>
      <Button
        variant="contained"
        disabled={isDisabled}
        onClick={() => onConfirm()}
        sx={{
          width: '100%',
          maxWidth: (t) => t.spacing(40),
        }}
      >
        {t('btn.confirm')}
      </Button>
    </BottomContainer>
  );
};

export default DropoffConfirmButton;
