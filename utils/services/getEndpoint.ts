import type { ENVs, Routes } from 'types';
import type { TNameService } from 'utils/constants/namedServices';
import getConfig from 'next/config';
import namedServices from 'utils/constants/namedServices';
import paths from 'utils/constants/assetPaths';
import hosts from 'utils/constants/hosts';

type TRoutes = keyof typeof Routes;

export interface EndpointsArgs {
  route: TRoutes;
  ENV?: ENVs;
}

export const isNamedService = (
  route: TRoutes,
  services: TNameService
): boolean => services?.hasOwnProperty(route) ?? Boolean(services[route]);

export const getEndpoint = ({ ENV, route }: EndpointsArgs): string => {
  const {
    publicRuntimeConfig: {
      ENV: { APP_ENV },
    },
  } = getConfig();

  const isLegacy = isNamedService(route, namedServices.legacyServices);
  const isMerchant = isNamedService(route, namedServices.merchantServices);
  const { DOMAIN, LEGACY_DOMAIN, MERCHANT_DOMAIN } =
    (ENV ?? APP_ENV) === 'production' ? hosts('asia') : hosts('ninja');

  const path = isLegacy
    ? paths.legacy[route]
    : isMerchant
    ? paths.merchant[route]
    : paths[route];
  const domain = isLegacy
    ? LEGACY_DOMAIN
    : isMerchant
    ? MERCHANT_DOMAIN
    : DOMAIN;

  return `${domain}${path}`;
};

export default getEndpoint;
