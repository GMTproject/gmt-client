import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "styles/App.scss";
import "styles/Nav.scss";
import Map from "components/Map";
import Welcome from "components/Welcome";
import Login from "components/Login";
import Teach from "components/Teach";
import About from "components/About";
import Nav from "components/Nav";
import NotFound from "components/404";

function App() {
  // 페이지로 보여주는 부분 반드시 필요함. 임의로 삭제하거나 수정하지 말 것.
  const [structure, setStructure] = useState("center"); // center, goldencrown, domitory 3속성
  const [floor, setFloor] = useState(1);
  useEffect((e) => {
    if (localStorage.getItem("structure")) {
      // 만약 로컬스토리지에 "이전에 저장한 값"이 있을 경우 그 값으로 대체.
      setStructure(localStorage.getItem("structure"));
    }
  }, []);

  const navTo = (component, isRedirect) => {
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
  };

  return (
    <div className="App">
      <BrowserRouter>
        {/* 페이지 이동하는 부분 가급적 건드리지 마시오. */}
        <Routes>
          <Route path="/" element={navTo('/map', true)} />
          <Route path="*" element={<NotFound />} />
          <Route path="/map" element={<Map structure={structure} floor={floor} setFloor={setFloor} />} />
          <Route path="/teach" element={navTo(<><Nav /><Teach /></>, false)} />
          <Route path="/login" element={<><Login /></>}
          />
          <Route path="/welcome" element={<><Welcome /></>} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;