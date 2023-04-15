import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { getUserGoal } from '../../services/api';
import Loading from '../../components/loading';
import GoalForm from './form';
import { GoalDto } from '../../services/api/types';

interface LoaderResponse {
  goalId?: string;
  createNew: boolean;
}

export const loader: LoaderFunction = ({ params: { goalId } }) => {
  console.log({ goalId });

  const createNew = goalId === 'new';

  return { goalId: createNew ? undefined : goalId, createNew };
};

const messages = defineMessages({
  createGoalHeader: {
    id: 'app.goal.createGoalHeader',
    defaultMessage: 'Create Goal',
  },
  editGoalHeader: {
    id: 'app.goal.editGoalHeader',
    defaultMessage: 'Edit Goal',
  },
  goalNotFound: {
    id: 'app.goal.goalNotFound',
    defaultMessage: 'Goal not found',
  },
});

const Goal = () => {
  const { formatMessage } = useIntl();
  const { getAccessTokenSilently } = useAuth0();
  const { goalId, createNew } = useLoaderData() as LoaderResponse;
  const [goal, setGoal] = useState<GoalDto>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        if (!goalId) {
          return;
        }

        const userGoal = await getUserGoal(getAccessTokenSilently)(goalId);

        setGoal(userGoal);
      } catch (e) {
        console.warn({ error: e });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [goalId, getAccessTokenSilently]);

  return (
    <section>
      <h2>
        {formatMessage(
          createNew ? messages.createGoalHeader : messages.editGoalHeader
        )}
      </h2>
      {isLoading ? (
        <Loading />
      ) : createNew ? (
        <GoalForm />
      ) : !goal ? (
        <p>{formatMessage(messages.goalNotFound)}</p>
      ) : (
        <GoalForm goal={goal} />
      )}
    </section>
  );
};

export default withAuthenticationRequired(Goal);
