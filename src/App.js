import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import "./styles/App.scss";
import "./styles/Nav.scss";
import Map from "./pages/Map";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Teach from "./pages/Teach";
import logo from "./imgs/logo.png";
import About from "./pages/About";

export default function App() {
  // 페이지로 보여주는 부분 반드시 필요함. 임의로 삭제하거나 수정하지 말 것
  const [structure, setStructure] = useState("center"); // center, goldencrown, domitory 3속성
  const [floor, setFloor] = useState(1);
  useEffect((e) => {
    if (localStorage.getItem("structure")) {
      // 만약 로컬스토리지에 "이전에 저장한 값"이 있을 경우 그 값으로 대체.
      setStructure(localStorage.getItem("structure"));
    }
  }, []);

  function navTo(component, isRedirect) {
    // 원하는 위치로 리다이렉트 or 컴포넌트를 보여주기 or 웰컴페이지로 돌아가기
    if (localStorage.getItem("logininfo") && localStorage.getItem("logininfo") !== "Guest" && isRedirect) {
      // 리다이렉트를 하고 싶을 때
      return <Navigate to={component} replace />;
    } else if (
      localStorage.getItem("logininfo") &&
      localStorage.getItem("logininfo") !== "Guest" &&
      !isRedirect
    ) {
      // 컴포넌트를 반환하고 싶을 때
      return component;
    }
    return <Navigate to={"/welcome"} replace />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        {/* 페이지 이동하는 부분 가급적 건드리지 마시오. */}
        <Routes>
          <Route path="*" element={navTo('/map', true)} />
          <Route path="/map" element={<> {/* 이쪽은 로그인 변환용으로 일단 냅둠 */}
            <Nav setStructure={setStructure} />
            <Map structure={structure} floor={floor} setFloor={setFloor} setStructure={setStructure} />
          </>} />
          <Route path="/teach" element={navTo(<><Nav setStructure={setStructure} /><Teach /></>, false)} />
          <Route path="/login" element={<><Login /></>} />
          <Route path="/welcome" element={<><Welcome /></>} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Nav({ setStructure }) {
  // 네비게이션 바
  const [logined, setLogined] = useState(false);
  const [mapHov, setMapHov] = useState(false);
  const time = new Date(); // 로그인 시간 저장
  useEffect((e) => {
    if (localStorage.getItem("logininfo") !== "Guest") {
      setLogined(localStorage.getItem("logininfo"));
    } else {
      setLogined(false);
    }
  }, []);

  function setHere(structure) {
    // 로컬스토리지에 저장하고 페이지 이동하는 함수
    setStructure((e) => structure);
    localStorage.setItem("structure", structure);
  }

  return <div className="navigator">
    <div className="left">
      <img src={logo} alt="Logo" />
    </div>
    <div className="middle-text">
      {/* 페이지 이동이 가능하게 하는 버튼 */}
      <div
        onMouseOver={(e) => setMapHov(true)}
        onMouseLeave={(e) => {
          setMapHov(false);
        }}
      >
        <a href={"/map"}>학교 지도</a>
      </div>
      <div>
        <a href={"/teach"}>학교 교사</a>
      </div>
    </div>
    {mapHov && (
      <div
        className="mapHov"
        onMouseOver={(e) => setMapHov(true)}
        onMouseLeave={(e) => setMapHov(false)}
      >
        {/* 로컬스토리지에 위치 값을 저장하는 버튼 */}
        <a href="/map" onClick={(e) => setHere("center")}>
          <div>본관</div>
        </a>
        <hr />
        <a href="/map" onClick={(e) => setHere("goldencrown")}>
          <div>금봉관</div>
        </a>
        <hr />
        <a href="/map" onClick={(e) => setHere("domitory")}>
          <div>기숙사</div>
        </a>
      </div>
    )}
    <div className="right">
      {/* 오른쪽 로그인 버튼 부분 모음 */}
      {!logined ? (
        <>
          <span>Guest</span>&nbsp;&nbsp;
          <Link to={"/login"}>
            <button
              onClick={(e) => {
                // 회원가입하는 버튼 (임시) 추후 페이지 이동 로그인 페이지 이동하는 버튼
                setLogined((e) => "Guest");
                localStorage.setItem("logininfo", "Guest");
                localStorage.setItem("logintime", time.toLocaleTimeString());
              }}
            >
              Login
            </button>
          </Link>
        </>
      ) : (
        <>
          <div className="clientInfo">
            <span>{logined}</span>&nbsp;&nbsp;
            <button
              onClick={(e) => {
                // 로그아웃하는 버튼
                if (window.confirm("정말로?")) {
                  // 로그아웃할 건지 재확인
                  setLogined((e) => false);
                  localStorage.clear(); // 로그아웃 시 저장된 모든 정보 삭제
                  alert("로그아웃됨");
                  window.location.href = "/welcome";
                }
              }}
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  </div>;
}

