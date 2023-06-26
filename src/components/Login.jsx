import { GauthLoginButton } from "@msg-team/gauth-react";
import React from "react";
import 'styles/Login.scss';

const Login = () => { //로그인 화면 페이지
  const time = new Date();
  return <div className="login">
    <GauthLoginButton />
  </div>;
}

export default Login;