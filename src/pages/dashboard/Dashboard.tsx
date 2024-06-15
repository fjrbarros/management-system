import { PageWrapper } from '@components';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import { Grid } from '@mui/material';
import { Card } from './sub-components';

const cardData = [
  { icon: <PeopleIcon />, title: 'User' },
  { icon: <InventoryIcon />, title: 'Product' },
];

export const Dashboard = () => {
  return (
    <PageWrapper pageTitle="Dashboard">
      <Grid
        container
        spacing={2}
        columns={{ xs: 12, sm: 4, md: 6, lg: 12, xl: 12 }}
      >
        {cardData.map(({ icon, title }) => (
          <Card
            key={title}
            icon={icon}
            title={title}
            onClick={() => alert(title)}
          />
        ))}
      </Grid>
    </PageWrapper>
  );
};
