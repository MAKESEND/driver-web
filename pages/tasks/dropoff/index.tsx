import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from '../../_app';
import type { DropoffModes } from 'types';
import { useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { statusToConfirm } from 'utils/constants/tasks';
import { useGetDropoffTasks } from 'hooks';
import Seo from 'components/common/Seo';
import DrawerLayout from 'components/layouts/drawerLayout/DrawerLayout';
import { FlexCenterBox } from 'components/layouts/FlexCenterBox';
import { MobileContainer } from 'components/common/mobile/MobileContainer';
import { Loader } from 'components/common/loader/Loader';
import { DropoffTasks } from 'components/tasks/dropoff/DropoffTasks';

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
  defaultMode = 'collectlist' as DropoffModes,
}) => {
  const { data: dropoffTasks, isLoading } = useGetDropoffTasks(
    '60e18027d1e7a00013affbb6' // testing id, should be removed
  );
  const [mode, setMode] = useState<DropoffModes>(defaultMode);

  useEffect(() => {
    return () => setMode(defaultMode);
  }, [defaultMode]);

  useEffect(() => {
    if (Array.isArray(dropoffTasks)) {
      const toConfirm = dropoffTasks.some((task) =>
        statusToConfirm.includes(task.status)
      );
      setMode(
        !toConfirm
          ? ('collectlist' as DropoffModes)
          : ('tasklist' as DropoffModes)
      );
    }
  }, [dropoffTasks]);

  const Worklist = DropoffTasks[mode] ?? DropoffTasks.collectlist;

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
    <DrawerLayout sxMain={{ padding: 0 }} fillContainer>
      {page}
    </DrawerLayout>
  );
};

export default DropoffPage;
