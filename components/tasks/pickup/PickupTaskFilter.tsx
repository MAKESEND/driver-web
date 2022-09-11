import type { Dispatch, FC, SetStateAction } from 'react';
import type { PickupTask } from 'types';
import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRecoilState } from 'recoil';
import { pickupRoundState } from 'states';
import { rounds } from 'utils/constants/delivery';
import { Box, Button, TextField, Menu } from '@mui/material';
import FilterOptions from 'components/FilterOptions';

import dynamic from 'next/dynamic';
const FilterIcon = dynamic(
  () => import('@mui/icons-material/FilterAltOutlined')
);
const QrCodeScannerIcon = dynamic(
  () => import('@mui/icons-material/QrCodeScanner')
);

interface PickupTaskFilterProps {
  pickupTasks?: PickupTask[];
  setter?: Dispatch<SetStateAction<PickupTask[]>>;
}

export const PickupTaskFilter: FC<PickupTaskFilterProps> = ({
  pickupTasks = [],
  setter = () => console.warn('no setter given to PickupTaskFilter'),
}) => {
  const { t } = useTranslation('tasks');
  const [selectedRounds, setSelectedRounds] = useRecoilState(pickupRoundState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box sx={{ display: 'flex', gap: '1rem', width: '100%' }}>
      <TextField
        id="parcel-filter"
        label={t('label.searchParcel')}
        variant="outlined"
        size="small"
        sx={{ flexGrow: 1 }}
      />
      <Button
        onClick={handleClick}
        variant="outlined"
        size="small"
        sx={{ minWidth: '1rem' }}
      >
        <FilterIcon />
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {rounds.map((round) => (
          <FilterOptions.Round
            key={round}
            option={round}
            selectedRounds={selectedRounds}
            setSelectedRounds={setSelectedRounds}
          />
        ))}
      </Menu>
      <Link href="/scanner?type=pickup" passHref>
        <Button variant="outlined" size="small" sx={{ minWidth: '1rem' }}>
          <QrCodeScannerIcon />
        </Button>
      </Link>
    </Box>
  );
};

export default PickupTaskFilter;
