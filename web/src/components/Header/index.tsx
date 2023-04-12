import { useAuth0 } from '@auth0/auth0-react';
import { FC } from 'react';
import UserInfo from '../../features/user/UserInfo';
import Login from '../authentication/login';
import Logout from '../authentication/logout';
import { AppBar } from '@mui/material';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <nav>
        <ul>
          {isAuthenticated ? (
            <>
              {user && (
                <>
                  <li>
                    <Link to={'/'}>Home</Link>
                  </li>
                  <li>
                    <UserInfo user={user} />
                  </li>
                  <li>
                    <Link to={'/goals'}>Your goals</Link>
                  </li>
                </>
              )}
              <li>
                <Logout />
              </li>
            </>
          ) : (
            <Login />
          )}
        </ul>
      </nav>
    </AppBar>
  );
};

export default Header;
