import React from 'react';
import Header from './components/Header';
import User from './features/user/User';
import Login from './components/authentication/Login';
import Logout from './components/authentication/Logout';

const App = () => {
  const loggedIn = false;
  const AuthButton = () => (loggedIn ? <Logout /> : <Login />);

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
