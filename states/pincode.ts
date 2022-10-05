import { atom } from 'recoil';

export const pincodeState = atom<boolean>({
  key: 'pincode',
  default: false,
});

export const pincodeAuthState = atom<(() => void) | (() => Promise<void>)>({
  key: 'pincodeAuth',
  // eslint-disable-next-line
  default: () => {},
});
