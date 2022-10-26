import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Check from "../modal/Check";

function SellerSignup() {

  const [signupInfo, setSignupInfo] = useState({
    userID: "",
    pw: "",
    pwCheck: "",
    nickname: "",
    tel: ""
  });
  const [message, setMessage] = useState({
    userID: "",
    pw: "",
    pwCheck: "",
    nickname: "",
    signup: ""
  });
  const [modalOpen, setModalOpen] = useState({
    userID: false,
    nickname: false
  });
  const [checkSignupInfo, setCheckSignupInfo] = useState({
    userID: "",
    pw: false,
    pwCheck: false,
    nickname: "",
    tel: ""
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
  const userIDRegExp = /^[a-zA-Z0-9]{4,12}$/;
  const spaceRegExp = /^[^\s]{4,20}$/;
  const nicknameRegExp = /^[a-zA-Z가-힣0-9]{4,16}$/;
  const sellerNumberRegExp = /^[0-9]*$/;

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

    if (e.target.name === "tel") {
      if (!e.target.value) {
        setMessage({
          ...message,
          signup: ""
        });
      }

      if (e.target.value) {
        if (!sellerNumberRegExp.test(e.target.value)) {
          return setMessage({
            ...message,
            signup: "숫자만 입력해주세요"
          });
        }

        setCheckSignupInfo({
          ...checkSignupInfo,
          tel: e.target.value
        });
        setMessage({
          ...message,
          signup: ""
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
        signup: "판매자명 중복확인을 해주세요"
      });
    }

    if (signupInfo.tel !== checkSignupInfo.tel) {
      return setMessage({
        ...message,
        signup: "사업자 등록번호를 확인해주세요"
      });
    }

    axios.post(`${process.env.REACT_APP_URL}/user/signup`, {
      userID: signupInfo.userID,
      pw: signupInfo.pw,
      nickname: signupInfo.nickname,
      tel: signupInfo.tel,
      auth: 2
    }).then( (res) => {
      if (res.data.message === "회원가입 성공") {
        navigate("/login");
      }
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
        <div className="signup__container__space-01">판매자명<span>*</span></div>
        <div className="signup__container__space-02">
          <input name="nickname" onChange={handleInputValue} placeholder="판매자명을 입력해주세요" />
        </div>
        <div className="signup__container__space-03">
          <button onClick={() => handleCheckBtn("nickname")} type="button">중복확인</button>
        </div>
      </div>
      {message.nickname ? <div className="signup__err-msg">{message.nickname}</div> : null}
      {modalOpen.nickname ? <Check content={"사용할 수 있는 판매자명입니다"} handler={() => handleModalClose("nickname")} /> : null}
      <div className="signup__container">
        <div className="signup__container__space-01">사업자 등록번호<span>*</span></div>
        <div className="signup__container__space-02">
          <input name="tel" onChange={handleInputValue} placeholder="숫자만 입력해주세요" />
        </div>
        <div className="signup__container__space-03"></div>
      </div>
      {message.signup ? <div className="signup__err-msg">{message.signup}</div> : null}
      <div className="signup__btn">
        <button onClick={handleSignupBtn} type="button">회원가입</button>
      </div>  
    </section>
  );
}

export default SellerSignup;