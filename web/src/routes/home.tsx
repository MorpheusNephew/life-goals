import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';

const Home = () => {
  const [publicResponse, setPublicResponse] = useState<object[]>();
  const [privateResponse, setPrivateResponse] = useState<object[]>();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const showGoal = (goal: any) => <p>{goal.text}</p>;

  useEffect(() => {
    (async () => {
      const publicGoals = await fetch('/api/public/goals');

      setPublicResponse(await publicGoals.json());
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

        setPrivateResponse(await privateGoals.json());

        const userInfo = await fetch('/api/private/users/me', authHeaders);

        console.log({ userInfo: await userInfo.json() });
      } catch (e) {
        console.warn(e);
      }
    })();
  }, [getAccessTokenSilently, isAuthenticated]);

  return (
    <>
      <section>
        <h2>Public</h2>
        {publicResponse && publicResponse.length > 0 ? (
          publicResponse?.map(showGoal)
        ) : (
          <p>No public goals posted</p>
        )}
      </section>
      {isAuthenticated && (
        <section>
          <h2>Private</h2>
          {privateResponse && privateResponse.length > 0 ? (
            privateResponse?.map(showGoal)
          ) : (
            <p>You have no published goals</p>
          )}
        </section>
      )}
    </>
  );
};

export default Home;
