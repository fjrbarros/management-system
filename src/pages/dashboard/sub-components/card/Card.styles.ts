import { Paper as MuiPaper, styled } from '@mui/material';

export const Paper = styled(MuiPaper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  cursor: 'pointer',
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.text.primary
      : theme.palette.text.secondary,
  '&:hover': {
    boxShadow: theme.shadows[3],
  },
}));
