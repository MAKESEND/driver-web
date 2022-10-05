import type { Routes } from 'types';

export type TNameService = {
  [key in Routes]?: Routes;
};

export const legacyServices: TNameService = {};

export const merchantServices: TNameService = {
  getParcelsByTrackingIds: 'getParcelsByTrackingIds' as Routes,
};

export const namedServices = {
  legacyServices,
  merchantServices,
};

export default namedServices;
