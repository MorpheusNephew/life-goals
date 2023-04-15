import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import Loading from '../components/loading';
import { getUserGoals } from '../services/api';
import { GoalDto } from '../services/api/types';

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
  const [goals, setGoals] = useState<GoalDto[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { formatMessage } = useIntl();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      try {
        const privateGoals = await getUserGoals(getAccessTokenSilently)();

        setGoals(privateGoals);
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
      ) : goals && goals.length > 0 ? (
        goals?.map(showGoal)
      ) : (
        <p>{formatMessage(messages.noPersonalGoals)}</p>
      )}
    </section>
  );
};

export default withAuthenticationRequired(Goals);
