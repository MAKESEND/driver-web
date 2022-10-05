import type { Camera } from 'types';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const selectedCameraState = atom<string>({
  key: 'selectedCamera',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const camerasState = atom<Camera[]>({
  key: 'cameras',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
