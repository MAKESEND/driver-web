import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const pickupParcelState = atom<string[]>({
  key: 'pickupParcelIds',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
