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
    redirectUri='http://localhost:3000/map'
    clientId='34257d7cfbfb4b08abba5e2550fd37ec5e1f692dbde74e6f943f2f8ef282cda2'
    onSuccess={async e => console.log(e)}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </GauthProvider>
);

reportWebVitals();
