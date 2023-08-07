import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { setStructures } from "redux/mapstore";

import '../styles/Map.scss';
import * as l from "./imgs";
import Nav from "./Nav";
import axios from "axios";

const Map = ({ structure, floor, setFloor, setCenter, setDomitory, setGoldencrown, setInit }) => {
  const canvas = useRef();
  const textWarningRef = useRef();
  const backgroundWarningRef = useRef();
  const [searching, setSearching] = useState("");
  const [isfloorClicked, setIsfloorClicked] = useState(false);
  const [sizingWarning, setSizingWarning] = useState(false);
  const [searchWarning, setSearchWarning] = useState(false);
  const [winWid, setWinWid] = useState(document.body.clientWidth);
  const [imgsize, setImgsize] = useState(20);
  const [infos, setInfos] = useState([]);
  const url = 'https://gmt-pmn.shop';
  window.addEventListener('keydown', e => setoffWarningAll(e));
  window.addEventListener('resize', e => setWinWid(document.body.clientWidth));
  useEffect(e => {
    canvas.current.addEventListener('wheel', sizing, { passive: false });
    textWarningRef.current.addEventListener('wheel', e => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    }, { passive: false });
    backgroundWarningRef.current.addEventListener('wheel', e => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    }, { passive: false });
    initsetting();
    const par = new URLSearchParams(window.location.search).get("code");
    if (par !== undefined) {
      // console.log(par)
      pushes();
    }
    //eslint-disable-next-line
  }, []);
  const setoffWarningAll = e => {
    if (e?.key === 'Escape' || e?.type === 'click') {
      setSizingWarning(false);
      setSearchWarning(false);
    }
  }
  async function pushes() {
    if (JSON.parse(localStorage?.getItem("Tokens"))?.accessToken) {
      await axios.get(`${url}/teachers`,
        { headers: { 'Authorization': `Bearer ${JSON.parse(localStorage?.getItem("Tokens"))?.accessToken}` } }).then(e => {
          console.log(e)
          setInfos(e.data);
        }).catch(e =>
          console.log(e)
        );
    }
  }
  const initsetting = () => {
    switch (localStorage.getItem('structure')) {
      case "center":
        setCenter();
        break;
      case "goldencrown":
        setGoldencrown();
        break;
      case "domitory":
        setDomitory();
        break;
      default:
        setInit();
    }
  }
  function sizing(e) {
    let y = e.deltaY;
    let x = e.deltaX;
    if (e.ctrlKey) {
      e.preventDefault();
      x *= 4;
      y *= 4;
    }
    if ((y > 0 ? y : y * -1) > (x > 0 ? x : x * -1)) {
      const isThirty = document.body.clientWidth >= 500 ? 70 : 33;
      if (y > 0 && imgsize > 19) { //up
        setImgsize(e => {
          if (e - 0.02 * y >= 19) {
            return e - 0.02 * y;
          }
          return 19;
        });
      }
      else if (y < 0 && imgsize < isThirty) {//down
        setImgsize(e => {
          if (e - 0.02 * y <= isThirty) {
            return e - 0.02 * y;
          }
          return isThirty;
        });
      }
    }
  }
  function clicksizing(type) {
    const isThirty = winWid >= 500 ? 70 : 33;
    if (type === "increase" && imgsize < isThirty) {
      setImgsize(e => {
        if (imgsize + 9 <= isThirty) {
          return e + 9;
        }
        return isThirty;
      });
    }
    else if (type === "decrease" && imgsize > 19) {
      setImgsize(e => {
        if (imgsize - 9 >= 19) {
          return e - 9
        }
        return 19;
      });
    }
    else {
      setSizingWarning(true);
    }
  }
  return <div className="map">
    <Nav setSearchWarning={setSearchWarning} />
    <div className="main">
      {winWid >= 500 && <Side searching={searching}
        setSearching={setSearching}
        setWinWid={setWinWid} infos={infos} winWid={winWid}
        setFloor={setFloor} setDomitory={setDomitory} setCenter={setCenter} setGoldencrown={setGoldencrown} setSearchWarning={setSearchWarning} />}
      <div className="canvas" ref={canvas} onWheel={e => sizing(e)} onTouchMove={e => console.log(e)}>
        <div className="move">
          <div className="floor" onClick={e => setIsfloorClicked(true)} onMouseLeave={e => setIsfloorClicked(false)}>
            {floor}F
          </div>
          {isfloorClicked && <div className="floorHov" onMouseOver={e => setIsfloorClicked(true)} onMouseLeave={e => setIsfloorClicked(false)} onClick={e => setIsfloorClicked(false)}>
            <div className="floor" onClick={e => setFloor(1)}>1F</div>
            <div className="floor" onClick={e => setFloor(2)}>2F</div>
            {structure !== 'domitory' && <>
              <div className="floor" onClick={e => setFloor(3)}>3F</div>
              <div className="floor" onClick={e => setFloor(4)}>4F</div></>
            }
          </div>}
          <div className="hr"></div>
          <button className={structure === 'center' ? 'current' : ''} onClick={e => {
            structure === 'center' ? setInit() : setCenter();
            setImgsize(20);
          }}>본관</button>
          <button className={structure === 'goldencrown' ? 'current' : ''} onClick={e => {
            structure === 'goldencrown' ? setInit() : setGoldencrown();
            setImgsize(20);
          }}>금봉관</button>
          <button className={structure === 'domitory' ? 'current' : ''} onClick={e => {
            setImgsize(20);
            structure === 'domitory' ? setInit() : setDomitory();
            if (floor > 2) {
              setFloor(1);
            }
          }}>기숙사</button>
        </div>
        <div className="img">
          {structure === 'center' && floor === 1 && <>
            <img style={{ height: `${imgsize}vh` }} src={l.center1} alt={'center1'} />
            <span></span>
          </>
          }
          {structure === 'center' && floor === 2 && <img style={{ height: `${imgsize}vh` }} src={l.center2} alt={'center2'} />}
          {structure === 'center' && floor === 3 && <img style={{ height: `${imgsize}vh` }} src={l.center3} alt={'center3'} />}
          {structure === 'center' && floor === 4 && <img style={{ height: `${imgsize}vh` }} src={l.center4} alt={'center4'} />}
          {structure === 'goldencrown' && floor === 1 && <img style={{ height: `${imgsize}vh` }} src={l.goldencrown1} alt={'goldencrown1'} />}
          {structure === 'goldencrown' && floor === 2 && <img style={{ height: `${imgsize}vh` }} src={l.goldencrown2} alt={'goldencrown2'} />}
          {structure === 'goldencrown' && floor === 3 && <img style={{ height: `${imgsize}vh` }} src={l.goldencrown3} alt={'goldencrown3'} />}
          {structure === 'goldencrown' && floor === 4 && <img style={{ height: `${imgsize}vh` }} src={l.goldencrown4} alt={'goldencrown4'} />}
          {structure === 'domitory' && floor === 1 && <img style={{ height: `${imgsize}vh` }} src={l.domitory1} alt={'domitory1'} />}
          {structure === 'domitory' && floor === 2 && <img style={{ height: `${imgsize}vh` }} src={l.domitory2} alt={'domitory2'} />}
          {structure === '' && <img style={{ height: `${imgsize}vh` }} src={l.all} alt={'all'} />}
        </div>
        <div className="sizing">
          <button onClick={e => clicksizing('increase')}>
            +
          </button>
          <button onClick={e => clicksizing('decrease')}>
            -
          </button>
        </div>
      </div>
      {winWid <= 500 && <Side searching={searching} setSearching={setSearching} setWinWid={setWinWid} infos={infos} winWid={winWid} setFloor={setFloor} setDomitory={setDomitory} setCenter={setCenter} setGoldencrown={setGoldencrown} setSearchWarning={setSearchWarning} />}
    </div>
    <div className="sizingwarning" ref={textWarningRef} style={{ display: `${sizingWarning || searchWarning ? "" : "none"}` }} onClick={e => {
      setoffWarningAll(e);
    }} />
    <div className="alert" ref={backgroundWarningRef} style={{ display: `${sizingWarning || searchWarning ? "" : "none"}` }} onClick={e => setSizingWarning(true)}>
      <div>
        {sizingWarning && (imgsize < 30 ? "지도를 더 이상 줄일 수 없습니다." : "지도를 더 이상 키울 수 없습니다.")}
        {searchWarning && "못찾았소용"}
        <div>
          클릭이나 Esc를 눌러 확인
        </div>
      </div>
    </div>
  </div >;
}

