import { Typography } from '@mui/material';
import {
  ThemeProvider as MuiThemeProvider,
  createTheme as muiCreateTheme,
} from '@mui/material/styles';
import { useState } from 'react';
import {
  Button,
  Divider,
  Form,
  FormContainer,
  PageWrapper,
  RegisterContainer,
  SystemName,
  SystemNameContainer,
  TextField,
} from './Login.styles';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <MuiThemeProvider
      theme={muiCreateTheme({
        components: {
          MuiTextField: {
            defaultProps: {
              variant: 'standard',
            },
          },
        },
      })}
    >
      <PageWrapper>
        <SystemNameContainer>
          <SystemName variant="h2">
            Management
            <br />
            System
          </SystemName>
        </SystemNameContainer>
        <Divider orientation="vertical" flexItem />
        <FormContainer sx={{ position: 'relative' }}>
          <Form
            component="form"
            sx={{
              transform: isRegistering
                ? 'translateX(-200%)'
                : 'translateX(-50%)',
            }}
          >
            <Typography variant="h4" textAlign="center">
              Login
            </Typography>
            <TextField autoComplete="off" label="E-mail" fullWidth />
            <TextField
              autoComplete="off"
              label="Senha"
              type="password"
              fullWidth
            />
            <Button variant="outlined">Login</Button>
            <RegisterContainer>
              <Typography variant="body2" textAlign="center">
                Não tem uma conta?
              </Typography>
              <Button variant="text" onClick={() => setIsRegistering(true)}>
                cadastre-se!
              </Button>
            </RegisterContainer>
          </Form>

          <Form
            component="form"
            sx={{
              transform: isRegistering
                ? 'translateX(-50%)'
                : 'translateX(200%)',
            }}
          >
            <Typography variant="h4" textAlign="center">
              Cadastro
            </Typography>
            <TextField autoComplete="off" label="E-mail" fullWidth />
            <TextField
              autoComplete="off"
              label="Senha"
              type="password"
              fullWidth
            />
            <TextField
              autoComplete="off"
              label="Confirmação de senha"
              type="password"
              fullWidth
            />
            <Button variant="outlined">Login</Button>
            <RegisterContainer>
              <Typography variant="body2" textAlign="center">
                Já possui cadastro?
              </Typography>
              <Button variant="text" onClick={() => setIsRegistering(false)}>
                login!
              </Button>
            </RegisterContainer>
          </Form>
        </FormContainer>
      </PageWrapper>
    </MuiThemeProvider>
  );
};

export default Login;
