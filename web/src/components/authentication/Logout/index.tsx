import { useAuth0 } from '@auth0/auth0-react';
import { FC } from 'react';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  logoutButton: {
    id: 'app.logout.logoutButton',
    defaultMessage: 'Logout',
    description: 'Button used to log out of Life Goals',
  },
});

const Logout: FC = () => {
  const { logout } = useAuth0();
  const { formatMessage } = useIntl();

  return (
    <button onClick={() => logout()}>
      {formatMessage(messages.logoutButton)}
    </button>
  );
};

export default Logout;
