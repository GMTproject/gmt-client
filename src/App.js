import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to={'/map/center/1'} replace />} />
          <Route path="/map" element={<Navigate to={'/map/center/1'} replace />} />
          <Route path="/map/center" element={<Navigate to={'/map/center/1'} replace />} />
          <Route path="/map/auditorium" element={<Navigate to={'/map/auditorium/1'} replace />} />
          <Route path="/map/domitory" element={<Navigate to={'/map/domitory/1'} replace />} />
          <Route path="/map/center/1" element={<><Nav /><MapCenterFir /></>}></Route>
          <Route path="/map/center/2" element={<><Nav /><MapCenterSec /></>}></Route>
          <Route path="/map/center/3" element={<><Nav /><MapCenterThr /></>}></Route>
          <Route path="/map/center/4" element={<><Nav /><MapCenterFou /></>}></Route>
          <Route path="/map/auditorium/1" element={<><Nav /><MapAuditorium /></>}></Route>
          <Route path="/map/domitory/1" element={<><Nav /><MapDomitori /></>}></Route>
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

function MapCenterFir() {
  return <div className="mapCenter">
    Center First Floor
  </div>;
}

function MapCenterSec() {
  return <div className="mapCenter">
    Center Second Floor
  </div>;
}

function MapCenterThr() {
  return <div className="mapCenter">
    Center Third Floor
  </div>;
}

function MapCenterFou() {
  return <div className="mapCenter">
    Center Fourth Floor
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

function MapDomitori() {
  return <div className="mapDomitori">
    Domitory
  </div>;
}

function MapAuditorium() {
  return <div className="mapAuditorium">
    Auditorium
  </div>;
}