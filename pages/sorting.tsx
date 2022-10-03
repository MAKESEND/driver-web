import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from './_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useGetSortingList } from 'hooks/useQueryData';

import dynamic from 'next/dynamic';
const Seo = dynamic(() => import('components/common/Seo'));
const DrawerLayout = dynamic(
  () => import('components/layouts/drawerLayout/DrawerLayout')
);
const SortingList = dynamic(() => import('components/sorting/SortingList'));
const Loader = dynamic(() => import('components/common/loader/Loader'));
const Box = dynamic(() => import('@mui/material/Box'));

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale &&
        (await serverSideTranslations(locale, [
          'common',
          'sorting',
          'parcel',
        ]))),
    },
  };
};

export const SortingPage: NextPageWithLayout = () => {
  const { data: sortingList, isLoading } = useGetSortingList();

  return (
    <>
      <Seo title="Sorting" />
      {isLoading ? (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loader />
        </Box>
      ) : (
        <SortingList sortingList={sortingList} />
      )}
    </>
  );
};

SortingPage.getLayout = (page: React.ReactNode) => {
  return <DrawerLayout fillContainer>{page}</DrawerLayout>;
};

export default SortingPage;
