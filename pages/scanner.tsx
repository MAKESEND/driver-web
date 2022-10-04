import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from './_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';
const Seo = dynamic(() => import('components/common/Seo'));
const DrawerLayout = dynamic(
  () => import('components/layouts/drawerLayout/DrawerLayout')
);
const ScannerPanel = dynamic(() => import('components/scanner/ScannerPanel'));

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
  const [mode, setMode] = useState('');

  useEffect(() => {
    setMode((router.query?.type as string) ?? '');

    return () => {
      setMode('');
    };
  }, [router.query]);

  return (
    <>
      <Seo title="Scanner" />
      <ScannerPanel />
    </>
  );
};

ScannerPage.getLayout = (page: React.ReactNode) => {
  return <DrawerLayout fillContainer>{page}</DrawerLayout>;
};

export default ScannerPage;
