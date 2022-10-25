import "../App.css";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Check from "../modal/Check";

function FindPW() {

  const [authStatus, setAuthStatus] = useState({
    tel: "find__auth-btn--select",
    email: "find__auth-btn"
  });
  const [findInfo, setFindInfo] = useState({
    userID: "",
    tel: "",
    email: ""
  });
  const [message, setMessage] = useState({
    tel: "",
    email: ""
  });
  const [modalOpen, setModalOpen] = useState({
    tel: false,
    email: false
  });

  const navigate = useNavigate();
  const phoneRegExp = /^010[0-9]{8}$/;
  const emailRegExp = /^[a-zA-Z0-9]([a-zA-Z0-9-_])*@[a-z]+\.(kr|com|net)$/;

  const handleClickBtn = (id) => {

    if (id === "tel") {
      setAuthStatus({
        tel: "find__auth-btn--select",
        email: "find__auth-btn"
      });
      setFindInfo({
        ...findInfo,
        email: ""
      });
      setMessage({
        ...message,
        email: ""
      });
    }

    if (id === "email") {
      setAuthStatus({
        tel: "find__auth-btn",
        email: "find__auth-btn--select"
      });
      setFindInfo({
        ...findInfo,
        tel: ""
      });
      setMessage({
        ...message,
        tel: ""
      });
    }

  };

  const handleInputValue = (e) => {

    const { name, value } = e.target;

    setFindInfo({
      ...findInfo,
      [name]: value
    });

  };

  const handleFindBtn = () => {

    if (authStatus.tel === "find__auth-btn--select") {
      if (!findInfo.userID && !findInfo.tel) {
        return setMessage({
          tel: "아이디, 핸드폰 번호를 모두 입력해주세요",
          email: ""
        });
      }

      if (!findInfo.userID) {
        return setMessage({
          tel: "아이디를 입력해주세요",
          email: ""
        });
      }

      if (!findInfo.tel) {
        return setMessage({
          tel: "핸드폰 번호를 입력해주세요",
          email: ""
        });
      }

      if (!phoneRegExp.test(findInfo.tel)) {
        return setMessage({
          tel: "핸드폰 번호를 확인해주세요",
          email: ""
        });
      }

      axios.post(`${process.env.REACT_APP_URL}/user/find/pw`, {
        userID: findInfo.userID,
        tel: findInfo.tel
      }).then( (res) => {
        if (res.data.message === "핸드폰으로 비밀번호를 전송하였습니다") {
          setMessage({
            tel: "",
            email: ""
          });
          setModalOpen({
            ...modalOpen,
            tel: true
          });
        }
      }).catch( (err) => {
        if (err.response.data.message === "입력하신 회원 정보가 맞는지 확인해주세요") {
          setMessage({
            tel: "가입 시 입력하신 회원정보가 맞는지 확인해주세요",
            email: ""
          });
        }
      });

    }

    if (authStatus.email === "find__auth-btn--select") {
      if (!findInfo.userID && !findInfo.email) {
        return setMessage({
          tel: "",
          email: "아이디, 이메일을 모두 입력해주세요"
        });
      }

      if (!findInfo.userID) {
        return setMessage({
          tel: "",
          email: "아이디를 입력해주세요"
        });
      }

      if (!findInfo.email) {
        return setMessage({
          tel: "",
          email: "이메일을 입력해주세요"
        });
      }

      if (!emailRegExp.test(findInfo.email)) {
        return setMessage({
          tel: "",
          email: "이메일을 확인해주세요"
        });
      }

      axios.post(`${process.env.REACT_APP_URL}/user/find/pw`, {
        userID: findInfo.userID,
        email: findInfo.email
      }).then( (res) => {
        if (res.data.message === "이메일로 비밀번호를 전송하였습니다") {
          setMessage({
            tel: "",
            email: ""
          });
          setModalOpen({
            ...modalOpen,
            email: true
          });
        }
      }).catch( (err) => {
        if (err.response.data.message === "입력하신 회원 정보가 맞는지 확인해주세요") {
          setMessage({
            tel: "",
            email: "가입 시 입력하신 회원정보가 맞는지 확인해주세요"
          });
        }
      });

    }

  };

  const handleModalClose = (id) => {

    if (id === "tel") {
      setModalOpen({
        ...modalOpen,
        tel: false
      });
      navigate("/login");
    }

    if (id === "email") {
      setModalOpen({
        ...modalOpen,
        email: false
      });
      navigate("/login");
    }

  };

  return (
    <section className="find">
      <div className="find__title">비밀번호 찾기</div>
      <button className={authStatus.tel} onClick={() => handleClickBtn("tel")}>핸드폰 인증</button>
      <button className={authStatus.email} onClick={() => handleClickBtn("email")}>이메일 인증</button>
      <input name="userID" onChange={handleInputValue} placeholder="아이디를 입력해주세요" />
      {authStatus.tel === "find__auth-btn--select" 
      ? <input name="tel" onChange={handleInputValue} placeholder="핸드폰 번호를 입력해주세요" value={findInfo.tel} />
      : <input name="email" onChange={handleInputValue} placeholder="이메일을 입력해주세요" value={findInfo.email} />}
      {message.tel ? <div className="signup__err-msg">{message.tel}</div> : null}
      {message.email ? <div className="signup__err-msg">{message.email}</div> : null}
      <button className="find__find-btn" onClick={handleFindBtn}>비밀번호 찾기</button>
      {modalOpen.tel ? <Check content={"핸드폰으로 비밀번호를 전송하였습니다"} handler={() => handleModalClose("tel")} /> : null}
      {modalOpen.email ? <Check content={"이메일로 비밀번호를 전송하였습니다"} handler={() => handleModalClose("email")} /> : null}
    </section>
  );
};

export default FindPW;