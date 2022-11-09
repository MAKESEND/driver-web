import type { ScannerTask, ScannerMode } from 'types';
import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from './_app';
import { Suspense } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { Loader } from 'components/common/loader/Loader';

import dynamic from 'next/dynamic';
const Seo = dynamic(() => import('components/common/Seo'));
const Scanner = dynamic(() => import('components/scanner/Scanner'), {
  suspense: true,
});
const DrawerLayout = dynamic(
  () => import('components/layouts/drawerLayout/DrawerLayout')
);

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale &&
        (await serverSideTranslations(locale, ['common', 'scanner']))),
    },
  };
};

export const ScannerPage: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <>
      <Seo title="Scanner" />
      <Suspense fallback={<Loader />}>
        <Scanner
          task={router.query?.type as ScannerTask}
          mode={router.query?.mode as ScannerMode}
        />
      </Suspense>
    </>
  );
};

ScannerPage.getLayout = (page: React.ReactNode) => {
  return (
    <DrawerLayout fillContainer mobileContainer>
      {page}
    </DrawerLayout>
  );
};

export default ScannerPage;
