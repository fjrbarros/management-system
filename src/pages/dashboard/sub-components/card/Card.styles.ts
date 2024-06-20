import { Paper as MuiPaper, styled } from '@mui/material';

export const Paper = styled(MuiPaper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  cursor: 'pointer',
  border: `1px solid ${theme.palette.divider}`,
  color:
    theme.palette.mode === 'light'
      ? theme.palette.text.secondary
      : theme.palette.text.primary,
  '&:hover': {
    boxShadow: theme.shadows[3],
  },
}));
