import { withAuthenticationRequired } from '@auth0/auth0-react';

const Goals = () => {
  return <h1>Goals</h1>;
};

export default withAuthenticationRequired(Goals);
