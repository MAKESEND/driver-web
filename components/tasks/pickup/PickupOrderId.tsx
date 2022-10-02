import type { Parcel, ImageType } from 'types';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { useRecoilState } from 'recoil';
import { pickupParcelState } from 'states';
import imgProcesser from 'utils/common/imgProcessor';
import { useUploadImage } from 'hooks/useMutateData';
import { Button, Divider } from '@mui/material';
import TaskMedia from 'components/tasks/TaskMedia';
import TopContainer from 'components/common/mobile/TopContainer';
import BottomContainer from 'components/common/mobile/BottomContainer';
import PickupParcelList from './orderid/PickupParcelList';
import TaskSelector from '../TaskSelector';

export interface PickupOrderIdProps {
  orderId: string;
  parcels?: Parcel[];
  float?: boolean;
  sticky?: boolean;
}

export const PickupOrderId: React.FC<PickupOrderIdProps> = ({
  orderId,
  parcels = [],
  float = false,
  sticky = false,
}) => {
  const { t } = useTranslation('tasks');
  const { mutate, isLoading } = useUploadImage();
  const syncedRef = useRef(false);
  const [images, setImages] = useState<File[]>([]);
  const [selectedParcels, setSelectedParcels] = useState<string[]>([]);
  const [filteredParcels, setFilteredParcels] = useState<Parcel[]>([]);
  const [pickupParcels, setPickupParcels] = useRecoilState(pickupParcelState);

  const onConfirm = async () => {
    try {
      const serializedImg = await imgProcesser(images);

      mutate({
        orderID: orderId,
        type: 'pickupPOD' as ImageType,
        PODImage: serializedImg,
      });
    } catch (error: any) {
      console.log("something went wrong 'onConfirm' pickup parcels");
      console.warn(error?.message ?? error);
    }
  };

  useEffect(() => {
    // reset local states
    return () => {
      syncedRef.current = false;
      setImages([]);
      setSelectedParcels([]);
    };
  }, []);

  useEffect(() => {
    setFilteredParcels(parcels);
    return () => setFilteredParcels([]);
  }, [parcels]);

  useEffect(() => {
    // sync local state to recoil
    if (syncedRef.current) {
      setPickupParcels((val) => ({ ...val, selectedParcels }));
    }
  }, [selectedParcels, setPickupParcels]);

  useEffect(() => {
    // sync recoil to local state
    if (!syncedRef.current) {
      orderId === pickupParcels.orderId
        ? setSelectedParcels(pickupParcels.selectedParcels)
        : setPickupParcels({ orderId, selectedParcels });

      syncedRef.current = true;
    }
  }, [pickupParcels, selectedParcels, setPickupParcels, orderId]);

  return (
    <>
      <TopContainer sticky={sticky}>
        <TaskMedia images={images} setImages={setImages} />
        <TaskSelector
          href="/scanner?type=pickup"
          parcels={parcels}
          selectedParcels={selectedParcels}
          setSelectedParcels={setSelectedParcels}
          filteredParcels={filteredParcels}
          setFilteredParcels={setFilteredParcels}
        />
      </TopContainer>
      <Divider />
      <PickupParcelList
        parcels={filteredParcels}
        selectedParcels={selectedParcels}
        setSelectedParcels={setSelectedParcels}
      />
      <BottomContainer float={float}>
        <Button
          variant="contained"
          disabled={isLoading}
          onClick={() => onConfirm()}
          sx={{
            width: '100%',
            maxWidth: (t) => t.spacing(40),
          }}
        >
          {t('btn.confirm')}&nbsp;
          {`(${selectedParcels.length}/${parcels.length})`}
        </Button>
      </BottomContainer>
    </>
  );
};

export default PickupOrderId;
