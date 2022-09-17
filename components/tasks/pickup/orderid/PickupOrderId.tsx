import type { FC } from 'react';
import type { Parcel } from 'types';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { pickupMediaList, defaultMedia } from 'utils/constants/taskMedia';
import { Button } from '@mui/material';
import { TaskMedia } from 'components/tasks/TaskMedia';
import PickupParcelList from './PickupParcelList';
import { MobileContainer } from 'components/common/mobile/MobileContainer';

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
  const [media, setMedia] = useState(defaultMedia);
  const [selectedParcels, setSelectedParcels] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      setMedia(defaultMedia);
      setSelectedParcels([]);
    };
  }, []);

  const onConfirm = () => {
    console.log('confirm');
    console.log(selectedParcels, media);
  };

  return (
    <>
      <TaskMedia media={media} setter={setMedia} mediaList={pickupMediaList} />
      <PickupParcelList
        parcels={parcels}
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
          onClick={onConfirm}
        >
          {t('btn.confirm')}
        </Button>
      </MobileContainer>
    </>
  );
};

export default PickupOrderId;
