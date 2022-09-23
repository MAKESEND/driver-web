import type { FC } from 'react';
import type { Parcel } from 'types';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { useRecoilState } from 'recoil';
import { pickupParcelState } from 'states';
import imageCompression from 'browser-image-compression';
import { blobToBase64 } from 'utils/common/blobToBase64';
import { Box, Button, Divider } from '@mui/material';
import { TaskMedia } from 'components/tasks/TaskMedia';
import PickupParcelList from './orderid/PickupParcelList';
import { MobileContainer } from 'components/common/mobile/MobileContainer';
import PickupParcelSearch from './orderid/PickupParcelSearch';

export interface PickupOrderIdProps {
  orderId: string;
  parcels?: Parcel[];
  float?: boolean;
  sticky?: boolean;
}

export const PickupOrderId: FC<PickupOrderIdProps> = ({
  orderId,
  parcels = [],
  float = false,
  sticky = false,
}) => {
  const bottomPadding = '1rem';
  const imgZipOptions = {
    maxSizeMB: 1,
    // maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  const { t } = useTranslation('tasks');
  const syncedRef = useRef(false);
  const [images, setImages] = useState<File[]>([]);
  const [selectedParcels, setSelectedParcels] = useState<string[]>([]);
  const [filteredParcels, setFilteredParcels] = useState<Parcel[]>([]);
  const [pickupParcels, setPickupParcels] = useRecoilState(pickupParcelState);

  const onConfirm = async () => {
    try {
      const serializedImg = await imgProcesser(images, imgZipOptions);
      console.log(serializedImg);
    } catch (error: any) {
      console.log('something went wrong when confirm pickup parcels');
      console.warn(error?.message ?? error);
    }
  };

  useEffect(() => {
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
    if (syncedRef.current) {
      setPickupParcels((val) => ({ ...val, selectedParcels }));
    }
  }, [selectedParcels, setPickupParcels]);

  useEffect(() => {
    if (!syncedRef.current) {
      if (orderId === pickupParcels.orderId) {
        setSelectedParcels(pickupParcels.selectedParcels);
      } else {
        setPickupParcels({ orderId, selectedParcels });
      }
      syncedRef.current = true;
    }
  }, [pickupParcels, selectedParcels, setPickupParcels, orderId]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: (t) => t.spacing(2),
          paddingY: (t) => t.spacing(1),
          ...(sticky && {
            position: 'sticky',
            top: 0,
            zIndex: (t) => t.zIndex.drawer,
            backgroundColor: (t) => t.palette.white.main,
          }),
        }}
      >
        <TaskMedia images={images} setImages={setImages} />
        <PickupParcelSearch
          parcels={parcels}
          selectedParcels={selectedParcels}
          setSelectedParcels={setSelectedParcels}
          filteredParcels={filteredParcels}
          setFilteredParcels={setFilteredParcels}
        />
      </Box>
      <Divider />
      <PickupParcelList
        parcels={filteredParcels}
        selectedParcels={selectedParcels}
        setSelectedParcels={setSelectedParcels}
      />
      <MobileContainer
        sx={{
          paddingY: bottomPadding,
          ...(float && {
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translate(-50%)',
            paddingX: (t) => t.spacing(2),
          }),
        }}
      >
        <Button
          variant="contained"
          sx={{
            width: '100%',
            maxWidth: (t) => t.spacing(40),
          }}
          onClick={() => onConfirm()}
        >
          {t('btn.confirm')}&nbsp;
          {`(${selectedParcels.length}/${parcels.length})`}
        </Button>
      </MobileContainer>
    </>
  );
};

export default PickupOrderId;

type compressionArgs = Parameters<typeof imageCompression>;

const imgProcesser = async (
  images: File[],
  imgZipOptions: compressionArgs[1]
) => {
  const imgCompression = images.map((img) =>
    imageCompression(img, imgZipOptions)
  );
  const compressedImgs = await Promise.all(imgCompression);
  const imgSerializing = compressedImgs.map((img) =>
    blobToBase64(img, img.type)
  );
  const serializedImg = await Promise.all(imgSerializing);
  return serializedImg;
};
