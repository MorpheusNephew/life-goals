import { withAuthenticationRequired } from '@auth0/auth0-react';
import { defineMessages, useIntl } from 'react-intl';
import GoalForm from './form';

const messages = defineMessages({
  createGoalHeader: {
    id: 'app.goal.createGoalHeader',
    defaultMessage: 'Create Goal',
  },
});

const Goal = () => {
  const { formatMessage } = useIntl();

  return (
    <section>
      <h2>{formatMessage(messages.createGoalHeader)}</h2>
      <GoalForm />
    </section>
  );
};

export default withAuthenticationRequired(Goal);
