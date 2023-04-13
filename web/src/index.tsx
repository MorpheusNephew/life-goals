import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import { CssBaseline } from '@mui/material';
import Routes from './routes';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { IntlProvider } from 'react-intl';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Auth0Provider
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID ?? ''}
    domain={process.env.REACT_APP_AUTH0_DOMAIN ?? ''}
    cacheLocation="localstorage"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    }}
  >
    <Provider store={store}>
      <CssBaseline />
      <IntlProvider locale="en" defaultLocale="en">
        <Routes />
      </IntlProvider>
    </Provider>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
