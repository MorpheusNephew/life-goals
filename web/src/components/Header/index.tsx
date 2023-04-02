import { AppBar } from '@mui/material';
import { FC, ReactNode } from 'react';

interface HeaderProps {
  children?: ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {
  return <AppBar position='sticky'>{children}</AppBar>;
};

export default Header;
