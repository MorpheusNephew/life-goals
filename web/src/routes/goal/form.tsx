import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { FC } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { GoalDto, PostGoalDto, PutGoalDto } from '../../services/api/types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { createUserGoal, updateUserGoal } from '../../services/api';
import { useAuth0 } from '@auth0/auth0-react';

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
  goalCreateButtonText: {
    id: 'app.goal.form.goalCreateButtonText',
    defaultMessage: 'Create',
  },
  goalUpdateButtonText: {
    id: 'app.goal.form.goalUpdateButtonText',
    defaultMessage: 'Update',
  },
});

interface GoalFormProps {
  goal?: GoalDto;
}

type FormInput = PostGoalDto | PutGoalDto;

const GoalForm: FC<GoalFormProps> = ({ goal }) => {
  const { formatMessage } = useIntl();
  const { getAccessTokenSilently } = useAuth0();
  const { register, handleSubmit } = useForm<FormInput>({
    defaultValues: {
      text: goal?.text ?? '',
      public: goal?.public ?? false,
    },
  });

  const saveGoal = goal
    ? (formInput: PutGoalDto) =>
        updateUserGoal(getAccessTokenSilently)(goal.id, formInput)
    : (formInput: PostGoalDto) =>
        createUserGoal(getAccessTokenSilently)(formInput);

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    saveGoal({ ...data, text: data.text.trim() });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <Box>
        <Button variant='contained' type='submit'>
          {formatMessage(
            goal ? messages.goalUpdateButtonText : messages.goalCreateButtonText
          )}
        </Button>
      </Box>
    </form>
  );
};

export default GoalForm;
