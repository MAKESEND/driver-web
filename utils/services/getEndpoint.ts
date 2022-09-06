import type { ENVs, Routes } from 'types';
import getConfig from 'next/config';
import legacyServices from 'utils/constants/legacyServices';
import paths from 'utils/constants/assetPaths';
import hosts from 'utils/constants/hosts';

export interface EndpointsArgs {
  route: Routes;
  ENV?: ENVs;
}

export const isLegacyService = (route: Routes): boolean =>
  legacyServices?.hasOwnProperty(route) ?? !!legacyServices[route];

export const getEndpoint = ({ ENV, route }: EndpointsArgs): string => {
  const {
    publicRuntimeConfig: { APP_ENV },
  } = getConfig();

  const isLegacy = isLegacyService(route);
  const { DOMAIN, LEGACY_DOMAIN } =
    (ENV ?? APP_ENV) === 'production' ? hosts('asia') : hosts('ninja');

  const path = isLegacy ? paths.legacy[route] : paths[route];
  const domain = isLegacy ? LEGACY_DOMAIN : DOMAIN;

  return `${domain}${path}`;
};

export default getEndpoint;
