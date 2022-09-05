import "../App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function Signup() {
  return (
    <div className="container__sub">
      <div className="signup__title">회원가입</div>
      <div className="signup__subtitle">
        <span className="signup__required__itemsymbol">*</span>
        <div>필수입력사항</div>
      </div>
      <div className="signup__container">
        <div className="signup__info">아이디<span className="signup__required__itemsymbol">*</span></div>
        <div className="signup__inputbox__space">
          <input placeholder="아이디를 입력해주세요" />
        </div>
        <div className="signup__button__space">
          <button type="button">중복확인</button>
        </div>
      </div>
      <div className="signup__container">
        <div className="signup__info">비밀번호<span className="signup__required__itemsymbol">*</span></div>
        <div className="signup__inputbox__space">
          <input type="password" placeholder="비밀번호를 입력해주세요" />
        </div>
        <div className="signup__button__space"></div>
      </div>
      <div className="signup__container">
        <div className="signup__info">비밀번호확인<span className="signup__required__itemsymbol">*</span></div>
        <div className="signup__inputbox__space">
          <input type="password" placeholder="비밀번호를 한 번 더 입력해주세요" />
        </div>
        <div className="signup__button__space"></div>
      </div>
      <div className="signup__container">
        <div className="signup__info">닉네임<span className="signup__required__itemsymbol">*</span></div>
        <div className="signup__inputbox__space">
          <input placeholder="닉네임을 입력해주세요" />
        </div>
        <div className="signup__button__space">
          <button type="button">중복확인</button>
        </div>
      </div>
      <div className="signup__container">
        <div className="signup__info">핸드폰<span className="signup__required__itemsymbol">*</span></div>
        <div className="signup__inputbox__space">
          <input placeholder="숫자만 입력해주세요" />
        </div>
        <div className="signup__button__space">
          <button type="button">인증번호 받기</button>
        </div>
      </div>
      <div className="signup__container">
        <div className="signup__info">이메일</div>
        <div className="signup__inputbox__space">
          <input placeholder="ex)sourcing@sourcing.com" />
        </div>
        <div className="signup__button__space">
          <button type="button">인증번호 받기</button>
        </div>
      </div>
      <div className="signup__container">
        <div className="signup__info">주소</div>
        <div className="signup__inputbox__space">
          <button type="button"><FontAwesomeIcon icon={faMagnifyingGlass} />주소 검색</button>
        </div>
        <div className="signup__button__space"></div>
      </div>
      <div className="signup__button">
        <button>회원가입</button>
      </div>
    </div>
  );
}

export default Signup;
