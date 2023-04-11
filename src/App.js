import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import center1 from './imgs/본관1층.png';
import goldencrown1 from './imgs/금봉관1층.png';
import domitory1 from './imgs/기숙사1층.png';
import './App.scss';

function App() {
  const [structure, setStructure] = useState("center"); // center, goldencrown, domitory 3속성
  const [floor, setFloor] = useState(1);
  useEffect(e => {
    if (localStorage.getItem('structure')) { // 만약 로컬스토리지에 "이전으로 부터 넘겨받은 값"이 있을 경우 그 값으로 대체.
      setStructure(localStorage.getItem('structure'));
    }
  }, []);
  return (
    <div className="App">
      <BrowserRouter> {/* 페이지 이동하는 부분 가급적 건드리지 마시오. */}
        <Routes>
          <Route path="*" element={<Navigate to={'/map'} replace />} />
          <Route path="/map" element={<><Nav setStructure={setStructure} /><Map structure={structure} floor={floor} setFloor={setFloor} setStructure={setStructure} /></>} />
          <Route path="/teach" element={<><Nav setStructure={setStructure} /><Teach /></>} />
          <Route path="/login" element={<><Login /></>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

function Nav({ setStructure }) { // 네비게이션 바
  const [logined, setLogined] = useState(false);
  const [mapHov, setMapHov] = useState(false);
  const time = new Date(); // 로그인 시간 저장
  useEffect(e => {
    if (localStorage.getItem('logininfo')) {
      setLogined(localStorage.getItem('logininfo'));
    }
  }, []);

  function setStorage(structure) { // 로컬스토리지에 저장하고 페이지 이동하는 방식
    setStructure(e => structure);
    localStorage.setItem('structure', structure);
  }

  return <div className="navigator">
    <div className="m-text">
      <div onMouseOver={e => setMapHov(true)} onMouseLeave={e => { setMapHov(false) }}><a href={"/map"}>우리학교 지도</a></div>&nbsp;&nbsp;
      <div><a href={"/teach"} >우리학교 교사</a></div>
    </div>
    {
      mapHov && <div className="mapHov" onMouseOver={e => setMapHov(true)} onMouseLeave={e => setMapHov(false)}>
        <a href="/map" onClick={e => setStorage('center')}><div>본관</div></a><hr />
        <a href="/map" onClick={e => setStorage('goldencrown')}><div>금봉관</div></a><hr />
        <a href="/map" onClick={e => setStorage('domitory')}><div>기숙사</div></a>
      </div>
    }
    <div className="right"> {/* 오른쪽 로그인 버튼 부분 모음 */}
      {!logined ? <>
        <a href='/login'><button>로그인</button></a>&nbsp;
        <button onClick={e => { // 로그인하는 부분
          setLogined(e => '홍길동');
          localStorage.setItem('logininfo', '홍길동');
          localStorage.setItem('logintime', time.toLocaleTimeString());
        }}>회원가입</button></>
        : <>
          <div className="clientInfo">
            <span>{logined}</span>&nbsp;&nbsp;
            <button onClick={e => { // 로그아웃하는 부분
              setLogined(e => false);
              localStorage.clear(); // 로그아웃 시 저장된 모든 정보 삭제
            }}>로그아웃</button>
          </div>
        </>
      }</div>
  </div>;
}

function Map({ structure, floor, setStructure, setFloor }) {
  return <div className="map">
    <input onChange={e => setFloor(_ => parseInt(e.target.value))} value={floor} />
    <input onChange={e => setStructure(_ => e.target.value)} value={structure} />
    <div className="img">
      {structure === 'center' && floor === 1 && <img src={center1} alt={'center1'} />}
      {structure === 'goldencrown' && floor === 1 && <img src={goldencrown1} alt={'goldencrown1'} />}
      {structure === 'domitory' && floor === 1 && <img src={domitory1} alt={'domitory1'} />}
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
