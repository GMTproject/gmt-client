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
    clientId='4c2a7abb50c64ebba43e8f38e4409d9fda257fcc153b442a82afdea43c411d24'
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
