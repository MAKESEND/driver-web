import { selectedBranchState } from 'states';
import { useRecoilState } from 'recoil';
import { Select } from '@mui/material';

export interface BranchSelectProps {
  isMobile?: boolean;
}

export const BranchSelect: React.FC<BranchSelectProps> = ({
  isMobile = true,
}) => {
  const [selectedBranch, setSelectedBranch] =
    useRecoilState(selectedBranchState);

  return (
    <Select
      onChange={(e) => setSelectedBranch(e.target.value as string)}
      value={selectedBranch}
      size="small"
      sx={{ minWidth: '10rem', ...(isMobile && { marginX: '1rem' }) }}
    ></Select>
  );
};

export default BranchSelect;
