import { atom } from 'recoil';

export const selectedBranchState = atom({
  key: 'selectedBranch',
  default: '',
});
