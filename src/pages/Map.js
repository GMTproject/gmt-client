import React, { useState } from "react";

import '../styles/Map.scss';
import center1 from '../imgs/본관1층.png';
import goldencrown1 from '../imgs/금봉관1층.png';
import domitory1 from '../imgs/기숙사1층.png';
import search from '../imgs/search.png';

export default function Map({ structure, floor, setStructure, setFloor }) {
  const [info, setInfo] = useState('');
  return <div className="map">
    <div className="main">
      <div className="sideleft">
        <div className="head">
          <input onChange={e => setInfo(e.target.value)} value={info} placeholder='    찾고 싶은 실을 검색해 보세요.' />
          <button><img src={search} alt='search' /></button>
        </div>
        <hr />
      </div>
      <div className="img">
        <div className="move">
          <div className="floor">
            1F
          </div>
          <div className="hr"></div>
          <button>본관</button>
          <button>금봉관</button>
          <button>기숙사</button>
        </div>
        {structure === 'center' && floor === 1 && <img src={center1} alt={'center1'} />}
        {structure === 'goldencrown' && floor === 1 && <img src={goldencrown1} alt={'goldencrown1'} />}
        {structure === 'domitory' && floor === 1 && <img src={domitory1} alt={'domitory1'} />}
      </div>
    </div>
  </div>;
}