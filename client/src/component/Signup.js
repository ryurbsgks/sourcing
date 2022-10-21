import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Check from "../modal/Check";
import { getCookie, removeCookie } from "../function"

function Signup() {

  const [signupInfo, setSignupInfo] = useState({
    userID: "",
    pw: "",
    pwCheck: "",
    nickname: "",
    tel: "",
    email: "",
    verifyTel: "",
    verifyEmail: ""
  });
  const [message, setMessage] = useState({
    userID: "",
    pw: "",
    pwCheck: "",
    nickname: "",
    tel: "",
    email: "",
    verifyTel: "",
    verifyEmail: ""
  });
  const [modalOpen, setModalOpen] = useState({
    userID: false,
    nickname: false,
    tel: false,
    email: false,
    verifyTel: false,
    verifyEmail: false
  });
  const [openUI, setOpenUI] = useState({
    tel: false,
    email: false
  });
  const [disable, setDisable] = useState({
    tel: false,
    email: false
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
  const phoneRegExp = /^010[0-9]{8}$/;
  const emailRegExp = /^[a-zA-Z0-9]([a-zA-Z0-9-_])*@[a-z]+\.(kr|com|net)$/;

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

    if (id === "tel") {
      if (!phoneRegExp.test(signupInfo.tel)) {
        setOpenUI({
          ...openUI,
          tel: false
        });
        return setMessage({
          ...message,
          tel: "핸드폰 번호를 확인해주세요"
        });
      }

      axios.get(`${process.env.REACT_APP_URL}/user/signup/sms/${signupInfo.tel}`, {
        withCredentials: true
      }).then( (res) => {
        if (res.data.message === "인증번호 전송 성공") {
          setOpenUI({
            ...openUI,
            tel: true
          });
          setMessage({
            ...message,
            tel: ""
          });
          setDisable({
            ...disable,
            tel: true
          });
          setModalOpen({
            ...modalOpen,
            tel: true
          });
        }
      });

    }

    if (id === "verifyTel") {
      if (!signupInfo.verifyTel) {
        return setMessage({
          ...message,
          verifyTel: "인증번호를 입력해주세요"
        });
      }

      axios.post(`${process.env.REACT_APP_URL}/user/signup/verify`, {
        verifyTel: signupInfo.verifyTel
      }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${getCookie("TelAuthNumber")}`
        }
      }).then( (res) => {
        if (res.data.message === "인증번호가 일치합니다") {
          removeCookie("TelAuthNumber");
          setMessage({
            ...message,
            verifyTel: ""
          });
          setOpenUI({
            ...openUI,
            tel: false
          });
          setModalOpen({
            ...modalOpen,
            verifyTel: true
          });
        }
      }).catch( (err) => {
        if (err.response.data.message === "인증번호가 일치하지 않습니다") {
          setMessage({
            ...message,
            verifyTel: "인증번호가 일치하지 않습니다"
          });
        }

        if (err.response.data.message === "인증 유효 시간이 만료되었습니다") {
          removeCookie("TelAuthNumber");
          setDisable({
            ...disable,
            tel: false
          });
          return setMessage({
            ...message,
            verifyTel: "인증 유효 시간이 만료되었습니다"
          });
        }
      });

    }

    if (id === "email") {
      if (!emailRegExp.test(signupInfo.email)) {
        setOpenUI({
          ...openUI,
          email: false
        });
        return setMessage({
          ...message,
          email: "이메일을 확인해주세요"
        });
      }

      axios.post(`${process.env.REACT_APP_URL}/user/signup/email`, {
        email: signupInfo.email
      }, {
        withCredentials: true
      }).then( (res) => {
        if (res.data.message === "인증번호 전송 성공") {
          setOpenUI({
            ...openUI,
            email: true
          });
          setMessage({
            ...message,
            email: ""
          });
          setDisable({
            ...disable,
            email: true
          });
          setModalOpen({
            ...modalOpen,
            email: true
          });
        }
      });
      
    }

    if (id === "verifyEmail") {
      if (!signupInfo.verifyEmail) {
        return setMessage({
          ...message,
          verifyEmail: "인증번호를 입력해주세요"
        });
      }

      axios.post(`${process.env.REACT_APP_URL}/user/signup/verify`, {
        verifyEmail: signupInfo.verifyEmail
      }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${getCookie("EmailAuthNumber")}`
        }
      }).then( (res) => {
        if (res.data.message === "인증번호가 일치합니다") {
          removeCookie("EmailAuthNumber");
          setMessage({
            ...message,
            verifyEmail: ""
          });
          setOpenUI({
            ...openUI,
            email: false
          });
          setModalOpen({
            ...modalOpen,
            verifyEmail: true
          });
        }
      }).catch( (err) => {
        if (err.response.data.message === "인증번호가 일치하지 않습니다") {
          return setMessage({
            ...message,
            verifyEmail: "인증번호가 일치하지 않습니다"
          });
        }

        if (err.response.data.message === "인증 유효 시간이 만료되었습니다") {
          removeCookie("EmailAuthNumber");
          setDisable({
            ...disable,
            email: false
          });
          return setMessage({
            ...message,
            verifyEmail: "인증 유효 시간이 만료되었습니다"
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

    if (id === "tel") {
      setModalOpen({
        ...modalOpen,
        tel: false
      });
    }

    if (id === "verifyTel") {
      setModalOpen({
        ...modalOpen,
        verifyTel: false
      });
    }

    if (id === "email") {
      setModalOpen({
        ...modalOpen,
        email: false
      });
    }

    if (id === "verifyEmail") {
      setModalOpen({
        ...modalOpen,
        verifyEmail: false
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
      {modalOpen.userID ? <Check content={"사용할 수 있는 아이디입니다"} handler={() => handleModalClose("userID")} /> : null}
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
      {modalOpen.nickname ? <Check content={"사용할 수 있는 닉네임입니다"} handler={() => handleModalClose("nickname")} /> : null}
      <div className="signup__container">
        <div className="signup__container__space-01">핸드폰<span>*</span></div>
        <div className="signup__container__space-02">
          <input name="tel" onChange={handleInputValue} readOnly={disable.tel} placeholder="숫자만 입력해주세요" />
        </div>
        <div className="signup__container__space-03">
          <button onClick={() => handleCheckBtn("tel")} disabled={disable.tel} type="button">인증번호 받기</button>
        </div>
      </div>
      {message.tel ? <div className="signup__err-msg">{message.tel}</div> : null}
      {modalOpen.tel ? <Check content={"인증번호가 발송되었습니다"} handler={() => handleModalClose("tel")} /> : null}
      {openUI.tel 
      ? <div className="signup__container">
          <div className="signup__container__space-01"></div>
          <div className="signup__container__space-02">
            <input name="verifyTel" onChange={handleInputValue} placeholder="인증번호를 입력해주세요" />
          </div>
          <div className="signup__container__space-03">
            <button onClick={() => handleCheckBtn("verifyTel")} type="button">인증번호 확인</button>
          </div>
        </div>
      : null
      }
      {message.verifyTel ? <div className="signup__err-msg">{message.verifyTel}</div> : null}
      {modalOpen.verifyTel ? <Check content={"인증이 완료되었습니다"} handler={() => handleModalClose("verifyTel")} /> : null}
      <div className="signup__container">
        <div className="signup__container__space-01">이메일</div>
        <div className="signup__container__space-02">
          <input name="email" onChange={handleInputValue} readOnly={disable.email} placeholder="ex)sourcing@sourcing.com" />
        </div>
        <div className="signup__container__space-03">
          <button onClick={() => handleCheckBtn("email")} disabled={disable.email} type="button">인증번호 받기</button>
        </div>
      </div>
      {message.email ? <div className="signup__err-msg">{message.email}</div> : null}
      {modalOpen.email ? <Check content={"인증번호가 발송되었습니다"} handler={() => handleModalClose("email")} /> : null}
      {openUI.email 
      ? <div className="signup__container">
          <div className="signup__container__space-01"></div>
          <div className="signup__container__space-02">
            <input name="verifyEmail" onChange={handleInputValue} placeholder="인증번호를 입력해주세요" />
          </div>
          <div className="signup__container__space-03">
            <button onClick={() => handleCheckBtn("verifyEmail")} type="button">인증번호 확인</button>
          </div>
        </div>
      : null
      }
      {message.verifyEmail ? <div className="signup__err-msg">{message.verifyEmail}</div> : null}
      {modalOpen.verifyEmail ? <Check content={"인증이 완료되었습니다"} handler={() => handleModalClose("verifyEmail")} /> : null}
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