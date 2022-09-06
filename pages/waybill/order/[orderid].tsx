import type { NextPage, GetServerSideProps } from 'next';
import type { Parcel } from 'types/delivery/parcel';
import { Waybills } from 'components/waybill/Waybills';
import { api } from 'utils/services/apiServices';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const parcels = await api.getParcelsByOrderId(params?.orderid as string);

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
