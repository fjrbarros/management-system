import { PropsWithChildren } from 'react';
import { To } from 'react-router-dom';
import { Link as StyledLink } from './Link.styles';

interface LinkProps extends PropsWithChildren {
  uri: To;
}

export const Link = ({ children, uri }: LinkProps) => {
  return <StyledLink to={uri}>{children}</StyledLink>;
};
