import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';

const Home = () => {
  const [publicResponse, setPublicResponse] = useState<string>();
  const [privateResponse, setPrivateResponse] = useState<string>();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      const publicGoals = await fetch('/api/public/goals');

      setPublicResponse(await publicGoals.text());
    })();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    (async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          },
        });

        const authHeaders = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const privateGoals = await fetch('/api/private/goals', authHeaders);

        setPrivateResponse(await privateGoals.text());

        const userInfo = await fetch('/api/private/users/me', authHeaders);

        console.log({ userInfo: await userInfo.json() });
      } catch (e) {
        console.warn(e);
      }
    })();
  }, [getAccessTokenSilently, isAuthenticated]);

  return (
    <>
      This is the main content
      <section>
        <h2>Public</h2>
        <p>{publicResponse}</p>
      </section>
      <section>
        <h2>Private</h2>
        <p>{privateResponse}</p>
      </section>
    </>
  );
};

export default Home;
