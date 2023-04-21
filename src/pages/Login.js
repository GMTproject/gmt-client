import React from "react";

export default function Login() { //로그인 화면 페이지
  const time = new Date();
  return <div className="login">
    <button onClick={e => {
      localStorage.setItem('logininfo', 'Guest');
      localStorage.setItem('logintime', time.toLocaleTimeString());
      window.location.href = '/map'
    }}>게스트 로그인</button>
  </div>;
}

