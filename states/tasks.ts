import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const pickupParcelState = atom<string[]>({
  key: 'pickupParcelIds',
  default: [],
});

export const pickupRoundState = atom<number[]>({
  key: 'pickupRound',
  default: [1],
  effects_UNSTABLE: [persistAtom],
});
