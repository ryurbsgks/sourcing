import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SignupCheck from "../modal/SignupCheck";

function Signup() {

  const [signupInfo, setSignupInfo] = useState({
    userID: "",
    pw: "",
    pwCheck: "",
    nickname: "",
    tel: "",
    email: ""
  });
  const [message, setMessage] = useState({
    userID: "",
    pw: "",
    pwCheck: "",
    nickname: ""
  });
  const [modalOpen, setModalOpen] = useState({
    userID: false,
    nickname: false
  });

  useEffect( () => {

    if (!signupInfo.pwCheck) {
      setMessage({
        ...message,
        pwCheck: ""
      });
    }

    if (signupInfo.pwCheck) {
      if (signupInfo.pw === signupInfo.pwCheck) {
        return setMessage({
          ...message,
          pwCheck: ""
        });
      } 

      setMessage({
        ...message,
        pwCheck: "비밀번호가 일치하지 않습니다"
      });
    }

  }, [signupInfo.pw, signupInfo.pwCheck]);

  const navigate = useNavigate();
  const userIDRegExp = /^[a-zA-Z0-9]{4,12}$/;
  const spaceRegExp = /^[^\s]{4,20}$/;
  const nicknameRegExp = /^[a-zA-Z가-힣0-9]{4,16}$/;

  const handleInputValue = (e) => {

    const { name, value } = e.target;

    setSignupInfo({
      ...signupInfo,
      [name]: value
    });

    if (e.target.name === "pw") {
      if (!e.target.value) {
        setMessage({
          ...message,
          pw: ""
        });
      }

      if (e.target.value) {
        if (!spaceRegExp.test(e.target.value)) {
          return setMessage({
            ...message,
            pw: "공백을 제외한 4 ~ 20자를 입력해주세요"
          });
        }

        setMessage({
          ...message,
          pw: ""
        });
      }
    }

  };

  const handleCheckBtn = (id) => {

    if (id === "userID") {
      if (!userIDRegExp.test(signupInfo.userID)) {
        return setMessage({
          ...message,
          userID: "4 ~ 12자의 영문, 숫자만 가능합니다"
        });
      }

      axios.post(`${process.env.REACT_APP_URL}/user/checkID`, {
        userID: signupInfo.userID
      }).then( (res) => {
        if (res.data.message === "사용할 수 있는 아이디입니다") {
          setMessage({
            ...message,
            userID: ""
          });
          setModalOpen({
            ...modalOpen,
            userID: true
          });
        }
      }).catch( (err) => {
        if (err.response.data.message === "이미 사용 중인 아이디입니다") {
          setMessage({
            ...message,
            userID: "이미 사용 중인 아이디입니다"
          });
        }
      });

    }

    if (id === "nickname") {
      if (!nicknameRegExp.test(signupInfo.nickname)) {
        return setMessage({
          ...message,
          nickname: "4 ~ 16자의 영문, 한글, 숫자만 가능합니다"
        });
      }

      axios.post(`${process.env.REACT_APP_URL}/user/checkNickname`, {
        nickname: signupInfo.nickname
      }).then( (res) => {
        if (res.data.message === "사용할 수 있는 닉네임입니다") {
          setMessage({
            ...message,
            nickname: ""
          });
          setModalOpen({
            ...modalOpen,
            nickname: true
          });
        }
      }).catch( (err) => {
        if (err.response.data.message === "이미 사용 중인 닉네임입니다") {
          setMessage({
            ...message,
            nickname: "이미 사용 중인 닉네임입니다"
          });
        }
      });

    }
 
  };

  const handleModalClose = (id) => {

    if (id === "userID") {
      setModalOpen({
        ...modalOpen,
        userID: false
      });
    }

    if (id === "nickname") {
      setModalOpen({
        ...modalOpen,
        nickname: false
      });
    }

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
          <button onClick={() => handleCheckBtn("userID")} type="button">중복확인</button>
        </div>
      </div>
      {message.userID ? <div className="signup__err-msg">{message.userID}</div> : null}
      {modalOpen.userID ? <SignupCheck content={"아이디"} close={() => handleModalClose("userID")} /> : null}
      <div className="signup__container">
        <div className="signup__container__space-01">비밀번호<span>*</span></div>
        <div className="signup__container__space-02">
          <input name="pw" onChange={handleInputValue} type="password" placeholder="비밀번호를 입력해주세요" />
        </div>
        <div className="signup__container__space-03"></div>
      </div>
      {message.pw ? <div className="signup__err-msg">{message.pw}</div> : null}
      <div className="signup__container">
        <div className="signup__container__space-01">비밀번호 확인<span>*</span></div>
        <div className="signup__container__space-02">
          <input name="pwCheck" onChange={handleInputValue} type="password" placeholder="비밀번호를 한 번 더 입력해주세요" />
        </div>
        <div className="signup__container__space-03"></div>
      </div>
      {message.pwCheck ? <div className="signup__err-msg">{message.pwCheck}</div> : null}
      <div className="signup__container">
        <div className="signup__container__space-01">닉네임<span>*</span></div>
        <div className="signup__container__space-02">
          <input name="nickname" onChange={handleInputValue} placeholder="닉네임을 입력해주세요" />
        </div>
        <div className="signup__container__space-03">
          <button onClick={() => handleCheckBtn("nickname")} type="button">중복확인</button>
        </div>
      </div>
      {message.nickname ? <div className="signup__err-msg">{message.nickname}</div> : null}
      {modalOpen.nickname ? <SignupCheck content={"닉네임"} close={() => handleModalClose("nickname")} /> : null}
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