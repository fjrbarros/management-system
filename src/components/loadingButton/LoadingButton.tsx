import { Button, ButtonProps, CircularProgress } from '@mui/material';
import { PropsWithChildren } from 'react';

interface ILoadingButtonProps extends ButtonProps, PropsWithChildren {
  label?: string;
  isLoading?: boolean;
}

export const LoadingButton = ({
  label,
  isLoading,
  disabled,
  children,
  ...props
}: ILoadingButtonProps) => {
  return (
    <Button {...props} disabled={isLoading || disabled}>
      {label || children}
      {isLoading && <CircularProgress sx={{ marginLeft: '10px' }} size={16} />}
    </Button>
  );
};
