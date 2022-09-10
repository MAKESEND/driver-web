import type { Routes, ParcelStatusRequest, ParcelStatusResponse } from 'types';
import axios from 'axios';
import getEndpoint from 'utils/services/getEndpoint';
import getConfig from 'next/config';

type ResponseType = 'message' | 'successUpdate' | 'errorUpdate';

export interface UpdateParcelStatusAPI
  extends Pick<ParcelStatusResponse, ResponseType> {
  sorted: boolean;
}

export const updateParcelStatus = async (
  payload: ParcelStatusRequest
): Promise<UpdateParcelStatusAPI> => {
  let sorted = false;
  let message = 'error';
  let successUpdate: string[] = [];
  let errorUpdate: string[] = [];

  const {
    publicRuntimeConfig: { APP_ENV },
    serverRuntimeConfig: { msKey },
  } = getConfig();

  try {
    const endpoint = getEndpoint({ route: 'updateParcelStatus' as Routes });
    const {
      data: { status, data, message: resMsg },
    } = await axios.post<ParcelStatusResponse>(endpoint, payload, {
      headers: {
        'Content-Type': 'application/json',
        'ms-key': msKey[APP_ENV].sorting,
      },
    });

    sorted =
      (status === 200 && !!data?.successUpdate.length) ||
      (!!data?.errorUpdate.length && /403/g.test(data?.errorUpdate[0]));
    message = resMsg;

    successUpdate = data?.successUpdate ?? successUpdate;
    errorUpdate = data?.errorUpdate ?? errorUpdate;
  } catch (error: any) {
    console.log("something went wrong in 'sortParcel'");
    message = error?.data?.data?.message ?? error?.message;
    console.log(message ?? error);
  }

  return { sorted, message, successUpdate, errorUpdate };
};

export default updateParcelStatus;
