import { PageWrapper } from '@components';
import { useModules } from '@hooks';
import { Grid } from '@mui/material';
import { Card } from './sub-components';

const Dashboard = () => {
  const { modules } = useModules();

  return (
    <PageWrapper pageTitle="Dashboard">
      <Grid
        container
        spacing={2}
        columns={{ xs: 12, sm: 4, md: 6, lg: 12, xl: 12 }}
      >
        {modules.map(({ icon, title, uri, isSelected }) => {
          return (
            !isSelected && (
              <Card key={title} icon={icon} title={title} uri={uri} />
            )
          );
        })}
      </Grid>
    </PageWrapper>
  );
};

export default Dashboard;
