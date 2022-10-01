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
    if (req.method === 'GET' && req.query?.trackingid) {
      const response = await api.getParcelByTrackingId([
        req.query.trackingid as string,
      ]);
      response?.data?.resCode && (status = response.data.resCode);
      response?.data?.message && (message = response.data.message);
      response?.data?.orderList && (data = response.data.orderList);
    } else {
      status = 401;
      message = 'Bad request';
    }
  } catch (error: any) {
    status = error?.response?.status ?? 500;
    message = error?.response?.data?.message ?? error?.message ?? 'error';
    console.log("something went wrong in '/api/parcel/trackingid/:trackingid");
    console.log(message);
  }

  res.status(status).json({ status, message, data });
}
