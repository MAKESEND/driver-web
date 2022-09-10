import type { NextApiRequest, NextApiResponse } from 'next';
import { api } from 'utils/services';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let status = 200;
  let message = 'success';
  let data = null;

  try {
    if (req.method === 'GET' && req.query?.orderid) {
      const parcels = await api.getParcelsByOrderId(
        req.query.orderid as string
      );
      data = parcels;
    } else {
      status = 401;
      message = 'Bad request';
    }
  } catch (error: any) {
    status = 500;
    message = error?.message ?? 'error';
    console.log("something went wrong in '/api/parcel/orderid/:orderid");
    console.log(message);
  }

  res.status(status).json({ status, message, data });
}
