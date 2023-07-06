import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import store from 'redux/mapstore';
import { GauthProvider } from '@msg-team/gauth-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GauthProvider
    redirectUri={process.env.REACT_APP_REDIRECT_URL}
    clientId={process.env.REACT_APP_CLIENT_ID}
    onSuccess={async e => {
      if (e) {
        localStorage.setItem('code', e);
      }
    }}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </GauthProvider>
);

reportWebVitals();
