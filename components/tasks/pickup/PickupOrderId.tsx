import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useGetParcelsByOrderId } from 'hooks/useQueryData';
import { pickupMediaList, defaultMedia } from 'utils/constants/taskMedia';
import { Button, Box } from '@mui/material';
import { MobileContainer } from 'components/common/mobile/MobileContainer';
import { Loader } from 'components/common/loader/Loader';
import TaskMedia from '../TaskMedia';
import PickupParcelList from './PickupParcelList';

export interface PickupOrderIdProps {
  orderId: string;
}

const bottomPadding = '1rem';

export const PickupOrderId: FC<PickupOrderIdProps> = ({ orderId }) => {
  const { t } = useTranslation('tasks');
  const { data: parcels, isLoading } = useGetParcelsByOrderId(orderId);
  const [media, setMedia] = useState(defaultMedia);
  const [selectedParcels, setSelectedParcels] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      setMedia(defaultMedia);
    };
  }, []);

  const onConfirm = () => {
    console.log('confirm');
    console.log(selectedParcels, media);
  };

  return (
    <MobileContainer
      sx={{
        position: 'relative',
        margin: '0 auto',
        height: '100%',
        padding: (t) => t.spacing(3),
        paddingBottom: `calc(36.5px + ${bottomPadding} * 2)`,
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loader />
        </Box>
      ) : (
        <>
          <PickupParcelList
            parcels={parcels}
            selectedParcels={selectedParcels}
            setSelectedParcels={setSelectedParcels}
          />
          <TaskMedia
            media={media}
            setter={setMedia}
            mediaList={pickupMediaList}
          />
          <MobileContainer
            sx={{
              position: 'fixed',
              bottom: 0,
              left: '50%',
              transform: 'translate(-50%)',
              paddingY: bottomPadding,
            }}
          >
            <Button
              variant="contained"
              sx={{ width: '100%', maxWidth: '20rem' }}
              onClick={onConfirm}
            >
              {t('btn.confirm')}
            </Button>
          </MobileContainer>
        </>
      )}
    </MobileContainer>
  );
};

export default PickupOrderId;
