import type { StringType } from 'types';

export type TparseStringType = {
  [key in StringType]: boolean;
};

export const parseStringType = (text: string): TparseStringType => {
  const types: TparseStringType = {
    trackingId: false,
    orderId: false,
    url: false,
  };

  if (/(ns|ex)\d{13}/i.test(text)) {
    // check if text is tracking ID
    types.trackingId = true;
  }

  if (/ms\d{13}/i.test(text)) {
    // check if text is order ID
    types.orderId = true;
  }

  if (/https?:\/\//i.test(text)) {
    // check if text is URL
    types.url = true;
  }

  return types;
};

export default parseStringType;
