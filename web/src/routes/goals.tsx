import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import Loading from '../components/loading';

const messages = defineMessages({
  personalGoalsHeader: {
    id: 'app.goals.personalGoalsHeader',
    defaultMessage: 'Your Personal Goals',
  },
  noPersonalGoals: {
    id: 'app.goals.noPersonalGoals',
    defaultMessage: "You don't have any goals",
  },
});

const showGoal = (goal: any) => <p>{goal.text}</p>;

const Goals = () => {
  const [privateResponse, setPrivateResponse] = useState<object[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { formatMessage } = useIntl();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
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
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [getAccessTokenSilently, setIsLoading]);
  return (
    <section>
      <h2>{formatMessage(messages.personalGoalsHeader)}</h2>
      {isLoading ? (
        <Loading />
      ) : privateResponse && privateResponse.length > 0 ? (
        privateResponse?.map(showGoal)
      ) : (
        <p>{formatMessage(messages.noPersonalGoals)}</p>
      )}
    </section>
  );
};

export default withAuthenticationRequired(Goals);
