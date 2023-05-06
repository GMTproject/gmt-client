import React, { useState } from "react";

import '../styles/Map.scss';
import center1 from '../imgs/본관1층.png';
import center2 from '../imgs/본관2층.png';
import center3 from '../imgs/본관3층.png';
import center4 from '../imgs/본관4층.png';
import goldencrown1 from '../imgs/금봉관1층.png';
import goldencrown2 from '../imgs/금봉관2층.png';
import goldencrown3 from '../imgs/금봉관3층.png';
import goldencrown4 from '../imgs/금봉관4층.png';
import domitory1 from '../imgs/기숙사1층.png';
import domitory2 from '../imgs/기숙사2층.png';
import pin from '../imgs/pin.png';
import phone from '../imgs/phone.png';
import search from '../imgs/search.png';

const Map = ({ structure, floor, setStructure, setFloor }) => {
  const [searching, setSearching] = useState('');
  const [isfloorClicked, setIsfloorClicked] = useState(false);
  const [imgsize, setImgsize] = useState(72);
  let infos = [
    {
      type: "teach",
      name: '홍길동',
      job: '1학년 5반 담임교사',
      location: '행정실', contact: 'chun@gmail.com',
      tags: ['담임교사', '영어 교과', '시청각실', '클라우드 기능반', '춘사모 동아리']
    },
  ];
  function sizing(e) {
    let y = e.nativeEvent.wheelDeltaY;
    if (y < 0 && imgsize > 19) { //down
      setImgsize(e => e - 5);
    }
    else if (y > 0 && imgsize <= 72) {//up
      setImgsize(e => e + 5);
    }
  }
  return <div className="map">
    <div className="main">
      <div className="sideleft">
        <div className="head">
          <input onChange={e => setSearching(e.target.value)} value={searching} placeholder='찾고 싶은 실을 검색해 보세요.' />
          <button onClick={e => { }}><img src={search} alt='search' /></button>
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
                    <div className="location"><img src={pin} alt="pin" /> {i.location}&nbsp;</div>
                    <div className="contact"><img src={phone} alt="phone" /> {i.contact}</div>
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
      <div className="canvas" onWheel={e => sizing(e)}>
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
          <button className={structure === 'center' ? 'current' : ''} onClick={e => setStructure('center')}>본관</button>
          <button className={structure === 'goldencrown' ? 'current' : ''} onClick={e => setStructure('goldencrown')}>금봉관</button>
          <button className={structure === 'domitory' ? 'current' : ''} onClick={e => {
            setStructure('domitory');
            if (floor > 2) {
              setFloor(2);
            }
          }}>기숙사</button>
        </div>
        <div className="img">
          {structure === 'center' && floor === 1 && <img style={{ height: `${imgsize}vh` }} src={center1} alt={'center1'} />}
          {structure === 'center' && floor === 2 && <img style={{ height: `${imgsize}vh` }} src={center2} alt={'center2'} />}
          {structure === 'center' && floor === 3 && <img style={{ height: `${imgsize}vh` }} src={center3} alt={'center3'} />}
          {structure === 'center' && floor === 4 && <img style={{ height: `${imgsize}vh` }} src={center4} alt={'center4'} />}
          {structure === 'goldencrown' && floor === 1 && <img style={{ height: `${imgsize}vh` }} src={goldencrown1} alt={'goldencrown1'} />}
          {structure === 'goldencrown' && floor === 2 && <img style={{ height: `${imgsize}vh` }} src={goldencrown2} alt={'goldencrown2'} />}
          {structure === 'goldencrown' && floor === 3 && <img style={{ height: `${imgsize}vh` }} src={goldencrown3} alt={'goldencrown3'} />}
          {structure === 'goldencrown' && floor === 4 && <img style={{ height: `${imgsize}vh` }} src={goldencrown4} alt={'goldencrown4'} />}
          {structure === 'domitory' && floor === 1 && <img style={{ height: `${imgsize}vh` }} src={domitory1} alt={'domitory1'} />}
          {structure === 'domitory' && floor === 2 && <img style={{ height: `${imgsize}vh` }} src={domitory2} alt={'domitory2'} />}
        </div>
      </div>
    </div>
  </div>;
}

export default Map;