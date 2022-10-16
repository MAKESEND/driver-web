import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from '../../_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { useGetPickupTasks } from 'hooks/useQueryData';
import jwt from 'utils/auth/jwt';
import { getPickupTasks } from 'utils/services/getPickupTasks';
import { useRecoilValue } from 'recoil';
import { userDataState } from 'states';

import dynamic from 'next/dynamic';
const Seo = dynamic(() => import('components/common/Seo'));
const DrawerLayout = dynamic(
  () => import('components/layouts/drawerLayout/DrawerLayout')
);
const FlexCenterBox = dynamic(() => import('components/layouts/FlexCenterBox'));
const MobileContainer = dynamic(
  () => import('components/common/mobile/MobileContainer')
);
const Loader = dynamic(() => import('components/common/loader/Loader'));
const PickupTasks = dynamic(
  () => import('components/tasks/pickup/PickupTasks')
);

export const getServerSideProps: GetServerSideProps = async ({
  req,
  locale,
}) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      throw new Error('Unauthroized');
    }

    const userData = jwt.verify(token);

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(
      ['pickupTasks', userData?.id],
      async () => await getPickupTasks()
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        ...(locale &&
          (await serverSideTranslations(locale, [
            'common',
            'tasks',
            'sorting',
          ]))),
      },
    };
  } catch (error: any) {
    console.log('something went wrong in /tasks/pickup');
    console.log(error?.message ?? error);

    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
};

export const PickupPage: NextPageWithLayout = () => {
  const userData = useRecoilValue(userDataState);
  const { data: pickupTasks, isLoading } = useGetPickupTasks(userData?.id);

  return (
    <>
      <Seo title="Pickup" />
      {isLoading ? (
        <FlexCenterBox>
          <Loader />
        </FlexCenterBox>
      ) : (
        <MobileContainer>
          <PickupTasks pickupTasks={pickupTasks} />
        </MobileContainer>
      )}
    </>
  );
};

PickupPage.getLayout = (page: React.ReactNode) => {
  return (
    <DrawerLayout sxMain={{ paddingTop: 0 }} fillContainer>
      {page}
    </DrawerLayout>
  );
};

export default PickupPage;
