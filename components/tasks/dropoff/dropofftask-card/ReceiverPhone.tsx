import { Grid, IconButton, Typography } from '@mui/material';

import dynamic from 'next/dynamic';
const LocalPhoneIcon = dynamic(
  () => import('@mui/icons-material/LocalPhoneOutlined'),
  { ssr: false }
);

export interface ReceiverPhoneProps {
  receiverPhone: string;
}

export const ReceiverPhone: React.FC<ReceiverPhoneProps> = ({
  receiverPhone,
}) => {
  return (
    <Grid container>
      <Grid item xs={10} sx={{ alignSelf: 'center' }}>
        <Typography sx={{ textAlign: 'start' }}>{receiverPhone}</Typography>
      </Grid>
      <Grid
        item
        xs={2}
        sx={{
          display: 'flex',
          justifyContent: {
            xs: 'center',
            sm: 'end',
          },
        }}
      >
        <a href={`tel:${receiverPhone}`}>
          <IconButton>
            <LocalPhoneIcon />
          </IconButton>
        </a>
      </Grid>
    </Grid>
  );
};

export default ReceiverPhone;
