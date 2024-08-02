import { styled } from '@mui/material';
import MuiBox from '@mui/material/Box';
import MuiButton from '@mui/material/Button';
import MuiDivider from '@mui/material/Divider';
import MuiTextField from '@mui/material/TextField';
import MuiTypography from '@mui/material/Typography';

export const PageWrapper = styled('div')({
  position: 'relative',
  background:
    'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,80,121,1) 0%, rgba(0,212,255,1) 100%)',
  height: '100dvh',
  width: '100vw',
  color: '#ffffff',
  display: 'flex',
});

export const SystemName = styled(MuiTypography)(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
  },
  [theme.breakpoints.down('sm')]: {
    position: 'absolute',
    top: '5%',
    left: '50%',
    transform: 'translateX(-50%)',
  },
}));

export const Divider = styled(MuiDivider)(({ theme }) => ({
  borderColor: '#ffffff',
  height: '90%',
  margin: 'auto 0',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

export const Form = styled(MuiBox)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  width: '90%',
  [theme.breakpoints.up('lg')]: {
    maxWidth: '90%',
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: '50%',
  },
  transition: 'transform 0.5s ease-in-out',
  position: 'absolute',
  left: '50%',
}));

export const TextField = styled(MuiTextField)({
  '.MuiInputBase-root, .MuiFormLabel-root, .MuiFormLabel-root.Mui-focused': {
    color: '#ffffff',
  },
  '.MuiInputBase-root::after': {
    borderColor: '#ffffff',
  },
});

export const FormContainer = styled('div')({
  flex: 1,
  minHeight: '100dvh',
  padding: '2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
});

export const SystemNameContainer = styled(FormContainer)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    flex: 0,
    padding: 0,
  },
}));

export const Button = styled(MuiButton)({
  width: '50%',
  textTransform: 'none',
  margin: '0 auto',
  color: '#ffffff',
  borderColor: '#ffffff',
  '&:hover': {
    borderColor: '#ffffff',
    backgroundColor: 'transparent',
  },
});

export const RegisterContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '5px',
  '& button': {
    minWidth: 'fit-content',
    maxWidth: 'fit-content',
    margin: 0,
    padding: 0,
    transition: 'transform 0.2s',
  },
  '& button:hover': {
    transform: 'translateY(-2px)',
  },
});
