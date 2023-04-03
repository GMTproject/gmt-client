import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to={'/map'} replace />} />
          <Route path="/map" element={<><Nav /><Map /></>} />
          <Route path="/teach" element={<><Nav /><Teach /></>} />
          <Route path="/login" element={<><Login /></>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

function Nav(props) {
  const [logined, setLogined] = useState(false);
  const [mapHov, setMapHov] = useState(false);
  return <div className="navigator">
    <div className="m-text">
      <div onMouseOver={e => setMapHov(true)} onMouseLeave={e => { setMapHov(false) }}><a href={"/home"}>우리학교 지도</a></div>&nbsp;&nbsp;
      <div><a href={"/teach"} >우리학교 교사</a></div>
    </div>
    {
      mapHov && <div className="mapHov" onMouseOver={e => setMapHov(true)} onMouseLeave={e => setMapHov(false)}>
        <p>본관</p>
        <p>금봉관</p>
        <p>기숙사</p>
      </div>
    }
    <div className="right">
      {!logined ? <>
        <a href='/login'><button>로그인</button></a>&nbsp;
        <button onClick={e => setLogined(e => !e)}>회원가입</button></>
        : <>
          <div className="clientInfo"></div>
        </>
      }</div>
  </div >;
}

function Map() {
  return <div className="map">
    map
  </div>;
}

function Teach() {
  return <div className="teach">
    teach
  </div>;
}

function Login() {
  return <div className="login">
    login
  </div>;
}