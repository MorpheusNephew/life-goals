import { useAuth0 } from '@auth0/auth0-react';
import { FC } from 'react';
import UserInfo from '../../features/user/UserInfo';
import Login from '../authentication/login';
import Logout from '../authentication/logout';
import { AppBar } from '@mui/material';

const Header: FC = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <nav>
        {isAuthenticated ? (
          <ul>
            {user && (
              <li>
                <UserInfo user={user} />
              </li>
            )}
            <li>
              <Logout />
            </li>
          </ul>
        ) : (
          <Login />
        )}
      </nav>
    </AppBar>
  );
};

export default Header;
