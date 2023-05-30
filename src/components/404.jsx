import 'styles/NotFound.scss';

export default function NotFound() {
  return <div className="notfound">
    <div>
      <div className='header'>
        <span className='n404'>404&nbsp;</span>
        <span className='message'>Not Found</span>
      </div>
      <p className='title'>
        죄송합니다. 페이지를 찾을 수 없습니다.
      </p>
      <p className='description'>
        존재하지 않는 주소를 입력하셨거나<br />
        요청하신 페이지의 주소가 변경 또는 삭제되어 찾을 수 없습니다.
      </p>
      <button onClick={e => {
        console.log(window.history.back());
      }}>이전 페이지로 돌아가기</button>
    </div>
  </div>
}