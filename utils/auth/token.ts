import type { Countries } from 'types';
import { countries } from 'utils/constants/locales';
// import locale from 'utils/common/locale';

export const token = {
  getMaxAge(country: Countries = 'th'): number {
    // until midnight on the same day
    const timegap = countries[country]?.timezone ?? 0;
    const timegapMS = timegap * 60 * 60 * 1000;
    const now = new Date(Date.now() + timegapMS);
    const midnight = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1
    );
    const localMidnight = midnight - timegapMS;

    return localMidnight - Date.now();
  },
};

export default token;
