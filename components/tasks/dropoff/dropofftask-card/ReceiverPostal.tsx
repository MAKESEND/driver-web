import { Typography } from '@mui/material';
import Row from 'components/common/Row';

export interface ReceiverPostalProps {
  dropDistrict: string;
  dropProvince: string;
  dropPostcode: string;
}

export const ReceiverPostal: React.FC<ReceiverPostalProps> = ({
  dropDistrict,
  dropProvince,
  dropPostcode,
}) => {
  return (
    <Row sx={{ flexDirection: 'row' }}>
      <Typography variant="secondary">{dropDistrict}</Typography>
      <Typography variant="secondary">{dropProvince}</Typography>
      <Typography variant="secondary">{dropPostcode}</Typography>
    </Row>
  );
};

export default ReceiverPostal;
