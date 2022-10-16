import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from './_app';
import type { ScannerMode } from 'types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';
const Seo = dynamic(() => import('components/common/Seo'));
const ScannerPanel = dynamic(() => import('components/scanner/ScannerPanel'));
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
  const [mode, setMode] = useState<ScannerMode>();

  useEffect(() => {
    setMode(router.query?.type as string as ScannerMode);

    return () => {
      setMode(undefined);
    };
  }, [router.query]);

  return (
    <>
      <Seo title="Scanner" />
      <ScannerPanel mode={mode} />
    </>
  );
};

ScannerPage.getLayout = (page: React.ReactNode) => {
  return <DrawerLayout fillContainer>{page}</DrawerLayout>;
};

export default ScannerPage;
