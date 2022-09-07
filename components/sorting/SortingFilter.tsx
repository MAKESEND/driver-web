import type { Dispatch, FC, SetStateAction } from 'react';
import type { ParcelMixin } from 'types';
import { useRecoilState } from 'recoil';
import { sortingRoundState } from 'states';

export interface SortingFilterProps {
  setter?: Dispatch<SetStateAction<ParcelMixin | null>>;
}

export const SortingFilter: FC<SortingFilterProps> = ({
  setter = () => console.warn('no setter to SortingFilter'),
}) => {
  const [round, setRound] = useRecoilState(sortingRoundState);

  return <></>;
};

export default SortingFilter;
