import { pathRoutes } from '@constants';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import imageError from '../../assets/error.webp';
import {
  Button,
  Image,
  ImageContainer,
  TextContainer,
  Wrapper,
} from './NotFound.styles';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <TextContainer>
        <Typography color="white" variant="h3" align="center">
          404
        </Typography>
        <Typography color="white" variant="h5" align="center">
          Página não encontrada
        </Typography>
        <Typography color="white" variant="body2" align="center">
          Verifique se a URL está correta ou clique no botão abaixo para voltar
        </Typography>
        <Button variant="outlined" onClick={() => navigate(pathRoutes.home)}>
          Inicio
        </Button>
      </TextContainer>

      <ImageContainer>
        <Image src={imageError} alt="Error 404" />
      </ImageContainer>
    </Wrapper>
  );
};

export default NotFound;
