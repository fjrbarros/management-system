import * as Icons from '@mui/icons-material';
import { To } from 'react-router-dom';

export interface IModule {
  id: string;
  icon: keyof typeof Icons;
  title: string;
  uri: To;
  isSelected?: boolean;
}
