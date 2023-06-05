import React from "react";
import 'styles/Login.scss';

const Login = () => { //로그인 화면 페이지
  const time = new Date();
  return <div className="login">
    <button onClick={e => {
      localStorage.setItem('logininfo', 'User');
      localStorage.setItem('logintime', time.toLocaleTimeString());
      window.location.href = '/success';
    }}>일반 로그인</button>
  </div>;
}

export default Login;