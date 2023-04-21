import React from "react";

export default function Welcome() {
  const time = new Date();
  return <div className="welcome">
    welcome
    <button onClick={e => {
      localStorage.setItem('logininfo', 'Guest');
      localStorage.setItem('logintime', time.toLocaleTimeString());
      window.location.href = '/map'
    }}>게스트 로그인</button>
    <button onClick={e => window.location.href = '/login'}>로그인 하러가기</button>
  </div>;
}