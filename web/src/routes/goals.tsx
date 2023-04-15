import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import Loading from '../components/loading';
import { getUserGoals } from '../services/api';
import { GoalDto } from '../services/api/types';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const messages = defineMessages({
  personalGoalsHeader: {
    id: 'app.goals.personalGoalsHeader',
    defaultMessage: 'Personal Goals',
  },
  noPersonalGoals: {
    id: 'app.goals.noPersonalGoals',
    defaultMessage: "You don't have any goals",
  },
  newGoalButtonText: {
    id: 'app.goals.newGoalButtonText',
    defaultMessage: 'New goal',
  },
});

const showGoal = (goal: any) => <p key={goal.id}>{goal.text}</p>;

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
      <Box>
        <h2>{formatMessage(messages.personalGoalsHeader)}</h2>
        <Link to={'/goals/new'}>
          <Button variant='outlined'>
            {formatMessage(messages.newGoalButtonText)}
          </Button>
        </Link>
      </Box>
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
