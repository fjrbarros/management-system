import { Link } from '@components';
import { Grid, Typography } from '@mui/material';
import { To } from 'react-router-dom';
import { Paper } from './Card.styles';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  uri: To;
}

export const Card = ({ icon, title, uri }: CardProps) => {
  return (
    <Grid item xs={12} sm={2} md={2} lg={3} xl={2}>
      <Link uri={uri}>
        <Paper elevation={0}>
          {icon}
          <Typography marginTop="2px">{title}</Typography>
        </Paper>
      </Link>
    </Grid>
  );
};
