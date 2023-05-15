import React, { useEffect, useState } from 'react';

import 'styles/Teach.scss';
import datas from "ex.json";
import * as l from 'components/imgs.jsx';

const Teach = () => { //선생님 페이지
  const [infolen, setInfolen] = useState([]);
  const [posi, setPosi] = useState(0);
  const [infos, setInfos] = useState([]);
  function pushes(position) {
    let size = 9;
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
  }
  useEffect(e => {
    pushes(0);
    //eslint-disable-next-line
  }, []);
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
          <button>1학년</button>
          <button>2학년</button>
          <button>3학년</button>
          <button>전공동아리</button>
          <button>자율동아리</button>
          <button>사설동아리</button>
        </div>
      </div>
      <div className='right'>
        <input />
        <button><img src={l.search1} alt='search' /></button>
      </div>
    </div>
    <hr />
    <div className='infos'>
      {infos ? infos.map((i, n) => {
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
      }) : ''}
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