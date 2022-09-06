import type { ReactNode } from 'react';
import dynamic from 'next/dynamic';
const ChangeCircleIcon = dynamic(
  () => import('@mui/icons-material/ChangeCircleOutlined')
);
const WarehouseIcon = dynamic(
  () => import('@mui/icons-material/WarehouseOutlined')
);
const QrCodeScannerIcon = dynamic(
  () => import('@mui/icons-material/QrCodeScannerOutlined')
);
const AnalyticsIcon = dynamic(
  () => import('@mui/icons-material/AnalyticsOutlined')
);
const MapIcon = dynamic(() => import('@mui/icons-material/MapOutlined'));
const BugReportIcon = dynamic(() => import('@mui/icons-material/BugReport'));
const AssignmentIcon = dynamic(
  () => import('@mui/icons-material/AssignmentOutlined')
);
const LocalShippingIcon = dynamic(
  () => import('@mui/icons-material/LocalShippingOutlined')
);

export const LinkIcons: { [key: string]: ReactNode } = {
  dashboard: <AnalyticsIcon />,
  warehouse: <WarehouseIcon />,
  sorting: <ChangeCircleIcon />,
  map: <MapIcon />,
  scanner: <QrCodeScannerIcon />,
  components: <BugReportIcon />,
  tasks: <AssignmentIcon />,
  pickup: <WarehouseIcon />,
  dropoff: <LocalShippingIcon />,
};

export default LinkIcons;
