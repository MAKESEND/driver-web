import type { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { selectedBranchState } from 'states';
import { useRecoilState } from 'recoil';
import { Select, MenuItem, Typography } from '@mui/material';

export interface BranchSelectProps {
  isMobile?: boolean;
}

export const BranchSelect: FC<BranchSelectProps> = ({ isMobile = true }) => {
  const { t } = useTranslation('common');
  const [selectedBranch, setSelectedBranch] =
    useRecoilState(selectedBranchState);

  return (
    <Select
      onChange={(e) => setSelectedBranch(e.target.value as string)}
      value={selectedBranch}
      // label={<Typography>{t('sideNav.select.hint')}</Typography>}
      size="small"
      sx={{ minWidth: '10rem', ...(isMobile && { marginX: '1rem' }) }}
    ></Select>
  );
};

export default BranchSelect;
