import type { Dispatch, FC, MouseEvent, SetStateAction } from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { Checkbox, MenuItem, Typography } from '@mui/material';

export interface RoundFilterProps<T = number> {
  option?: T;
  selectedRounds?: T[];
  setSelectedRounds?: Dispatch<SetStateAction<T[]>>;
}

export const RoundFilter: FC<RoundFilterProps<number>> = ({
  option,
  selectedRounds = [],
  setSelectedRounds = () => console.warn('no setter given in RoundsFilter'),
}) => {
  const { t } = useTranslation('sorting');
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const index = selectedRounds.findIndex((round) => round === option);
    setChecked(index > -1);
  }, [option, selectedRounds]);

  useEffect(() => {
    return () => setChecked(false);
  }, []);

  const onClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    setSelectedRounds((rounds) => {
      if (checked) {
        return rounds.filter((round) => round !== option);
      }

      return option ? [...rounds, option] : rounds;
    });
  };

  return (
    <MenuItem sx={{ paddingX: 0 }} onClick={onClick}>
      <>
        <Checkbox checked={checked} onClick={onClick} />
        <Typography sx={{ paddingRight: '.5rem' }}>
          {t('round')} {option}
        </Typography>
      </>
    </MenuItem>
  );
};

export const FilterOptions = {
  Round: RoundFilter,
};

export default FilterOptions;
