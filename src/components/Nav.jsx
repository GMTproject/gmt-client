import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setStructures } from "redux/mapstore";
import { logo } from "./imgs";

const Nav = ({ setStructure, setCenter, setGoldencrown, setDomitory }) => {
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

  return (
    <div className="navigator">
      <div className="left">
        <Link to='/about'>
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="middle-text">
        {/* 페이지 이동이 가능하게 하는 버튼 */}
        <div
          onMouseOver={(e) => setMapHov(true)}
          onMouseLeave={(e) => {
            setMapHov(false);
          }}
        >
          <Link to={"/map"}>학교 지도</Link>
        </div>
        <div>
          <Link to={"/teach"}>학교 교사</Link>
        </div>
      </div>
      {mapHov && (<div className="mapHov"
        onMouseOver={(e) => setMapHov(true)} onMouseLeave={(e) => setMapHov(false)}>
        {/* 로컬스토리지에 위치 값을 저장하는 버튼 */}
        <Link to="/map" onClick={(e) => setCenter()}>
          <div>본관</div>
        </Link><hr />
        <Link to="/map" onClick={(e) => setGoldencrown()}>
          <div>금봉관</div>
        </Link><hr />
        <Link to="/map" onClick={(e) => setDomitory()}>
          <div>기숙사</div>
        </Link>
      </div>)}
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
    </div>
  );
};

const mapStateToProps = structure => {
  return { structure };
}

const mapDispach = (dispatch, oprops) => {
  return {
    setDomitory: e => dispatch(setStructures('domitory')),
    setCenter: e => dispatch(setStructures('center')),
    setGoldencrown: e => dispatch(setStructures('goldencrown'))
  };
}


export default connect(mapStateToProps, mapDispach)(Nav);