const Side = ({ searching, setSearchWarning, setSearching, setFloor, setCenter, setDomitory, setGoldencrown, infos, winWid }) => {
  return <div className="sideleft">
    {winWid >= 500 && <form className="head" onSubmit={async e => {
      e.preventDefault();
      if (searching === '') {
        setSearchWarning(true);
        return false;
      }
      switch (searching) {
        case '빅데이터실':
        case '빅데이터분석학습실':
        case '사물인터넷실':
        case '사물인터넷서비스기획실습실':
          setFloor(1);
          setDomitory();
          break;
        case '프로젝트 학습실':
        case '전문교육부':
        case '프로그래밍 2':
        case '프로그래밍2':
        case '프로그래밍 2실':
        case '프로그래밍2실':
          setFloor(2);
          setDomitory();
          break;
        case '보건실':
        case '교장실':
        case '행정실':
        case '방송실':
        case '커뮤니티존':
        case '커뮤니티 존':
        case '교무실':
        case '교감실':
        case '응프':
        case '응용프로그래밍':
        case '응프실':
        case '응용프로그래밍실':
        case '인쇄실':
          setFloor(1);
          setCenter();
          break;
        case '3학년':
        case '3학년실':
        case '3학년 실':
        case '3':
        case '온스카':
        case '온라인스터디카페':
        case '온라인 스터디 카페':
        case '착용형스마트기기실습실':
        case '사물인터넷기획실습실':
        case '3d프린터실':
        case '3d프린터 실':
        case '3d 프린터실':
        case '3d 프린터 실':
          setFloor(2);
          setCenter();
          break;
        case '2':
        case '2학년':
        case '네트워크실':
        case '네트워크 실':
        case '네트워크프로그래밍실':
        case '네트워크 프로그래밍실':
        case '네트워크 프로그래밍 실':
        case '마프실':
        case '마이크로프로세서실':
        case '마이크로 프로세서실':
        case '마이크로 프로세서 실':
        case '마이스터부':
        case '학생부':
          setFloor(3);
          setCenter();
          break;
        case '1':
        case '1학년':
        case '프로그래밍실습1실':
        case '프로그래밍 실습1실':
        case '프로그래밍실습 1실':
        case '프로그래밍 실습 1실':
          setFloor(4);
          setCenter();
          break;
        case '시청각실':
        case '로보틱스':
        case "모바일 로보틱스":
        case "로보틱스 동아리":
        case '모바일 로보틱스 동아리':
        case '모바일로보틱스 동아리':
        case '모바일로보틱스동아리':
        case '모바일로보틱스기능반':
        case '모바일로보틱스 기능반':
        case '모바일 로보틱스 기능반':
        case '게임개발':
        case '게임개발동아리':
        case '게임개발 동아리':
        case '클라우드':
        case '클라우드실':
        case '클라우드 동아리':
        case '클라우드 동아리실':
        case '클라우드 동아리 실':
        case '클라우드 기능반 실':
        case '클라우드기능반 실':
        case '클라우드기능반실':
        case '클라우드기능반':
        case '사보':
        case '사이버보안':
        case '사이버 보안':
        case '사이버 보안 실':
        case '사이버 보안실':
        case '사이버보안실':
        case '사이버보안기능반':
        case '사이버보안 기능반':
        case '사이버 보안 기능반':
        case '급식실':
          setFloor(1);
          setGoldencrown();
          break;
        case '강당':
        case '체육관':
        case '면접실':
        case '면접준비실':
        case '면접 준비실':
        case '면접 준비 실':
        case 'wee':
        case "WEE":
        case '위클래스':
        case '위 클래스':
        case 'wee클래스':
        case 'wee 클래스':
        case 'Wee클래스':
        case 'Wee 클래스':
        case '취진':
        case '취진부':
        case '취업진로부':
        case '취업 진로부':
        case '취업진로 부':
        case '취업 진로 부':
        case 'AI실':
        case 'AI자율주행실':
        case 'AI자율주행실습실':
        case 'AI 자율주행실습실':
        case 'AI 자율주행 실습실':
        case 'AI 자율주행 실':
        case 'ai실':
        case 'ai자율주행실':
        case 'ai 자율주행실':
        case 'ai자율주행 실':
        case 'ai 자율주행 실':
        case 'ai자율주행실습실':
        case 'ai 자율주행실습실':
        case 'ai자율주행 실습실':
        case 'ai 자율주행 실습실':
          setFloor(2);
          setGoldencrown();
          break;
        case '도서실':
        case '여직원휴게실':
        case '여직원 휴게실':
        case '여직원 휴게 실':
        case '여직원휴게 실':
        case '컴플렉스존':
        case '컴플렉스 존':
        case '콤플렉스존':
        case '콤플렉스 존':
        case 'Complex Zone':
        case 'ComplexZone':
        case 'Complex zone':
        case 'Complexzone':
        case 'complex Zone':
        case 'complexZone':
        case 'complex zone':
        case 'complexzone':
        case '메이커스페이스':
        case '메이커 스페이스':
        case 'MakerSpace':
        case 'Maker Space':
        case 'Makerspace':
        case 'Maker space':
        case 'makerSpace':
        case 'maker Space':
        case 'makerspace':
        case 'maker space':
          setFloor(3);
          setGoldencrown();
          break;
        case '과학실':
        case '음악실':
        case '옥상':
          setFloor(4);
          setGoldencrown();
          break;
        default:
          alert('검색결과를 찾을 수 없습니다.');
      }
    }}>
      <input onChange={e => setSearching(e.target.value)} value={searching} placeholder='찾고 싶은 실을 검색해 보세요.' />
      <button><img src={l.search} alt='search' /></button>
    </form>}
    <div className="hr">
      <hr />
    </div>
    <div className="infos">
      {localStorage.getItem('logininfo') ? //로그인이 되어 있는가?
        (!(infos?.length > 0) ? //정보가 있는가?
          "올바른 검색결과를 찾지 못했습니다." : infos?.map((i, n) => {
            return <div className="info" key={n}>
              <div className="header">
                <div className="flex">
                  <div className="name">{i.name}</div>
                  <div className="job">{i.department}</div>
                </div>
                <div className="flex">
                  <div className="location"><img src={l.pin} alt="pin" /> {i.location}&nbsp;</div>
                  <div className="contact"><img src={l.phone} alt="phone" /> {i.contact}</div>
                </div>
              </div>
              <hr />
              <div className="tags">
                {i?.position && <div className='tag position'>{i?.position}</div>}
                {i?.free && <div className='tag free'>{i?.free}</div>}
                {i?.major && <div className='tag major'>{i?.major}</div>}
                {i?.skill && i?.major !== i?.skill && <div className='tag skill'>{i?.skill}</div>}
                {i?.classes && <div className='tag classes'>{i?.classes}</div>}
              </div>
            </div>;
          })) : "더 이상의 정보를 알고 싶다면 학교 소속을 인증해 주세요!"}
    </div>
  </div>;
}

const mapStateToProps = structure => {
  return { structure };
}

const mapDispach = (dispatch, oprops) => {
  return {
    setDomitory: e => dispatch(setStructures('domitory')),
    setCenter: e => dispatch(setStructures('center')),
    setGoldencrown: e => dispatch(setStructures('goldencrown')),
    setInit: e => dispatch(setStructures(''))
  };
}

export default connect(mapStateToProps, mapDispach)(Map);