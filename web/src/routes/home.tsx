import { useState, useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';

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
  const [publicResponse, setPublicResponse] = useState<object[]>();
  const { formatMessage } = useIntl();

  const showGoal = (goal: any) => <p>{goal.text}</p>;

  useEffect(() => {
    (async () => {
      const publicGoals = await fetch('/api/public/goals');

      setPublicResponse(await publicGoals.json());
    })();
  }, []);

  return (
    <>
      <section>
        <h2>{formatMessage(messages.publicGoalsHeader)}</h2>
        {publicResponse && publicResponse.length > 0 ? (
          publicResponse?.map(showGoal)
        ) : (
          <p>{formatMessage(messages.noPublicGoals)}</p>
        )}
      </section>
    </>
  );
};

export default Home;
