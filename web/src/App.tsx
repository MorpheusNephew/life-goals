import React from 'react';
import Header from './components/Header';
import User from './features/user/User';
import Login from './components/authentication/Login';
import Logout from './components/authentication/Logout';
import { useAuth0 } from '@auth0/auth0-react';

const App = () => {
  const { isAuthenticated } = useAuth0();

  const AuthButton = () => (isAuthenticated ? <Logout /> : <Login />);

  return (
    <>
      <Header>
        This is the header
        <User />
        <AuthButton />
        All the way to here header
      </Header>
      <main>This is the main content</main>
    </>
  );
};

export default App;
