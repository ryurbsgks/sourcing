import "../../App.css";
import "./member.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Check from "../modal/Check";
import { getCookie, removeCookie } from "../../function"

function Signup() {

  const [signupInfo, setSignupInfo] = useState({
    userID: "",
    pw: "",
    pwCheck: "",
    nickname: "",
    tel: "",
    email: "",
    verifyTel: "",
    verifyEmail: "",
    address: "",
    addressDetail: ""
  });
  const [message, setMessage] = useState({
    userID: "",
    pw: "",
    pwCheck: "",
    nickname: "",
    tel: "",
    email: "",
    verifyTel: "",
    verifyEmail: "",
    signup: ""
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
  const [checkSignupInfo, setCheckSignupInfo] = useState({
    userID: "",
    pw: false,
    pwCheck: false,
    nickname: "",
    tel: "",
    email: ""
  });

  useEffect( () => {

    if (!signupInfo.pwCheck) {
      setCheckSignupInfo({
        ...checkSignupInfo,
        pwCheck: false
      });
      setMessage({
        ...message,
        pwCheck: ""
      });
    }

    if (signupInfo.pwCheck) {
      if (signupInfo.pw === signupInfo.pwCheck) {
        setCheckSignupInfo({
          ...checkSignupInfo,
          pwCheck: true
        });
        return setMessage({
          ...message,
          pwCheck: ""
        });
      } 

      setCheckSignupInfo({
        ...checkSignupInfo,
        pwCheck: false
      });
      setMessage({
        ...message,
        pwCheck: "비밀번호가 일치하지 않습니다"
      });
    }

  }, [signupInfo.pw, signupInfo.pwCheck]);

  const navigate = useNavigate();
  const scriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(scriptUrl);
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
        setCheckSignupInfo({
          ...checkSignupInfo,
          pw: false
        });
        setMessage({
          ...message,
          pw: ""
        });
      }

      if (e.target.value) {
        if (!spaceRegExp.test(e.target.value)) {
          setCheckSignupInfo({
            ...checkSignupInfo,
            pw: false
          });
          return setMessage({
            ...message,
            pw: "공백을 제외한 4 ~ 20자를 입력해주세요"
          });
        }

        setCheckSignupInfo({
          ...checkSignupInfo,
          pw: true
        });
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
          setCheckSignupInfo({
            ...checkSignupInfo,
            userID: signupInfo.userID
          });
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
          setCheckSignupInfo({
            ...checkSignupInfo,
            nickname: signupInfo.nickname
          });
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
          setCheckSignupInfo({
            ...checkSignupInfo,
            tel: signupInfo.tel
          });
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
          setCheckSignupInfo({
            ...checkSignupInfo,
            email: signupInfo.email
          });
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

    if (!signupInfo.userID || !signupInfo.pw || !signupInfo.pwCheck || !signupInfo.nickname || !signupInfo.tel) {
      return setMessage({
        ...message,
        signup: "필수 항목을 모두 입력해주세요"
      });
    }

    if (signupInfo.userID !== checkSignupInfo.userID) {
      return setMessage({
        ...message,
        signup: "아이디 중복확인을 해주세요"
      });
    }

    if (!checkSignupInfo.pw) {
      return setMessage({
        ...message,
        signup: "비밀번호를 확인해주세요"
      });
    }

    if (!checkSignupInfo.pwCheck) {
      return setMessage({
        ...message,
        signup: "동일한 비밀번호를 입력해주세요"
      });
    }

    if (signupInfo.nickname !== checkSignupInfo.nickname) {
      return setMessage({
        ...message,
        signup: "닉네임 중복확인을 해주세요"
      });
    }

    if (signupInfo.tel !== checkSignupInfo.tel) {
      return setMessage({
        ...message,
        signup: "핸드폰 인증을 해주세요"
      });
    }

    if (signupInfo.email) {
      if (signupInfo.email !== checkSignupInfo.email) {
        return setMessage({
          ...message,
          signup: "이메일 인증을 해주세요"
        });
      }
    }
    
    if (signupInfo.address) {
      if (!signupInfo.addressDetail) {
        return setMessage({
          ...message,
          signup: "상세 주소를 입력해주세요"
        });
      }
    }

    axios.post(`${process.env.REACT_APP_URL}/user/signup`, {
      userID: signupInfo.userID,
      pw: signupInfo.pw,
      nickname: signupInfo.nickname,
      tel: signupInfo.tel,
      email: signupInfo.email,
      address: signupInfo.address,
      addressDetail: signupInfo.addressDetail,
      auth: 1
    }).then( (res) => {
      if (res.data.message === "회원가입 성공") {
        navigate("/login");
      }
    });

  };

  const handleComplete = (data) => {

    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }

      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }

      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setSignupInfo({
      ...signupInfo,
      address: fullAddress
    });
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
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
          {signupInfo.address 
          ? <input readOnly={true} value={signupInfo.address} />
          : <button onClick={handleClick} type="button"><FontAwesomeIcon icon={faMagnifyingGlass} />주소 검색</button>
          }
        </div>
        <div className="signup__container__space-03"></div>
      </div>
      {signupInfo.address 
      ? <div className="signup__container">
          <div className="signup__container__space-01"></div>
          <div className="signup__container__space-02">
            <input name="addressDetail" onChange={handleInputValue} placeholder="상세 주소를 입력해주세요" />
          </div>
          <div className="signup__container__space-03"></div>
        </div>
      : null
      }
      {message.signup ? <div className="signup__err-msg">{message.signup}</div> : null}
      <div className="signup__btn">
        <button onClick={handleSignupBtn} type="button">회원가입</button>
      </div>  
    </section>
  );
}

export default Signup;