import React, { useEffect, useState } from 'react';

import 'styles/Teach.scss';
// import datas from "ex.json";
import * as l from 'components/imgs.jsx';
import axios from 'axios';
const url = 'http://gmt-pmn.shop:8080';

const Teach = () => { //선생님 페이지
  const [infolen, setInfolen] = useState([]);
  const [posi, setPosi] = useState(0);
  const [infos, setInfos] = useState([]);
  const [query, setQuery] = useState({
    free: false,
    grade1: false,
    grade2: false,
    grade3: false,
    major: false,
    skill: false
  });
  const [winWid, setWinWid] = useState(document.body.clientWidth);
  window.addEventListener('resize', e => setWinWid(document.body.clientWidth));
  async function pushes(position) {
    const toggle = query.free || query.grade1 || query.grade2 || query.grade3 || query.major || query.skill;
    await axios.get(`${url}/teachers/${toggle ? `filter?free=${query.free}&grade1=${query.grade1}
    &grade2=${query.grade2}&grade3=${query.grade3}&major=${query.major}&skill=${query.skill}` : ''}`).then(e => {
      let size = 9;
      const datas = e.data;
      let crntposi = datas.length - (size * position);
      setInfos(e => {
        let topush = [];
        for (let i = 1; i < 1 + size; i++) {
          if ((crntposi - i >= 0) && datas[crntposi - i]) {
            topush.push((crntposi - i >= 0) && datas[crntposi - i]);
          }
        }
        return topush;
      });
      setInfolen(e => {
        let len = [];
        for (let i = 0; i <= (datas.length - 1) / size; i++) {
          len.push(i);
        }
        return len;
      });
    });
  }
  useEffect(e => {
    // pushes(0);
  }, []);
  useEffect(e => {
    pushes(posi);
    //eslint-disable-next-line
  }, [query]);
  return <div className="teach">
    <div className='head'>
      <div className='left'>
        <div className='sortimg'>
          <img src={l.abcsort} alt={'sort'} />
        </div>
        <hr />
        <div className='sortleft'>
          <button>이름별</button>
          <button>위치별</button>
          <button>교과별</button>
        </div>
        <hr />
        <div className='sortright'>
          <button>교과 교사</button>
          <button className={query.grade1 ? "clicked" : ''} onClick={e => {
            setQuery({ ...query, grade1: !query.grade1 })
          }}>1학년</button>
          <button className={query.grade2 ? "clicked" : ''} onClick={e => {
            setQuery({ ...query, grade2: !query.grade2 })
          }}>2학년</button>
          <button className={query.grade3 ? "clicked" : ''} onClick={e => {
            setQuery({ ...query, grade3: !query.grade3 })
          }}>3학년</button>
          <button className={query.major ? "clicked" : ''} onClick={e => {
            setQuery({ ...query, major: !query.major })
          }}>전공동아리</button>
          <button className={query.free ? "clicked" : ''} onClick={e => {
            setQuery({ ...query, free: !query.free })
          }}>자율동아리</button>
          <button className={query.skill ? "clicked" : ''} onClick={e => {
            setQuery({ ...query, skill: !query.skill })
          }}>사설동아리</button>
        </div>
      </div>
      {winWid >= 500 && <div className='right'>
        <input />
        <button><img src={l.search1} alt='search' /></button>
      </div>}
    </div>
    <hr />
    <div className='infos'>
      {infos?.map((i, n) => {
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
            {i?.skill && <div className='tag skill'>{i?.skill}</div>}
            {i?.classes && <div className='tag classes'>{i?.classes}</div>}
          </div>
        </div>;
      })}
      {!(infos?.length > 0) && "올바른 검색결과를 찾지 못했습니다."}
    </div>
    <div className={`labels`}>
      {
        infolen.map((i, n) => {
          return <label key={n} onClick={e => {
            setPosi(i);
            pushes(i);
          }}>
            <div className={`dot ${posi === i ? 'bold' : ''}`} />
          </label>
        })
      }
    </div>
  </div >;
}

export default Teach;