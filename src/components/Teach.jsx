import React, { useEffect, useState } from 'react';

import 'styles/Teach.scss';
// import datas from "ex.json";
import * as l from 'components/imgs.jsx';
import axios from 'axios';
import Nav from './Nav';
const url = 'https://gmt-pmn.shop';

const Teach = () => { //선생님 페이지
  const [infolen, setInfolen] = useState([]);
  const [posi, setPosi] = useState(0);
  const [infos, setInfos] = useState([]);
  const [searching, setSearching] = useState('');
  const [query, setQuery] = useState({
    name: true,
    location: false,
    subject: false,
    free: false,
    grade1: false,
    grade2: false,
    grade3: false,
    major: false,
    skill: false
  });
  const [winWid, setWinWid] = useState(document.body.clientWidth);
  window.addEventListener('resize', e => setWinWid(document.body.clientWidth));
  function sort(array) {
    let arr = array;
    for (let i = 0; i < arr.length; i++) {
      let min = i;
      for (let j = i; j < arr.length; j++) {
        if (arr[j].name < arr[min].name && query?.name) {
          min = j;
        }
        else if (arr[j].location < arr[min].location && query?.location) {
          min = j;
        }
        else if (arr[j].position < arr[min].position && query?.subject) {
          min = j;
        }
      }
      const tmp = arr[i];
      arr[i] = arr[min];
      arr[min] = tmp;
    }
    return arr.reverse();
  }
  async function pushes(position) {
    try {
      const toggle = query.free || query.grade1 || query.grade2 || query.grade3 || query.major || query.skill;
      const t = new Date();
      let calt = new Date(localStorage.getItem('accessExp')) - t;
      calt /= 60000;
      if (calt >= 0) {
        await axios.get(`${url}/teachers/${toggle ? `filter?free=${query.free}&grade1=${query.grade1}
      &grade2=${query.grade2}&grade3=${query.grade3}&major=${query.major}&skill=${query.skill}` : ''}`).then(e => {
          const size = document.body.clientWidth > 520 ? 9 : 4;
          let datas = e.data.reverse();
          datas = sort(datas);
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
    } catch (err) {
      console.log(err);
      pushes(position);
    }
  }
  async function searchingFilter(text) {
    await axios.get(`${url}/teacher?text=${text}`)
      .then(e => {
        console.log(e)
      }).catch(err => {
        console.log(err)
      })
  }
  useEffect(e => {
    pushes(posi);
    //eslint-disable-next-line
  }, [query, winWid]);
  return <>
    <Nav searching={searching} setsearching={setSearching} />
    <div className="teach">
      <div className='head'>
        <div className='left'>
          <div className='sortimg'>
            <img src={l.abcsort} alt={'sort'} />
          </div>
          <hr className='headhr' />
          <div className='sortleft'>
            <button className={query.name ? "clicked" : ''}
              onClick={e => setQuery({ ...query, name: true, location: false, subject: false })}>이름별</button>
            <button className={query.location ? "clicked" : ''}
              onClick={e => setQuery({ ...query, location: true, name: false, subject: false })}>위치별</button>
            <button className={query.subject ? "clicked" : ''}
              onClick={e => setQuery({ ...query, subject: true, name: false, location: false })}>교과별</button>
          </div>
          <hr className='headhr' />
          <div className='sortright'>
            <button>교과 교사</button>
            <button className={query.grade1 ? "clicked" : ''} onClick={e => {
              setQuery({ ...query, grade1: !query.grade1 });
              setPosi(0);
            }}>1학년</button>
            <button className={query.grade2 ? "clicked" : ''} onClick={e => {
              setQuery({ ...query, grade2: !query.grade2 });
              setPosi(0);
            }}>2학년</button>
            <button className={query.grade3 ? "clicked" : ''} onClick={e => {
              setQuery({ ...query, grade3: !query.grade3 });
              setPosi(0);
            }}>3학년</button>
            <button className={query.major ? "clicked" : ''} onClick={e => {
              setQuery({ ...query, major: !query.major });
              setPosi(0);
            }}>전공동아리</button>
            <button className={query.free ? "clicked" : ''} onClick={e => {
              setQuery({ ...query, free: !query.free });
              setPosi(0);
            }}>자율동아리</button>
            <button className={query.skill ? "clicked" : ''} onClick={e => {
              setQuery({ ...query, skill: !query.skill });
              setPosi(0);
            }}>사설동아리</button>
          </div>
        </div>
        {winWid >= 500 && <div className='right'>
          <input placeholder='찾으시는 선생님을 입력해주세요.' onChange={input => {
            searchingFilter(input.target.value)
          }} />
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
              {i?.skill && i?.major !== i?.skill && <div className='tag skill'>{i?.skill}</div>}
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
    </div >
  </>;
}

export default Teach;