import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  loading: {
    id: 'app.loading',
    defaultMessage: 'Loading...',
  },
});

const Loading = () => {
  const { formatMessage } = useIntl();

  return <>{formatMessage(messages.loading)}</>;
};

export default Loading;
