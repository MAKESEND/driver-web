import type { DropoffTask } from 'types';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import {
  Box,
  IconButton,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  styled,
} from '@mui/material';

import dynamic from 'next/dynamic';
const LocationOnIcon = dynamic(
  () => import('@mui/icons-material/LocationOnOutlined'),
  { ssr: false }
);
const ContentCopyIcon = dynamic(
  () => import('@mui/icons-material/ContentCopyOutlined'),
  { ssr: false }
);
const LocalPhoneIcon = dynamic(
  () => import('@mui/icons-material/LocalPhoneOutlined'),
  { ssr: false }
);

const Row = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export interface DropoffTaskCardProps {
  dropoffTask: DropoffTask;
}

export const DropoffTaskCard: React.FC<DropoffTaskCardProps> = ({
  dropoffTask,
}) => {
  const {
    sequence,
    trackingID,
    status,
    receiverName,
    receiverNo,
    dropAddress,
    dropDistrict,
    dropProvince,
    dropPostcode,
  } = dropoffTask;
  const { t } = useTranslation('tasks');

  return (
    <Card>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: (t) => t.spacing(1),
        }}
      >
        <Row>
          <Typography variant="h3" sx={{ textAlign: 'start' }}>
            {sequence ? `${sequence}.` : ''} {trackingID}
          </Typography>
          <Chip label={status} />
        </Row>
        <Typography sx={{ textAlign: 'start' }}>{receiverName}</Typography>
        <Row>
          <Typography sx={{ textAlign: 'start' }}>{receiverNo}</Typography>
          <a href={`tel:${receiverNo}`}>
            <IconButton>
              <LocalPhoneIcon />
            </IconButton>
          </a>
        </Row>
        <Row sx={{ flexDirection: 'row' }}>
          <Typography variant="secondary">{dropDistrict}</Typography>
          <Typography variant="secondary">{dropProvince}</Typography>
          <Typography variant="secondary">{dropPostcode}</Typography>
        </Row>
        <Row>
          <Typography variant="secondary" sx={{ textAlign: 'start' }}>
            {dropAddress}
          </Typography>
          <Box>
            <IconButton>
              <ContentCopyIcon />
            </IconButton>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURI(
                dropAddress
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <IconButton>
                <LocationOnIcon />
              </IconButton>
            </a>
          </Box>
        </Row>
      </CardContent>
      <CardActions sx={{ justifyContent: 'end' }}>
        <Link href={`/tasks/dropoff/${trackingID}`} passHref>
          <Button variant="outlined">{t('btn.details')}</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default DropoffTaskCard;
