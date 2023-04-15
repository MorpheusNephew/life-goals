import { Box, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { FC } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { GoalDto } from '../../services/api/types';
import { useForm, SubmitHandler } from 'react-hook-form';

const messages = defineMessages({
  goalText: {
    id: 'app.goal.form.goalText',
    defaultMessage: 'Your goal prompt',
  },
  goalPublic: {
    id: 'app.goal.form.goalPublic',
    defaultMessage: 'Public',
  },
  goalAdvice: {
    id: 'app.goal.form.goalAdvice',
    defaultMessage: '"Advice" (Provided by ChatGPT)',
  },
  goalCreated: {
    id: 'app.goal.form.goalCreated',
    defaultMessage: 'Created',
  },
});

interface GoalFormProps {
  goal?: GoalDto;
}

type FormInput = Pick<GoalDto, 'text' | 'public'>;

const GoalForm: FC<GoalFormProps> = ({ goal }) => {
  const { formatMessage } = useIntl();
  const { register } = useForm<FormInput>({
    defaultValues: {
      text: goal?.text ?? '',
      public: goal?.public ?? false,
    },
  });

  return (
    <form>
      <Box>
        <TextField
          {...register('text', { required: true })}
          label={formatMessage(messages.goalText)}
          fullWidth
        />
      </Box>
      <Box>
        <FormControlLabel
          control={<Checkbox {...register('public')} />}
          label={formatMessage(messages.goalPublic)}
        />
      </Box>
      {goal && (
        <>
          <Box>
            <TextField
              value={goal.advice}
              label={formatMessage(messages.goalAdvice)}
              disabled
            />
          </Box>
          <Box>
            <TextField
              value={goal.createdDate}
              label={formatMessage(messages.goalCreated)}
              disabled
            />
          </Box>
        </>
      )}
    </form>
  );
};

export default GoalForm;
