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
import search from '../imgs/search.png';

export default function Map({ structure, floor, setStructure, setFloor }) {
  const [searching, setSearching] = useState('');
  const [isfloorClicked, setIsfloorClicked] = useState(false);
  return <div className="map">
    <div className="main">
      <div className="sideleft">
        <div className="head">
          <input onChange={e => setSearching(e.target.value)} value={searching} placeholder='    찾고 싶은 실을 검색해 보세요.' />
          <button><img src={search} alt='search' /></button>
        </div>
        <hr />
      </div>
      <div className="img">
        <div className="move">
          <div className="floor" onClick={e => setIsfloorClicked(true)} onMouseLeave={e => setIsfloorClicked(false)}>
            {floor}F
          </div>
          <div className="hr"></div>
          <button className={structure === 'center' ? 'current' : ''} onClick={e => setStructure('center')}>본관</button>
          <button className={structure === 'goldencrown' ? 'current' : ''} onClick={e => setStructure('goldencrown')}>금봉관</button>
          <button className={structure === 'domitory' ? 'current' : ''} onClick={e => {
            setStructure('domitory');
            if (floor > 2) {
              floor = 2;
            }
          }}>기숙사</button>
        </div>
        {structure === 'center' && floor === 1 && <img src={center1} alt={'center1'} />}
        {structure === 'center' && floor === 2 && <img src={center2} alt={'center2'} />}
        {structure === 'center' && floor === 3 && <img src={center3} alt={'center3'} />}
        {structure === 'center' && floor === 4 && <img src={center4} alt={'center4'} />}
        {structure === 'goldencrown' && floor === 1 && <img src={goldencrown1} alt={'goldencrown1'} />}
        {structure === 'goldencrown' && floor === 2 && <img src={goldencrown2} alt={'goldencrown2'} />}
        {structure === 'goldencrown' && floor === 3 && <img src={goldencrown3} alt={'goldencrown3'} />}
        {structure === 'goldencrown' && floor === 4 && <img src={goldencrown4} alt={'goldencrown4'} />}
        {structure === 'domitory' && floor === 1 && <img src={domitory1} alt={'domitory1'} />}
        {structure === 'domitory' && floor === 2 && <img src={domitory2} alt={'domitory2'} />}
      </div>
    </div>
  </div>;
}