import { Paper, styled } from '@mui/material';

export const InputWrapper = styled(Paper)(({ theme }) => ({
  paddingLeft: theme.spacing(1.75),
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.palette.common.lightGrey}`,
}));

InputWrapper.defaultProps = {
  elevation: 0,
};

export default InputWrapper;
