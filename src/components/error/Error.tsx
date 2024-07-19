import { ErrorOutline } from '@mui/icons-material';
import { Typography } from '@mui/material';
import * as Styles from './Error.styles';

interface IErrorProps {
  title: string;
  subtitle?: string;
  code?: string;
  message?: string;
}

export const Error = ({ title, subtitle, code, message }: IErrorProps) => (
  <Styles.Paper>
    <ErrorOutline color="error" sx={{ fontSize: '3rem', marginBottom: 1 }} />
    <Typography variant="subtitle1" align="center">
      {title}
    </Typography>
    {subtitle && (
      <Typography margin="10px 0" variant="subtitle2" align="center">
        {subtitle}
      </Typography>
    )}
    {code && (
      <Typography variant="caption" align="center">
        code: {code}
      </Typography>
    )}
    {message && (
      <Typography variant="caption" align="center">
        message: {message}
      </Typography>
    )}
  </Styles.Paper>
);
