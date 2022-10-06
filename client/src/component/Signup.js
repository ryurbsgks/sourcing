import "../App.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Signup() {

  const [signupInfo, setSignupInfo] = useState({
    userID: "",
    pw: "",
    pwCheck: "",
    nickname: "",
    tel: "",
    email: ""
  });

  const navigate = useNavigate();

  const handleInputValue = (e) => {
    
    const { name, value } = e.target;

    setSignupInfo({
      ...signupInfo,
      [name]: value
    });

  };

  const handleSignupBtn = () => {

    axios.post(`${process.env.REACT_APP_URL}/user/signup`, {
      userID: signupInfo.userID,
      pw: signupInfo.pw,
      nickname: signupInfo.nickname,
      tel: signupInfo.tel,
      email: signupInfo.email
    }).then( (res) => {
      if (res.data.message === "회원가입 성공") {
        navigate("/login");
      }
    }).catch( (err) => {
      console.log("-----err-----", err)
    });

  };

  return (
    <section className="signup">
      <div className="signup__title">회원가입</div>
      <div className="signup__require"><span>*</span> 필수입력사항</div>
      <div className="signup__container">
        <div className="signup__container__space-01">아이디<span>*</span></div>
        <div className="signup__container__space-02">
          <input name="userID" onChange={handleInputValue} placeholder="아이디를 입력해주세요" />
        </div>
        <div className="signup__container__space-03">
          <button type="button">중복확인</button>
        </div>
      </div>
      <div className="signup__container">
        <div className="signup__container__space-01">비밀번호<span>*</span></div>
        <div className="signup__container__space-02">
          <input name="pw" onChange={handleInputValue} type="password" placeholder="비밀번호를 입력해주세요" />
        </div>
        <div className="signup__container__space-03"></div>
      </div>
      <div className="signup__container">
        <div className="signup__container__space-01">비밀번호 확인<span>*</span></div>
        <div className="signup__container__space-02">
          <input name="pwCheck" onChange={handleInputValue} type="password" placeholder="비밀번호를 한 번 더 입력해주세요" />
        </div>
        <div className="signup__container__space-03"></div>
      </div>
      <div className="signup__container">
        <div className="signup__container__space-01">닉네임<span>*</span></div>
        <div className="signup__container__space-02">
          <input name="nickname" onChange={handleInputValue} placeholder="닉네임을 입력해주세요" />
        </div>
        <div className="signup__container__space-03">
          <button type="button">중복확인</button>
        </div>
      </div>
      <div className="signup__container">
        <div className="signup__container__space-01">핸드폰<span>*</span></div>
        <div className="signup__container__space-02">
          <input name="tel" onChange={handleInputValue} placeholder="숫자만 입력해주세요" />
        </div>
        <div className="signup__container__space-03">
          <button type="button">인증번호 받기</button>
        </div>
      </div>
      <div className="signup__container">
        <div className="signup__container__space-01">이메일</div>
        <div className="signup__container__space-02">
          <input name="email" onChange={handleInputValue} placeholder="ex)sourcing@sourcing.com" />
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
        <button onClick={handleSignupBtn} type="button">회원가입</button>
      </div>
    </section>
  );
}

export default Signup;