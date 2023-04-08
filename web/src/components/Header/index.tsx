import { useAuth0 } from '@auth0/auth0-react';
import { FC } from 'react';
import UserInfo from '../../features/user/UserInfo';
import Login from '../authentication/Login';
import Logout from '../authentication/Logout';

const Header: FC = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <header>
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
    </header>
  );
};

export default Header;
