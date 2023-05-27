import React from "react";
import * as l from "components/imgs.jsx";
import "styles/About.scss";
import { Link } from "react-router-dom";

const About = () => {
  const datas = [
    {
      "title": "Front-end",
      "text": "GMT로 사용자가 보다 편하게 서비스를 이용하기 위한 화면구현을 목표로하는 프론트엔드 개발자입니다.",
      "imgpath": l.Gangggg,
      "name": "김강현"
    }, {
      "title": "Design",
      "text": "GMT는 사용자가 웹 페이지를 봤을 때 더욱 더 포인트를 빨리 캐치하고 한 눈에 보기 쉽도록 디자인 했습니다.",
      "imgpath": l.SON,
      "name": "손혜린",
      "contributor": "노현주, 김하온"
    }, {
      "title": "Back-end",
      "text": `이상을 디자인하는 개발자,\r\n 노현주입니다!`,
      "imgpath": l.능이버섯,
      "name": "노현주"
    }, {
      "title": "Back-end",
      "text": "중복 작업을 최소화하며 효율적이게 개발하는 데에 초점을 두었습니다.",
      "imgpath": l.hyee,
      "name": "김설희"
    }
  ]
  return <div className="about">
    <div className="header">
      <div className="block">
        <Link to={'/map'}>
          <img src={l.logo} alt="logo" />
        </Link>
        <p>GMT는 신입생들이나 저희 학교에 처음 방문하시는 분들을 위해 각 선생님들의 연락처와 학교 시설의
          구조들을 지도 형식으로 나타냄으로써 잘 찾아가실 수 있게 하는 웹 서비스 입니다.</p>
      </div>
    </div>
    <div className="introduces">
      {datas.map((i, n) => {
        return <div className="introduce" key={n}>
          <h1>{i?.title}</h1>
          <div className="hr" />
          <p>{(i?.text)}</p>
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
