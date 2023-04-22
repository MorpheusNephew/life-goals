import { FC } from 'react';
import { GoalDto } from '../../services/api/types';
import { Box, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

interface GoalViewProps {
  goal: GoalDto;
}

const GoalView: FC<GoalViewProps> = ({ goal }) => {
  const { formatDate } = useIntl();

  return (
    <Box sx={{border: 1, margin: 1, padding: 1}}>
      <Typography>
        {goal.text} - {formatDate(goal.createdDate)}
      </Typography>
      <Typography>{goal.advice}</Typography>
    </Box>
  );
};

export default GoalView;
