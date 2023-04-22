import { defineMessages, useIntl } from 'react-intl';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { getAllPublicGoals } from '../services/api';
import GoalView from '../components/goal';
import { GoalDto } from '../services/api/types';

export const loader: LoaderFunction = async () => {
  const publicGoals = await getAllPublicGoals();

  return { publicGoals };
};

const messages = defineMessages({
  publicGoalsHeader: {
    id: 'app.home.publicGoalsHeader',
    defaultMessage: 'All Public Goals',
  },
  noPublicGoals: {
    id: 'app.home.noPublicGoals',
    defaultMessage: 'No public goals posted',
  },
});

const Home = () => {
  const { formatMessage } = useIntl();
  const { publicGoals } = useLoaderData() as { publicGoals: GoalDto[] };

  return (
    <>
      <section>
        <h2>{formatMessage(messages.publicGoalsHeader)}</h2>
        {publicGoals && publicGoals.length > 0 ? (
          publicGoals?.map((goal) => <GoalView key={goal.id} goal={goal} />)
        ) : (
          <p>{formatMessage(messages.noPublicGoals)}</p>
        )}
      </section>
    </>
  );
};

export default Home;
