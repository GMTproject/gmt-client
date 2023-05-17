import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { setStructures } from "redux/mapstore";

import '../styles/Map.scss';
import * as l from "./imgs";
import Nav from "./Nav";

const Map = ({ structure, floor, setFloor, setCenter, setDomitory, setGoldencrown }) => {
  const canvas = useRef();
  const [searching, setSearching] = useState("");
  const [isfloorClicked, setIsfloorClicked] = useState(false);
  const [sizingWarning, setSizingWarning] = useState(false);
  const [imgsize, setImgsize] = useState(20);
  let infos = [
    {
      type: "teach",
      name: '홍길동',
      job: '1학년 5반 담임교사',
      location: '행정실', contact: 'chun@gmail.com',
      tags: ['담임교사', '영어 교과', '시청각실', '클라우드 기능반', '춘사모 동아리']
    },
    {
      type: "teach",
      name: '홍길동',
      job: '1학년 5반 담임교사',
      location: '행정실', contact: 'chun@gmail.com',
      tags: ['담임교사', '영어 교과', '시청각실', '클라우드 기능반', '춘사모 동아리']
    },
    {
      type: "teach",
      name: '홍길동',
      job: '1학년 5반 담임교사',
      location: '행정실', contact: 'chun@gmail.com',
      tags: ['담임교사', '영어 교과', '시청각실', '클라우드 기능반', '춘사모 동아리']
    },
    {
      type: "teach",
      name: '홍길동',
      job: '1학년 5반 담임교사',
      location: '행정실', contact: 'chun@gmail.com',
      tags: ['담임교사', '영어 교과', '시청각실', '클라우드 기능반', '춘사모 동아리']
    },
    {
      type: "teach",
      name: '홍길동',
      job: '1학년 5반 담임교사',
      location: '행정실', contact: 'chun@gmail.com',
      tags: ['담임교사', '영어 교과', '시청각실', '클라우드 기능반', '춘사모 동아리']
    },
  ];
  document.getElementsByClassName('canvas');
  useEffect(e => {
    canvas.current.addEventListener('wheel', sizing, { passive: false });
    initsetting();
    //eslint-disable-next-line
  }, []);
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
    }
  }
  function sizing(e) {
    if (e.ctrlKey) {
      e.preventDefault();
    }
    let y = e.deltaY;
    if (y > 0 && imgsize > 19) { //up
      setImgsize(e => { return e - 3 });
    }
    else if (y < 0 && imgsize < 72) {//down
      setImgsize(e => e + 3);
    }
    else {
      setImgsize(imgsize);
    }
  }
  function clicksizing(type) {
    if (type === "increase" && imgsize < 70) {
      setImgsize(e => e + 9);
    }
    else if (type === "decrease" && imgsize > 19) {
      setImgsize(e => e - 9);
    }
    else {
      setSizingWarning(true);
    }
  }
  return <div className="map">
    <Nav />
    <div className="main">
      <div className="sideleft">
        <div className="head">
          <input onChange={e => setSearching(e.target.value)} value={searching} placeholder='찾고 싶은 실을 검색해 보세요.' />
          <button onClick={e => { }}><img src={l.search} alt='search' /></button>
        </div>
        <div className="hr">
          <hr />
        </div>
        <div className="infos">
          {infos.map((i, n) => {
            if (i.type === 'teach') {
              return <div className="info" key={n}>
                <div className="header">
                  <div className="flex">
                    <div className="name">{i.name}</div>
                    <div className="job">{i.job}</div>
                  </div>
                  <div className="flex">
                    <div className="location"><img src={l.pin} alt="pin" /> {i.location}&nbsp;</div>
                    <div className="contact"><img src={l.phone} alt="phone" /> {i.contact}</div>
                  </div>
                </div>
                <hr />
                <div className="tags">
                  {i.tags.map((i, n) => {
                    return <div className="tag" key={n}>{i}</div>;
                  })}
                </div>
              </div>;
            }
            else if (i.type === 'location') {
              return <div className="location" key={n}></div>;
            }
            else {
              return <></>;
            }
          })}
        </div>
      </div>
      <div className="canvas" ref={canvas} onWheel={e => sizing(e)}>
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
          <button className={structure === 'center' ? 'current' : ''} onClick={e => setCenter()}>본관</button>
          <button className={structure === 'goldencrown' ? 'current' : ''} onClick={e => setGoldencrown()}>금봉관</button>
          <button className={structure === 'domitory' ? 'current' : ''} onClick={e => {
            setDomitory();
            if (floor > 2) {
              setFloor(2);
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
    </div>
    <div className="sizingwarning" style={{ display: `${sizingWarning ? "" : "none"}` }} onClick={e => setSizingWarning(false)} />
    <div className="alert" style={{ display: `${sizingWarning ? "" : "none"}` }} onClick={e => setSizingWarning(true)}>
      {imgsize < 30 ? "지도를 더이상 줄일 수 없습니다." : "지도를 더 이상 키울 수 없습니다."}
    </div>
  </div >;
}

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

export default connect(mapStateToProps, mapDispach)(Map);