import React from "react";
import logo from '../imgs/logo.png';

export default function Welcome() {
  const time = new Date();
  return <div className="welcome">
    <div className="main">
      <div className="img">
        <img src={logo} alt='logo' />
      </div>
      <div className="buttons">
        <button onClick={e => {
          localStorage.setItem('logininfo', 'Guest');
          localStorage.setItem('logintime', time.toLocaleTimeString());
          window.location.href = '/map'
        }}>게스트로 시작하기</button>
        <button onClick={e => window.location.href = '/login'}>학교소속 인증하기</button>
      </div>
    </div>
  </div>;
}