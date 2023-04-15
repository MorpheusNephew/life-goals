import { defineMessages, useIntl } from 'react-intl';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { getAllPublicGoals } from '../services/api';

export const loader: LoaderFunction = async () => {
  const publicGoals = await getAllPublicGoals();

  return { publicGoals };
};

const messages = defineMessages({
  publicGoalsHeader: {
    id: 'app.home.publicGoalsHeader',
    defaultMessage: "User's Goals",
  },
  noPublicGoals: {
    id: 'app.home.noPublicGoals',
    defaultMessage: "No user's goals posted",
  },
});

const Home = () => {
  const { formatMessage } = useIntl();
  const { publicGoals } = useLoaderData() as { publicGoals: object[] };

  const showGoal = (goal: any) => <p>{goal.text}</p>;

  return (
    <>
      <section>
        <h2>{formatMessage(messages.publicGoalsHeader)}</h2>
        {publicGoals && publicGoals.length > 0 ? (
          publicGoals?.map(showGoal)
        ) : (
          <p>{formatMessage(messages.noPublicGoals)}</p>
        )}
      </section>
    </>
  );
};

export default Home;
