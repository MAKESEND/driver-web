import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const rememberUserState = atom<boolean>({
  key: 'rememberUser',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const userPhoneState = atom<string>({
  key: 'uesrPhone',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const userDOBState = atom<string>({
  key: 'uesrDOB',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
