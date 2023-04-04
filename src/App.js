import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import center1 from './imgs/본관1층.png';
import './App.scss';

function App() {
  const [map, setMap] = useState("center"); // center, auditorium, domitory 3속성
  const [floor, setFloor] = useState(1);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to={'/map'} replace />} />
          <Route path="/map" element={<><Nav /><Map location={map} floor={floor} /></>} />
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
      <div onMouseOver={e => setMapHov(true)} onMouseLeave={e => { setMapHov(false) }}><a href={"/map"}>우리학교 지도</a></div>&nbsp;&nbsp;
      <div><a href={"/teach"} >우리학교 교사</a></div>
    </div>
    {
      mapHov && <div className="mapHov" onMouseOver={e => setMapHov(true)} onMouseLeave={e => setMapHov(false)}>
        <a href="/map/center"><div>본관</div></a><hr />
        <a href="/map/auditorium"><div>금봉관</div></a><hr />
        <a href="/map/domitory"><div>기숙사</div></a>
      </div>
    }
    <div className="right">
      {!logined ? <>
        <a href='/login'><button>로그인</button></a>&nbsp;
        <button onClick={e => setLogined(e => !e)}>회원가입</button></>
        : <>
          <div className="clientInfo">
            <span>홍길동</span>&nbsp;&nbsp;
            <button onClick={e => setLogined(e => !e)}>로그아웃</button>
          </div>
        </>
      }</div>
  </div >;
}

function Map({ location, floor }) {
  return <div className="map">
    <div className="img">
      {location === 'center' && floor === 1 && <img src={center1} alt={'center1'} />}
    </div>
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
