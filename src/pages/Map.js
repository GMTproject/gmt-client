import React from "react";

import '../styles/Map.scss';
import center1 from '../imgs/본관1층.png';
import goldencrown1 from '../imgs/금봉관1층.png';
import domitory1 from '../imgs/기숙사1층.png';

export default function Map({ structure, floor, setStructure, setFloor }) {
  const [info, setInfo] = useState('');
  return <div className="map">
    <div className="main">
      <div className="sideleft">
        <input onChange={e => setInfo(e.target.value)} value={info} placeholder='찾고 싶은 실을 검색해 보세요.' />
      </div>
      <div className="img">
        {/* 지도를 보여주는 부분. 앞 조건이 모두 만족을 하게 되면 뒤에 있는 이미지 태그가 보이게 함 */}
        {structure === 'center' && floor === 1 && <img src={center1} alt={'center1'} />}
        {structure === 'goldencrown' && floor === 1 && <img src={goldencrown1} alt={'goldencrown1'} />}
        {structure === 'domitory' && floor === 1 && <img src={domitory1} alt={'domitory1'} />}
      </div>
    </div>
  </div>;
}