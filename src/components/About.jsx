import React from "react";
import * as l from "components/imgs.jsx";
import "styles/About.scss";
import datas from "data/contributors.json"

const About = () => {
  console.log(datas);
  return <div className="about">
    <div className="header">
      <div className="block">
        <img src={l.logo} alt="logo" />
        <p>GMT는 신입생들이나 저희 학교에 처음 방문하시는 분들을 위해 각 선생님들의 연락처와 학교 시설의
          구조들을 지도 형식으로 나타냄으로써 잘 찾아가실 수 있게 하는 웹 서비스 입니다.</p>
      </div>
    </div>
    <div className="introduces">
      {datas.map((i, n) => {
        return <div className="introduce">
          <h1>{i?.title}</h1>
          <b>{i?.text}</b>
          <div className="img">
            <img src={i?.imgpath} alt="profile_img" />
          </div>
          <p>{i?.name}</p>
          {i?.contributor && <p>기여 : {i?.contributor}</p>}
        </div>;
      })}
    </div>
  </div>;
}
export default About;
