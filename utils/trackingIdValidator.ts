export const trackingIdValidator = (trackingId: string): boolean => {
  const reg = new RegExp(/[ex|ns]\d{13}$/i);
  return reg.test(trackingId);
};

export default trackingIdValidator;
