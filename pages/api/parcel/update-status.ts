import type { NextApiRequest, NextApiResponse } from 'next';
import type { ParcelStatusRequest } from 'types';
import { api } from 'utils/services';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let status = 200;
  let message = 'success';
  let data = null;

  try {
    if (req.method === 'POST' && req.body) {
      const response = await api.updateParcelStatus(
        req.body as ParcelStatusRequest
      );
      response?.data?.status && (status = response.data.status);
      response?.data?.message && (message = response.data.message);
      response?.data?.data && (data = response.data.data);
    } else {
      status = 401;
      message = 'Bad request';
    }
  } catch (error: any) {
    status = error?.response?.status ?? 500;
    message = error?.response?.data?.message ?? error?.message ?? 'error';
    console.log("something went wrong in '/api/parcel/update-status");
    console.log(message);
  }

  res.status(status).json({ status, message, data });
}
