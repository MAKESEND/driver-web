import type { ParcelStatus } from 'types';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { Checkbox, MenuItem, Typography } from '@mui/material';

export interface FilterOptionProps<T = unknown> {
  option?: T;
  selectedOption?: T[];
  setSelectedOption?: React.Dispatch<React.SetStateAction<T[]>>;
  Label?: React.ReactNode;
  label?: string;
}

export const RoundFilter: React.FC<FilterOptionProps<number>> = ({
  option,
  selectedOption = [],
  setSelectedOption = () =>
    console.warn('no setSelectedOption given in RoundsFilter'),
}) => {
  const { t } = useTranslation('sorting');
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const index = selectedOption.findIndex((round) => round === option);
    setChecked(index > -1);
  }, [option, selectedOption]);

  useEffect(() => {
    return () => setChecked(false);
  }, []);

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    setSelectedOption((rounds) => {
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

export const FilterOption = <T extends unknown>({
  option,
  selectedOption = [],
  setSelectedOption = () =>
    console.warn('no setSelectedOption given in Filter'),
  Label,
  label,
}: FilterOptionProps<T>) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const index = selectedOption.findIndex((item) => item === option);
    setChecked(index > -1);
  }, [option, selectedOption]);

  useEffect(() => {
    return () => setChecked(false);
  }, []);

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    setSelectedOption((options) => {
      if (checked) {
        return options.filter((item) => item !== option);
      }

      return option ? [...options, option] : options;
    });
  };

  return (
    <MenuItem sx={{ paddingX: 0 }} onClick={onClick}>
      {option && (
        <>
          <Checkbox checked={checked} onClick={onClick} />
          {Label ?? (
            <Typography sx={{ paddingRight: '.5rem' }}>{label}</Typography>
          )}
        </>
      )}
    </MenuItem>
  );
};

export const FilterOptions = {
  Round: RoundFilter,
};

export default FilterOptions;
