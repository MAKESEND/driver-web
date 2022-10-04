export const trackingId = (trackingId: string): boolean => {
  const reg = new RegExp(/[ex|ns]\d{13}$/i);
  return reg.test(trackingId);
};

export const orderId = (orderId: string): boolean => {
  const reg = new RegExp(/[ms]\d{13}$/i);
  return reg.test(orderId);
};

export const idValidators = {
  trackingId,
  orderId,
};

export default idValidators;
