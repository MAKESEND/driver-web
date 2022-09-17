import type { ReactNode } from 'react';
import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from './_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState, useEffect } from 'react';
import Seo from 'components/common/Seo';
import DrawerLayout from 'components/layouts/drawerLayout/DrawerLayout';
import ScannerPanel from 'components/scanner/ScannerPanel';
import { useRouter } from 'next/router';

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

ScannerPage.getLayout = (page: ReactNode) => {
  return <DrawerLayout fillContainer>{page}</DrawerLayout>;
};

export default ScannerPage;
