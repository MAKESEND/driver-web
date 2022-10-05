import { styled } from '@mui/material';
import Inventory2Outlined from '@mui/icons-material/Inventory2Outlined';

export const InventoryIcon = styled(Inventory2Outlined)(({ theme }) => ({
  color: theme.palette.common.darkGrey,
}));

export default InventoryIcon;
