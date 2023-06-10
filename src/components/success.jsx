import 'styles/Success.scss';
import * as l from 'components/imgs';
import { Link } from 'react-router-dom';

export default function Success() {
  return <div className='success'>
    <div className='inner'>
      <img src={l.checked} alt='checked' />
      <h1>인증에 성공하셨습니다.</h1>
      <p>GMT에서 학교내의 지도와 선생님들의<br />
        정보가 올라와 있어요 !<br />
        어서 함께 보러 가볼까요 ?</p>
      <Link to='/map'>
        <button>
          GMT로 돌아가기
        </button>
      </Link>
    </div>
  </div>;
}