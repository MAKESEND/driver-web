import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

interface IpickupParcelState {
  orderId: string;
  selectedParcels: string[];
}

export const pickupParcelState = atom<IpickupParcelState>({
  key: 'pickupParcelIds',
  default: {
    orderId: '',
    selectedParcels: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export const pickupRoundState = atom<number[]>({
  key: 'pickupRound',
  default: [1],
  effects_UNSTABLE: [persistAtom],
});

export const dropoffParcelState = atom<string[]>({
  key: 'dropoffParcelIds',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
