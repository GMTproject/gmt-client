import React from "react";
import logo from "../imgs/logo.png";
import arrow from "../imgs/화살표.png";
import "../styles/Welcome.scss";

const Welcome = () => {
  const time = new Date();
  return (
    <div className="welcome">
      <div className="main">
        <div className="img">
          <img src={logo} alt="logo" />
        </div>
        <div className="buttons">
          <button
            className="light-button"
            onClick={(e) => {
              localStorage.setItem("logininfo", "Guest");
              localStorage.setItem("logintime", time.toLocaleTimeString());
              window.location.href = "/map";
            }}
          >
            게스트로 시작하기
          </button>
          <button onClick={(e) => (window.location.href = "/login")}>
            학교소속 인증하기
          </button>
        </div>
      </div>
      <div className="about">
        <a href="./about">
          GMT 더 알아보러 가기<img src={arrow} alt="asdf"></img>
        </a>
      </div>
    </div>
  );
}

export default Welcome;
