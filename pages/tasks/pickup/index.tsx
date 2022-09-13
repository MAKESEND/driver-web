import type { ReactNode } from 'react';
import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from '../../_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useGetPickupTasks } from 'hooks/useQueryData';
import Seo from 'components/common/Seo';
import { Box } from '@mui/material';
import { Loader } from 'components/common/loader/Loader';
import { MobileContainer } from 'components/common/mobile/MobileContainer';
import DrawerLayout from 'components/layouts/drawerLayout/DrawerLayout';
import { PickupTasks } from 'components/tasks/pickup/page/PickupTasks';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale &&
        (await serverSideTranslations(locale, ['common', 'tasks']))),
    },
  };
};

export const PickupPage: NextPageWithLayout = () => {
  // this should filter by driver id with authentication
  const { data: pickupTasks, isLoading } = useGetPickupTasks();

  return (
    <>
      <Seo title="Pickup" />
      {isLoading ? (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loader />
        </Box>
      ) : (
        <MobileContainer sx={{ height: '100%' }}>
          <PickupTasks pickupTasks={pickupTasks} />
        </MobileContainer>
      )}
    </>
  );
};

PickupPage.getLayout = (page: ReactNode) => {
  return (
    <DrawerLayout fillContainer sxMain={{ paddingTop: 0 }}>
      {page}
    </DrawerLayout>
  );
};

export default PickupPage;
