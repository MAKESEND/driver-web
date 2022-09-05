import type { NextPage, GetServerSideProps } from 'next';
import type { Parcel } from 'types/delivery/parcel';
import getParcelsByOrderId from 'utils/services/getParcelsByOrderId';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const parcels = await getParcelsByOrderId(params?.orderid as string);

  return {
    props: { parcels },
  };
};

export const WaybillByOrderPage: NextPage<{ parcels: Parcel[] }> = ({
  parcels,
}) => {
  return <></>;
};

export default WaybillByOrderPage;
