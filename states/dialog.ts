import type { ReactNode } from 'react';
import { atom } from 'recoil';

export const openDialog = atom<boolean>({
  key: 'openDialog',
  default: false,
});

export const dialogTitle = atom<ReactNode>({
  key: 'dialogTitle',
  default: '',
});

export const dialogBody = atom<ReactNode>({
  key: 'dialogBody',
  default: null,
});

export const dialogAction = atom<ReactNode>({
  key: 'dialogAction',
  default: null,
});
