import type { NextPage, GetServerSideProps } from 'next';
import type { Parcel } from 'types/delivery/parcel';
import { api } from 'utils/services/apiServices';
import auth from 'utils/auth';

import dynamic from 'next/dynamic';
const Waybills = dynamic(() => import('components/waybill/Waybills'));

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const userData = auth.getUser(req);

  // abort if token is invalid/missing
  // redirect to login
  if (!userData) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

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
