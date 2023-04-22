import { FC } from 'react';
import { GoalDto } from '../../services/api/types';
import { Box, Typography } from '@mui/material';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  prompt: {
    id: 'app.goalview.prompt',
    defaultMessage: 'Prompt:'
  },
  advice: {
    id: 'app.goalView.advice',
    defaultMessage: 'Advice:'
  }
});

interface GoalViewProps {
  goal: GoalDto;
}

const GoalView: FC<GoalViewProps> = ({ goal }) => {
  const { formatDate, formatMessage } = useIntl();

  return (
    <Box sx={{ border: 1, margin: 1, padding: 1 }}>
      <Typography>
        <strong>{formatMessage(messages.prompt)}</strong> {goal.text} -{' '}
        {formatDate(goal.createdDate)}
      </Typography>
      <Typography>
       <strong>{formatMessage(messages.advice)}</strong> {goal.advice}
      </Typography>
    </Box>
  );
};

export default GoalView;
