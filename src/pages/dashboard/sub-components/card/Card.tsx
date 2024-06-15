import { Grid, Typography } from '@mui/material';
import { Paper } from './Card.styles';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
}

export const Card = ({ icon, title, onClick }: CardProps) => {
  return (
    <Grid item xs={12} sm={2} md={2} lg={3} xl={2}>
      <Paper elevation={0} onClick={onClick}>
        {icon}
        <Typography marginTop="2px">{title}</Typography>
      </Paper>
    </Grid>
  );
};
