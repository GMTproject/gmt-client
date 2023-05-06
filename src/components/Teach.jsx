import React, { useEffect, useState } from 'react';

import '../styles/Teach.scss';
import ex from "../ex.json";
const pin = '../imgs/pin.png';
const phone = '../imgs/phone.png';
const abcsort = '../imgs/abcsort.png';
const search1 = '../imgs/search1.png';

const Teach = () => { //선생님 페이지
  let infoarr = ex;
  const [infolen, setInfolen] = useState([]);
  const [posi, setPosi] = useState(0);
  const [infos, setInfos] = useState([]);
  function pushes(position) {
    let crntposi = infoarr.length - (12 * position);
    setInfos(e => {
      let topush = [];
      for (let i = 1; i < 13; i++) {
        if ((crntposi - i >= 0) && infoarr[crntposi - i]) {
          topush.push((crntposi - i >= 0) && infoarr[crntposi - i]);
        }
      }
      return topush;
    });
    setInfolen(e => {
      let len = [];
      for (let i = 0; i <= (infoarr.length - 1) / 12; i++) {
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
          <img src={abcsort} alt={'sort'} />
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
        <button><img src={search1} alt='search' /></button>
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
      }) : ''}
    </div>
    <div className={`labels ${(infos.length <= 8 ? "small" : '')}`}>
      {infolen.map((i, n) => {
        return <label key={n} className={posi === i ? 'bold' : ''}
          onClick={e => { setPosi(i); pushes(i); }}>
          {i + 1}
        </label>
      })}
    </div>
  </div>;
}

export default Teach;