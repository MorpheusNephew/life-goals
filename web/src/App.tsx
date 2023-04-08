import { useEffect, useState } from 'react';
import Header from './components/Header';
import { useAuth0 } from '@auth0/auth0-react';

const App = () => {
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

        const privateGoals = await fetch('/api/private/goals', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setPrivateResponse(await privateGoals.text());
      } catch (e) {
        console.warn(e);
      }
    })();
  }, [getAccessTokenSilently, isAuthenticated]);

  return (
    <>
      <Header />
      <main>
        This is the main content
        <section>
          <h2>Public</h2>
          <p>{publicResponse}</p>
        </section>
        <section>
          <h2>Private</h2>
          <p>{privateResponse}</p>
        </section>
      </main>
    </>
  );
};

export default App;
