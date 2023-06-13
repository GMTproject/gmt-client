import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { setStructures } from "redux/mapstore";

import '../styles/Map.scss';
import * as l from "./imgs";
import Nav from "./Nav";

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
  let infos = [
    {
      "name": "테스트 선생님1",
      "contact": "010-0000-0000",
      "department": "테스트 부서1",
      "location": "테스트 위치1",
      "position": "3학년 4반 담암교사",
      "subject": "테스트 과목1",
      "free": "자율 동아리1",
      "major": null,
      "skill": "사설 동아리1",
      "classes": "테스트 방과후1"
    },
    {
      "name": "테스트 선생님2",
      "contact": "010-1111-1111",
      "department": "테스트 부서2",
      "location": "테스트 위치2",
      "position": "교사",
      "subject": "테스트 과목2",
      "free": "자율 동아리2",
      "major": "전공동아리1",
      "skill": "사설 동아리2",
      "classes": "테스트 방과후2"
    },
    {
      "name": "테스트 선생님3",
      "contact": "테스트#0000",
      "department": "테스트 부서2",
      "location": "테스트 위치3",
      "position": "1학년 2반 담임교사",
      "subject": "테스트 과목3",
      "free": null,
      "major": "전공동아리2",
      "skill": null,
      "classes": "테스트 방과후3"
    },
    {
      "name": "테스트 선생님4",
      "contact": "테스트#1111",
      "department": "테스트 부서3",
      "location": "테스트 위치4",
      "position": "1학년 2반 부담임교사",
      "subject": "테스트 과목4",
      "free": null,
      "major": null,
      "skill": null,
      "classes": "테스트 방과후4"
    },
    {
      "name": "테스트 선생님5",
      "contact": "test1234@spring.com",
      "department": "테스트 부서4",
      "location": "테스트 위치5",
      "position": "교사",
      "subject": "테스트 과목5",
      "free": "자율 동아리3",
      "major": "전공동아리5",
      "skill": "사설 동아리3",
      "classes": "테스트 방과후5"
    }
  ];
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
    //eslint-disable-next-line
  }, []);
  const setoffWarningAll = e => {
    if (e?.key === 'Escape' || e?.type === 'click') {
      setSizingWarning(false);
      setSearchWarning(false);
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
        default:
          console.log('찾지못함');
      }
    }}>
      <input onChange={e => setSearching(e.target.value)} value={searching} placeholder='찾고 싶은 실을 검색해 보세요.' />
      <button><img src={l.search} alt='search' /></button>
    </form>}
    <div className="hr">
      <hr />
    </div>
    <div className="infos">
      {infos.map((i, n) => {
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
            {i?.position && <div className='tag'>{i?.position}</div>}
            {i?.free && <div className='tag'>{i?.free}</div>}
            {i?.major && <div className='tag'>{i?.major}</div>}
            {i?.skill && <div className='tag'>{i?.skill}</div>}
            {i?.classes && <div className='tag'>{i?.classes}</div>}
          </div>
        </div>;
      })}
      {!(infos?.length > 0) && "올바른 검색결과를 찾지 못했습니다."}
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