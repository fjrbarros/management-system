import { Paper as MuiPaper, styled } from '@mui/material';

export const Paper = styled(MuiPaper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
}));
