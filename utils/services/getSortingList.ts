import type { ParcelToSort } from 'types';
import api from './apiServices';

export const getSortingList = async (): Promise<ParcelToSort[]> => {
  try {
    if (typeof globalThis?.window !== 'undefined') {
      throw new Error('getSortingList is server-side only');
    }
    const {
      data: { data: sortingList },
    } = await api.getSortingList();

    if (!sortingList) {
      throw new Error('no sorting list');
    }

    return sortingList;
  } catch (error: any) {
    console.log("something went wrong in 'getSortingList'");
    console.log(error?.message ?? error);

    return [];
  }
};
