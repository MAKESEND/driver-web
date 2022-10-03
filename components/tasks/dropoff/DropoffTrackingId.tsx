import type { ParcelByTrackingId } from 'types';
import type SignatureCanvas from 'react-signature-canvas';
import { useState, useEffect, useRef } from 'react';
import TaskMedia from 'components/tasks/TaskMedia';
import TaskSignature from 'components/tasks/TaskSignature';
import TopContainer from 'components/common/mobile/TopContainer';
import DropoffTask from './DropoffTask';
import DropoffConfirmButton from './trackingid/DropoffConfirmButton';

export interface DropoffTrackingIdProps {
  parcel?: ParcelByTrackingId;
  sticky?: boolean;
  float?: boolean;
}

export const DropoffTrackingId: React.FC<DropoffTrackingIdProps> = ({
  parcel,
  sticky = false,
  float = false,
}) => {
  const isDisabled = parcel?.status === 'Delivered';
  const signPadRef = useRef<SignatureCanvas | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [errorSignPad, setErrorSignPad] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setImages([]);
      setErrorSignPad(false);
    };
  }, []);

  return (
    <>
      <TopContainer sticky={sticky}>
        <TaskMedia
          images={images}
          setImages={setImages}
          defaultExpanded
          disabled={isDisabled}
        />
        <TaskSignature
          ref={signPadRef}
          errorSignPad={errorSignPad}
          setErrorSignPad={setErrorSignPad}
          disabled={isDisabled}
        />
        <DropoffTask parcel={parcel} />
      </TopContainer>
      <DropoffConfirmButton
        trackingId={parcel?.trackingID as string}
        float={float}
        setErrorSignPad={setErrorSignPad}
        signPad={signPadRef.current}
        disabled={isDisabled}
        images={images}
      />
    </>
  );
};

export default DropoffTrackingId;
