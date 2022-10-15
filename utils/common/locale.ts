import type { Countries } from 'types';
import { countries } from 'utils/constants/locales';

export const locale = {
  getLocalTime(country: Countries, { hour = 0, min = 0, sec = 0 } = {}) {
    return new Date(
      Date.now() +
        (countries[country]?.timezone ?? 0) *
          (((1 + hour) * 60 + min) * 60 + sec) *
          1000
    );
  },
  getLocalDate(country: Countries) {
    return this.getLocalTime(country).toISOString().split('T')[0];
  },
};

export default locale;
