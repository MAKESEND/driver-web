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
    if (req.method === 'POST' && req.body.phone && req.body.dob) {
      const response = await api.authDriver(req.body);
      response.data?.id && (data = response.data.id);
      response.data?.status && (status = response.data.status);
      response.data?.message && (message = response.data.message);
    } else {
      status = 401;
      message = 'Bad request';
    }
  } catch (error: any) {
    status = error?.response?.status ?? 500;
    message = error?.response?.data?.message ?? error?.message ?? 'error';
    console.log("something went wrong in '/api/auth/login");
    console.log(message);
  }

  res.status(status).json({ status, message, data });
}
