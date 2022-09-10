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
    if (req.method === 'GET') {
      const parcelsToSort = await api.getSortingList();
      data = parcelsToSort;
    } else {
      status = 401;
      message = 'Bad request';
    }
  } catch (error: any) {
    status = 500;
    message = error?.message ?? 'error';
    console.log("something went wrong in '/api/sortinglist");
    console.log(message);
  }

  res.status(status).json({ status, message, data });
}
