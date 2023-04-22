import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { FC, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { GoalDto, PostGoalDto, PutGoalDto } from '../../services/api/types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { createUserGoal, updateUserGoal } from '../../services/api';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const messages = defineMessages({
  goalText: {
    id: 'app.goal.form.goalText',
    defaultMessage: 'Your goal',
  },
  goalPublic: {
    id: 'app.goal.form.goalPublic',
    defaultMessage: 'Public',
  },
  goalCreateButtonText: {
    id: 'app.goal.form.goalCreateButtonText',
    defaultMessage: 'Create',
  },
});

type FormInput = PostGoalDto | PutGoalDto;

const GoalForm: FC = () => {
  const { formatMessage } = useIntl();
  const { getAccessTokenSilently } = useAuth0();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<FormInput>({
    defaultValues: {
      text: '',
      public: false,
    },
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setIsSubmitting(true);
    try {
      const returnedGoal = await createUserGoal(getAccessTokenSilently)({
        ...data,
        text: data.text.trim(),
      });

      navigate('/goals/');
    } catch (e) {
      console.warn({ error: e });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSubmitting}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
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
        <Box>
          <Button variant='contained' type='submit' disabled={isSubmitting}>
            {formatMessage(messages.goalCreateButtonText)}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default GoalForm;
