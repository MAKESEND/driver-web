import type { ScannerType, ScannerMode } from 'types';
import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from './_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';
const Seo = dynamic(() => import('components/common/Seo'));
const ScannerPanel = dynamic(() => import('components/scanner/ScannerPanel'));
const DrawerLayout = dynamic(
  () => import('components/layouts/drawerLayout/DrawerLayout'),
  { ssr: false }
);

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale &&
        (await serverSideTranslations(locale, ['common', 'scanner']))),
    },
  };
};

const defaultMode = 'single';

export const ScannerPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [type, setType] = useState<keyof typeof ScannerType>();
  const [mode, setMode] = useState<keyof typeof ScannerMode>(defaultMode);

  useEffect(() => {
    setType(router.query?.type as ScannerType);
    setMode((router.query?.mode as ScannerMode) ?? defaultMode);
  }, [router.query]);

  return (
    <>
      <Seo title="Scanner" />
      <ScannerPanel type={type} mode={mode} />
    </>
  );
};

ScannerPage.getLayout = (page: React.ReactNode) => {
  return <DrawerLayout fillContainer>{page}</DrawerLayout>;
};

export default ScannerPage;
