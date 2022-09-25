import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from './_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useGetSortingList } from 'hooks/useQueryData';
import Seo from 'components/common/Seo';
import DrawerLayout from 'components/layouts/drawerLayout/DrawerLayout';
import { Box } from '@mui/material';
import Loader from 'components/common/loader/Loader';
import SortingList from 'components/sorting/SortingList';

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
