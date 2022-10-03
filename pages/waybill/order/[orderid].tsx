import type { NextPage, GetServerSideProps } from 'next';
import type { Parcel } from 'types/delivery/parcel';
import { api } from 'utils/services/apiServices';

import dynamic from 'next/dynamic';
const Waybills = dynamic(() => import('components/waybill/Waybills'));

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
