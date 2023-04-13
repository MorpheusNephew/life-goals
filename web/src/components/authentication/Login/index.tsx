import { useAuth0 } from '@auth0/auth0-react';
import { FC } from 'react';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  loginButton: {
    id: 'app.login.loginButton',
    defaultMessage: 'Login',
    description: 'Button used to log into Life Goals',
  },
});

const Login: FC = () => {
  const { loginWithRedirect } = useAuth0();
  const { formatMessage } = useIntl();

  return (
    <button onClick={() => loginWithRedirect()}>
      {formatMessage(messages.loginButton)}
    </button>
  );
};

export default Login;
