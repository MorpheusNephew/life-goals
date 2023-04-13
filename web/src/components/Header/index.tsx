import { useAuth0 } from '@auth0/auth0-react';
import { FC } from 'react';
import UserInfo from '../../features/user/UserInfo';
import Login from '../authentication/login';
import Logout from '../authentication/logout';
import { List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  homeLink: {
    id: 'app.header.homeLink',
    defaultMessage: 'Home',
    description: 'Link back to home page',
  },
  goalsLink: {
    id: 'app.header.goalsLink',
    defaultMessage: 'Your Goals',
    description: 'Link to goals page',
  },
});

const Header: FC = () => {
  const { isAuthenticated, user } = useAuth0();
  const { formatMessage } = useIntl();

  return (
    <nav>
      <List>
        {isAuthenticated ? (
          <>
            {user && (
              <>
                <ListItem>
                  <UserInfo user={user} />
                </ListItem>
                <ListItem>
                  <Link to={'/'}>
                    <button>{formatMessage(messages.homeLink)}</button>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to={'/goals'}>
                    <button>{formatMessage(messages.goalsLink)}</button>
                  </Link>
                </ListItem>
              </>
            )}
            <ListItem>
              <Logout />
            </ListItem>
          </>
        ) : (
          <Login />
        )}
      </List>
    </nav>
  );
};

export default Header;
