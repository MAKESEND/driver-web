export const hosts = (host = 'ninja') => ({
  DOMAIN: `https://apis.makesend.${host}`,
  LEGACY_DOMAIN: `https://apiold.makesend.${host}`,
  MERCHANT_DOMAIN: `https://api-merchant.makesend.${host}`,
});

export default hosts;
