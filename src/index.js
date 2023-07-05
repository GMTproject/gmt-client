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
    clientId='d615d1682dd44e3a9b49e08cb561ef8985013e572ad14417b8b96c2ceab106f5'
    /*
      가우스 로그인 후 code를 서버로 전송후 
      accessToken, refreshToken, accessTokenExpireDate, refreshTokenExpireDate 
      이들을 로컬에 저장
      accessToken으로 서버에 기본값으로 진행
    */
    onSuccess={async e => localStorage.setItem('code', e)}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </GauthProvider>
);

reportWebVitals();
