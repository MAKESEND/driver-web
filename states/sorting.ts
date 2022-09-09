import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const sortingRoundState = atom<number[]>({
  key: 'sortingRound',
  default: [1],
  effects_UNSTABLE: [persistAtom],
});
