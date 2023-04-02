import { useAuth0 } from '@auth0/auth0-react';
import { FC } from 'react';
import User from '../../features/user/User';
import Login from '../authentication/Login';
import Logout from '../authentication/Logout';

const Header: FC = () => {
  const { isAuthenticated } = useAuth0();

  const AuthButton = () => (isAuthenticated ? <Logout /> : <Login />);

  return (
    <header>
      Magic is happening
      <User />
      <AuthButton />
    </header>
  );
};

export default Header;
