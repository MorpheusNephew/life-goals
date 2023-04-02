import { useAuth0 } from '@auth0/auth0-react';
import { FC } from 'react';

const Login: FC = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Login</button>;
};

export default Login;
