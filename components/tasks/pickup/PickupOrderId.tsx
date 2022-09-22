import type { FC } from 'react';
import type { Parcel } from 'types';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { useRecoilState } from 'recoil';
import { pickupParcelState } from 'states';
import { Box, Button, Divider } from '@mui/material';
import { TaskMedia } from 'components/tasks/TaskMedia';
import PickupParcelList from './orderid/PickupParcelList';
import { MobileContainer } from 'components/common/mobile/MobileContainer';
import PickupParcelSearch from './orderid/PickupParcelSearch';

export interface PickupOrderIdProps {
  parcels?: Parcel[];
  float?: boolean;
}

export const PickupOrderId: FC<PickupOrderIdProps> = ({
  parcels = [],
  float = false,
}) => {
  const bottomPadding = '1rem';
  const { t } = useTranslation('tasks');
  const syncedRef = useRef(false);
  const [media, setMedia] = useState<string[]>([]);
  const [selectedParcels, setSelectedParcels] = useState<string[]>([]);
  const [pickupParcels, setPickupParcels] = useRecoilState(pickupParcelState);
  const [filteredParcels, setFilteredParcels] = useState<Parcel[]>([]);

  useEffect(() => {
    return () => setMedia([]);
  }, []);

  useEffect(() => {
    setFilteredParcels(parcels);
    return () => setFilteredParcels([]);
  }, [parcels]);

  useEffect(() => {
    if (!syncedRef.current) {
      setSelectedParcels(pickupParcels);
      syncedRef.current = true;
    } else {
      setPickupParcels(selectedParcels);
    }
  }, [pickupParcels, selectedParcels, setPickupParcels]);

  const onConfirm = () => {
    console.log('confirm');
    console.log(selectedParcels, media);
  };

  return (
    <>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: (t) => t.zIndex.drawer,
          backgroundColor: (t) => t.palette.white.main,
          display: 'flex',
          flexDirection: 'column',
          gap: (t) => t.spacing(2),
          paddingY: (t) => t.spacing(1),
        }}
      >
        <TaskMedia media={media} setter={setMedia} />
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
          {t('btn.confirm')}
        </Button>
      </MobileContainer>
    </>
  );
};

export default PickupOrderId;
