import type {
  DrawerProps,
  ModalProps,
  PaperProps,
  SxProps,
  Theme,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useWindowSize } from 'react-use';
import { Box, styled, SwipeableDrawer, Typography } from '@mui/material';

const Puller = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 8,
  width: 30,
  height: 6,
  backgroundColor: theme.palette.common.lightGrey,
  borderRadius: 3,
  left: 'calc(50% - 15px)',
}));

export interface SideDrawerProps {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  anchor?: DrawerProps['anchor'];
  children?: React.ReactNode;
  modalProps?: ModalProps;
  paperProps?: PaperProps;
  drawerPaperSx?: SxProps<Theme>;
  swipeAreaWidth?: number;
  pullerSx?: SxProps<Theme>;
  pullerHint?: string;
  bodySx?: SxProps<Theme>;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  open = false,
  setOpen = () => console.warn('no setOpen given SideDrawer'),
  anchor = 'bottom',
  children,
  modalProps,
  paperProps,
  swipeAreaWidth = 56,
  drawerPaperSx,
  pullerSx,
  pullerHint,
  bodySx,
}) => {
  const { width } = useWindowSize();
  const { t } = useTranslation('scanner');

  // only show in mobile-size screen
  if (width > 900) return null;

  return (
    <SwipeableDrawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      anchor={anchor}
      disableBackdropTransition
      swipeAreaWidth={swipeAreaWidth}
      disableSwipeToOpen={false}
      ModalProps={{ keepMounted: true, ...modalProps }}
      PaperProps={{
        sx: {
          marginX: 'auto',
          overflowY: 'visible',
          ...drawerPaperSx,
        },
        ...paperProps,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -swipeAreaWidth, // should be negative to move up
          height: swipeAreaWidth,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          border: (t) => `1px solid ${t.palette.common.lightGrey}`,
          visibility: 'visible',
          left: 0,
          right: 0,
          backgroundColor: (t) => t.palette.common.white,
          ...pullerSx,
        }}
      >
        <Puller />
        <Typography
          variant="secondary"
          sx={{
            p: 2,
            pb: 0.5,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          {pullerHint || t('btn.swipeUp')}
        </Typography>
      </Box>
      <Box sx={{ p: 2, ...bodySx }}>{children}</Box>
    </SwipeableDrawer>
  );
};

export default SideDrawer;
