import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setStructures } from "redux/mapstore";
import { logo, search } from "./imgs";
import axios from "axios";

const Nav = ({ setCenter, setGoldencrown, setDomitory, setSearchWarning }) => {
  // 네비게이션 바
  const [logined, setLogined] = useState(false);
  const [text, setText] = useState('');
  const [mapHov, setMapHov] = useState(false);
  const [winWid, setWinWid] = useState(document.body.clientWidth);
  const time = new Date(); // 로그인 시간 저장
  const setstorage = e => {
    if (localStorage.getItem("logininfo") !== "Guest") {
      setLogined(localStorage.getItem("logininfo"));
    } else {
      setLogined(false);
    }
  }
  const getTokens = async e => {
    try {
      await axios.post(`https://server.gauth.co.kr/oauth/token`, {
        "code": localStorage.getItem('code'),
        "clientId": process.env.REACT_APP_CLIENT_ID,
        "clientSecret": process.env.REACT_APP_CLIENT_SECRET,
        "redirectUri": process.env.REACT_APP_REDIRECT_URL
      }).then(e => {
        const data = e?.data;
        console.log(data);
        localStorage.setItem('Tokens', JSON.stringify({
          accessToken: data?.accessToken,
          refreshToken: data?.refreshToken
        }));
        localStorage.removeItem("code");
      });
      window.location.href = '/map';
    } catch (e) {
      console.log(e);
    }
  }
  const requestInfos = async e => {
    try {
      await axios.get(`https://open.gauth.co.kr/user`,
        { headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem("Tokens")).accessToken}` } })
        .then(e => {
          const data = e.data;
          localStorage.setItem('logininfo', data.name);
          if (!localStorage.getItem('logintime')) {
            const t = new Date();
            localStorage.setItem('logintime', t.getHours() * 100 + t.getMinutes());
          }
          setstorage();
        });
    } catch (e) {
      console.log(e);
    }
  }
  //eslint-disable-next-line
  const reGetTokens = async e => {
    await axios.patch('https://server.gauth.co.kr/oauth/token',
      { headers: { "refreshToken": `Bearer ${JSON.parse(localStorage.getItem("Tokens")).refreshToken}` } })
      .then(e => {
        console.log(e);
      });
  }
  useEffect((e) => {
    const par = new URLSearchParams(window.location.search).get("code");
    if (par !== null) {
      getTokens();
    } else {
      const t = new Date();
      const calt = t.getHours() * 100 + t.getMinutes() - localStorage.getItem('logintime');
      if (calt >= 5 ||
        calt < 0) {
        console.log(calt);
        // reGetTokens();
      }
      requestInfos();
    }
    setstorage();
    // eslint-disable-next-line
  }, []);
  window.addEventListener('resize', e => setWinWid(document.body.clientWidth));

  return (
    <div className="navigator">
      {winWid >= 500 ? <>
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
          <div onClick={e => {
            if (logined === "Guest") {
              alert("인증이 필요한 서비스 입니다.");
            }
          }}>
            {logined ? <Link to={"/teachers"}>학교 교사</Link> : <div
              onClick={e => {
                alert("인증이 필요한 서비스입니다.");
                window.location.href = '/welcome';
              }}>
              학교 교사
            </div>}
          </div>
        </div>
        {mapHov && (<div className="mapHov"
          onMouseOver={(e) => setMapHov(true)} onMouseLeave={(e) => setMapHov(false)}>
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
              <Link to={"/auth"}>
                <button>
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
                    if (window.confirm("정말로 로그아웃 하시겠습니까?")) {
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
        </div></> : <>
        <div className="clientinfo">
          {!logined ? (
            <>
              <span>Guest</span>&nbsp;&nbsp;
              <Link to={"/auth"}>
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
                    if (window.confirm("정말로 로그아웃을 하시겠습니까?")) {
                      // 로그아웃할 건지 재확인
                      setLogined((e) => false);
                      localStorage.clear(); // 로그아웃 시 저장된 모든 정보 삭제
                      alert("로그아웃 됐습니다.");
                      window.location.href = "/welcome";
                    }
                  }}
                >
                  Logout
                </button>
              </div>
            </>
          )}
          <div className="header">
            <Link to={'/about'}>
              <img src={logo} alt="logo" />
            </Link>
            <form className="inputs" onSubmit={e => {
              e.preventDefault();
            }}>
              <input onChange={e => setText(e.target.value)} value={text} />
              <div className="imgs" onClick={e => {
                const cloca = document.location.href.split('/')[3];
                if (cloca === 'map' && text === '') {
                  setSearchWarning(true);
                }
                else if (cloca === 'teachers') {
                  console.log('teachers');
                }
              }}>
                <img src={search} alt="search" />
              </div>
            </form>
          </div>
          <hr />
          <div className="nav">
            <div
              onMouseOver={(e) => setMapHov(true)}
              onMouseLeave={(e) => {
                setMapHov(false);
              }}
            >
              <Link to={"/map"}>학교 지도</Link>
            </div>
            <div onClick={e => {
              if (logined === "Guest") {
                alert("인증이 필요한 서비스 입니다.");
              }
            }}>
              <Link to={"/teachers"}>학교 교사</Link>
            </div>
          </div>
          <hr />
        </div>
      </>
      }
    </div >
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