import type { NextPage, GetServerSideProps } from 'next';
import type { Parcel } from 'types/delivery/parcel';
import getParcelsByOrderId from 'utils/services/getParcelsByOrderId';
import { Waybills } from 'components/waybill/Waybills';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const parcels = await getParcelsByOrderId(params?.orderid as string);

  return {
    props: { parcels },
  };
};

export const WaybillByOrderPage: NextPage<{ parcels: Parcel[] }> = ({
  parcels,
}) => {
  return <Waybills parcels={parcels} />;
};

export default WaybillByOrderPage;
