import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Signup() {
  return (
    <section className="signup">
      <div className="signup__title">회원가입</div>
      <div className="signup__require"><span>*</span> 필수입력사항</div>
      <div className="signup__container">
        <div className="signup__container__space-01">아이디<span>*</span></div>
        <div className="signup__container__space-02">
          <input placeholder="아이디를 입력해주세요" />
        </div>
        <div className="signup__container__space-03">
          <button type="button">중복확인</button>
        </div>
      </div>
      <div className="signup__container">
        <div className="signup__container__space-01">비밀번호<span>*</span></div>
        <div className="signup__container__space-02">
          <input type="password" placeholder="비밀번호를 입력해주세요" />
        </div>
        <div className="signup__container__space-03"></div>
      </div>
      <div className="signup__container">
        <div className="signup__container__space-01">비밀번호 확인<span>*</span></div>
        <div className="signup__container__space-02">
          <input type="password" placeholder="비밀번호를 한 번 더 입력해주세요" />
        </div>
        <div className="signup__container__space-03"></div>
      </div>
      <div className="signup__container">
        <div className="signup__container__space-01">닉네임<span>*</span></div>
        <div className="signup__container__space-02">
          <input placeholder="닉네임을 입력해주세요" />
        </div>
        <div className="signup__container__space-03">
          <button type="button">중복확인</button>
        </div>
      </div>
      <div className="signup__container">
        <div className="signup__container__space-01">핸드폰<span>*</span></div>
        <div className="signup__container__space-02">
          <input placeholder="숫자만 입력해주세요" />
        </div>
        <div className="signup__container__space-03">
          <button type="button">인증번호 받기</button>
        </div>
      </div>
      <div className="signup__container">
        <div className="signup__container__space-01">이메일</div>
        <div className="signup__container__space-02">
          <input placeholder="ex)sourcing@sourcing.com" />
        </div>
        <div className="signup__container__space-03">
          <button type="button">인증번호 받기</button>
        </div>
      </div>
      <div className="signup__container">
        <div className="signup__container__space-01">주소</div>
        <div className="signup__container__space-02">
          <button type="button"><FontAwesomeIcon icon={faMagnifyingGlass} />주소 검색</button>
        </div>
        <div className="signup__container__space-03"></div>
      </div>
      <div className="signup__btn">
        <button type="button">회원가입</button>
      </div>
    </section>
  );
}

export default Signup;