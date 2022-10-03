import { Grid, IconButton, Typography } from '@mui/material';
import { copyText } from 'utils/common';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
const LocationOnIcon = dynamic(
  () => import('@mui/icons-material/LocationOnOutlined'),
  { ssr: false }
);
const ContentCopyIcon = dynamic(
  () => import('@mui/icons-material/ContentCopyOutlined'),
  { ssr: false }
);

export interface ReceiverAddressProps {
  dropAddress: string;
}

export const ReceiverAddress: React.FC<ReceiverAddressProps> = ({
  dropAddress,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    return () => setIsCopied(false);
  }, []);

  return (
    <Grid container>
      <Grid item xs={10} sx={{ textAlign: 'start', alignSelf: 'center' }}>
        <Typography variant="secondary">{dropAddress}</Typography>
      </Grid>
      <Grid container item xs={2}>
        <Grid item xs={12} sm={6}>
          <IconButton onClick={() => copyText(dropAddress)}>
            <ContentCopyIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12} sm={6}>
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
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ReceiverAddress;
