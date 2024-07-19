import {
  Divider as MuiDivider,
  Paper as MuiPaper,
  styled,
} from '@mui/material';

export const Paper = styled(MuiPaper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
}));

export const Divider = styled(MuiDivider)({
  width: '100%',
  margin: '10px 0',
});
