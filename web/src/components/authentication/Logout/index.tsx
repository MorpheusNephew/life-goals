import { useAuth0 } from '@auth0/auth0-react';
import { FC } from 'react';

const Logout: FC = () => {
  const { logout } = useAuth0();

  return <button onClick={() => logout()}>Logout</button>;
};

export default Logout;
