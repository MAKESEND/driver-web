import { useState, useEffect } from 'react';
import { Checkbox, MenuItem, Typography } from '@mui/material';

export interface FilterOptionProps<T = unknown> {
  option?: T;
  selectedOption?: T[];
  setSelectedOption?: React.Dispatch<React.SetStateAction<T[]>>;
  Label?: React.ReactNode;
  label?: string;
}

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
    <MenuItem sx={{ px: 0 }} onClick={onClick}>
      {option && (
        <>
          <Checkbox checked={checked} onClick={onClick} />
          {Label ?? <Typography sx={{ pr: 1 }}>{label}</Typography>}
        </>
      )}
    </MenuItem>
  );
};

export default FilterOption;
