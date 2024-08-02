import { PageWrapper } from '@components';
import { Typography } from '@mui/material';

const User = () => {
  return (
    <PageWrapper pageTitle="Usuário">
      <Typography sx={{ minHeight: 1000 }} variant="h3">
        To-do
      </Typography>
    </PageWrapper>
  );
};

export default User;
