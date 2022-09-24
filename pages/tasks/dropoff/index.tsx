import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from '../../_app';
import type { DropoffModes } from 'types';
import { useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useGetDropoffTasks } from 'hooks';
import Seo from 'components/common/Seo';
import DrawerLayout from 'components/layouts/drawerLayout/DrawerLayout';
import { FlexCenterBox } from 'components/layouts/FlexCenterBox';
import { MobileContainer } from 'components/common/mobile/MobileContainer';
import { Loader } from 'components/common/loader/Loader';
import { DropoffTasks } from 'components/tasks/dropoff/DropoffTasks';
import { Button } from '@mui/material';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(locale &&
        (await serverSideTranslations(locale, ['common', 'tasks']))),
    },
  };
};

export interface DropoffPageProps {
  defaultMode?: DropoffModes;
}

export const DropoffPage: NextPageWithLayout<DropoffPageProps> = ({
  defaultMode = 'checklist' as DropoffModes,
}) => {
  const { data: dropoffTasks, isLoading } = useGetDropoffTasks(
    '60e18027d1e7a00013affbb6' // testing id, should be removed
  );
  const [mode, setMode] = useState<DropoffModes>(defaultMode);

  useEffect(() => {
    return () => setMode(defaultMode);
  }, [defaultMode]);

  const Worklist = DropoffTasks[mode];

  const onConfirm = () => {
    console.log('confirm');
  };

  return (
    <>
      <Seo title="Dropoff" />
      {isLoading ? (
        <FlexCenterBox>
          <Loader />
        </FlexCenterBox>
      ) : (
        <>
          <MobileContainer>
            <Worklist dropoffTasks={dropoffTasks} />
          </MobileContainer>
        </>
      )}
    </>
  );
};

DropoffPage.getLayout = (page: React.ReactNode) => {
  return (
    <DrawerLayout sxMain={{ paddingTop: 0 }} fillContainer>
      {page}
    </DrawerLayout>
  );
};

export default DropoffPage;
