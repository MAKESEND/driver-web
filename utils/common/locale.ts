import { countries } from 'utils/constants/locales';

export const locale = {
  getLocalDate: (country: keyof typeof countries) => {
    return new Date(
      Date.now() + (countries[country]?.timezone ?? 0) * 1000 * 60 * 60
    )
      .toISOString()
      .split('T')[0];
  },
};
