export const hosts = (host = 'ninja') => ({
  DOMAIN: `https://apis.makesend.${host}`,
  LEGACY_DOMAIN: `https://apiold.makesend.${host}`,
});

export default hosts;
