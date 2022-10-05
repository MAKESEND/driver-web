import type { Notification } from 'types/notifications';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const notifactionState = atom<number>({
  key: 'notifications',
  default: 2, // mock up
});

export const updateBodyState = atom<Notification[]>({
  key: 'updateBody',
  default: [
    {
      id: 'test_id',
      message: 'message',
      isRead: false,
      imgSrc:
        'https://images.unsplash.com/photo-1657287610519-2810a4ee9bff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    },
    {
      id: 'test_id_1',
      message: 'message 2',
      isRead: true,
    },
  ],
  effects_UNSTABLE: [persistAtom],
});
