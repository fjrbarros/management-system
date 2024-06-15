import { PageWrapper, modules } from '@components';
import { Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Card } from './sub-components';

export const Dashboard = () => {
  const { pathname } = useLocation();

  return (
    <PageWrapper pageTitle="Dashboard">
      <Grid
        container
        spacing={2}
        columns={{ xs: 12, sm: 4, md: 6, lg: 12, xl: 12 }}
      >
        {modules.map(({ icon, title, uri }) => {
          return (
            pathname !== uri && (
              <Card key={title} icon={icon} title={title} uri={uri} />
            )
          );
        })}
      </Grid>
    </PageWrapper>
  );
};

export default Dashboard;
