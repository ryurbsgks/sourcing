import "../../App.css";
import "./mypage.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { setIsLogin } from "../../redux/action";
import Check from "../modal/Check";
import CheckTwoBtn from "../modal/CheckTwoBtn";
import { getCookie, removeCookie, setCookie } from "../../function";

function Modify({ userInfo }) {

  const [inputValue, setInputValue] = useState({
    nickname: userInfo.nickname,
    pw: "",
    newPw: "",
    newPwCheck: "",
    email: "",
    verifyEmail: "",
    address: userInfo.address,
    addressDetail: ""
  });
  const [message, setMessage] = useState({
    nickname: "",
    pw: "",
    newPw: "",
    newPwCheck: "",
    email: "",
    verifyEmail: "",
    modify: ""
  });
  const [check, setCheck] = useState({
    nickname: "",
    newPw: false,
    newPwCheck: false,
    email: ""
  });
  const [modalOpen, setModalOpen] = useState({
    nickname: false,
    pw: false,
    email: false,
    verifyEmail: false,
    modify: false,
    withdrawal: false
  });
  const [status, setStatus] = useState({
    email: userInfo.email ? true : false,
    address: userInfo.address ? true : false
  });
  const [openUI, setOpenUI] = useState({
    email: false,
    address: false
  });
  const [disable, setDisable] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(scriptUrl);
  const nicknameRegExp = /^[a-zA-Z가-힣0-9]{4,16}$/;
  const spaceRegExp = /^[^\s]{4,20}$/;
  const emailRegExp = /^[a-zA-Z0-9]([a-zA-Z0-9-_])*@[a-z]+\.(kr|com|net)$/;

  useEffect( () => {

    if (!inputValue.newPwCheck) {
      setCheck({
        ...check,
        newPwCheck: false
      });
      setMessage({
        ...message,
        newPwCheck: ""
      });
    }

    if (inputValue.newPwCheck) {
      if (inputValue.newPw === inputValue.newPwCheck) {
        setCheck({
          ...check,
          newPwCheck: true
        });
        return setMessage({
          ...message,
          newPwCheck: ""
        });
      }

      setCheck({
        ...check,
        newPwCheck: false
      });
      setMessage({
        ...message,
        newPwCheck: "비밀번호가 일치하지 않습니다"
      });
    }

  }, [inputValue.newPw, inputValue.newPwCheck]);

  const handleInputValue = (e) => {

    const { name, value } = e.target;

    setInputValue({
      ...inputValue,
      [name]: value
    });

    if (e.target.name === "newPw") {
      if (!e.target.value) {
        setCheck({
          ...check,
          newPw: false
        });
        setMessage({
          ...message,
          newPw: ""
        });
      }

      if (e.target.value) {
        if (!spaceRegExp.test(e.target.value)) {
          setCheck({
            ...check,
            newPw: false
          });
          return setMessage({
            ...message,
            newPw: "공백을 제외한 4 ~ 20자를 입력해주세요"
          });
        }

        setCheck({
          ...check,
          newPw: true
        });
        setMessage({
          ...message,
          newPw: ""
        });
      }
    }

  }

  const handleCheckNickname = () => {

    if (inputValue.nickname === userInfo.nickname) {
      return setMessage({
        ...message,
        nickname: ""
      });
    }

    if (!nicknameRegExp.test(inputValue.nickname)) {
      return setMessage({
        ...message,
        nickname: "4 ~ 16자의 영문, 한글, 숫자만 가능합니다"
      });
    }

    axios.post(`${process.env.REACT_APP_URL}/user/checkNickname`, {
      nickname: inputValue.nickname
    }).then( (res) => {
      if (res.data.message === "사용할 수 있는 닉네임입니다") {
        setCheck({
          ...check,
          nickname: inputValue.nickname
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

  };

  const handleChangeEmail = () => {

    setStatus({
      ...status,
      email: false
    });

  };

  const handleCheckEmail = () => {

    if (!emailRegExp.test(inputValue.email)) {
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
      email: inputValue.email
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
        setDisable(true);
        setModalOpen({
          ...modalOpen,
          email: true
        });
      }
    })

  };

  const handleVerifyEmail = () => {

    if (!inputValue.verifyEmail) {
      return setMessage({
        ...message,
        verifyEmail: "인증번호를 입력해주세요"
      });
    }

    axios.post(`${process.env.REACT_APP_URL}/user/signup/verify`, {
      verifyEmail: inputValue.verifyEmail
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
        setCheck({
          ...check,
          email: inputValue.email
        })
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
        setDisable(false);
        return setMessage({
          ...message,
          verifyEmail: "인증 유효 시간이 만료되었습니다"
        })
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

    setInputValue({
      ...inputValue,
      address: fullAddress
    });
    setStatus({
      ...status,
      address: true
    });
    setOpenUI({
      ...openUI,
      address: true
    });
  }

  const handleClickAddress = () => {
    open({ onComplete: handleComplete });
  };

  const handleModalClose = (id) => {

    if (id === "nickname") {
      setModalOpen({
        ...modalOpen,
        nickname: false
      });
    }

    if (id === "pw") {
      setModalOpen({
        ...modalOpen,
        pw: false
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

    if (id === "modify") {
      setModalOpen({
        ...modalOpen,
        modify: false
      });
      window.location.reload();
    }

    if (id === "leftHandler") {

      axios.delete(`${process.env.REACT_APP_URL}/user/withdrawal`, {
        data: {
          id: userInfo.id
        }
      }).then( (res) => {
        dispatch(setIsLogin(false));
        removeCookie("sourcingAccess");
        return navigate("/");
      });

    }

    if (id === "rightHandler") {
      setModalOpen({
        ...modalOpen,
        withdrawal: false
      });
    }
    
  };

  const handleClickModify = () => {

    let nickname, password, newPassword, email, address;

    if (inputValue.nickname !== userInfo.nickname) {
      if (inputValue.nickname !== check.nickname) {
        return setMessage({
          ...message,
          modify: "닉네임 중복확인을 해주세요"
        });
      }
      
      nickname = check.nickname;
      setMessage({
        ...message,
        modify: ""
      });
    }

    if (inputValue.newPw || inputValue.newPwCheck) {
      if (!inputValue.pw) {
        return setModalOpen({
          ...modalOpen,
          pw: true
        });
      }
      if (!check.newPwCheck) {
        return setMessage({
          ...message,
          modify: "비밀번호가 일치하지 않습니다"
        });
      }
      
      password = inputValue.pw;
      newPassword = inputValue.newPw;
      setMessage({
        ...message,
        modify: ""
      });
    }

    if (inputValue.email) {
      if (inputValue.email !== check.email) {
        return setMessage({
          ...message,
          modify: "이메일 인증을 해주세요"
        });
      }

      email = check.email;
      setMessage({
        ...message,
        modify: ""
      });
    }

    if (openUI.address) {
      if (!inputValue.addressDetail) {
        return setMessage({
          ...message,
          modify: "상세 주소를 입력해주세요"
        });
      }

      address = `${inputValue.address}-${inputValue.addressDetail}`;
      setMessage({
        ...message,
        modify: ""
      });
    }

    if (nickname || newPassword || email || address) {
      axios.patch(`${process.env.REACT_APP_URL}/user/modify`, {
        id: userInfo.id,
        nickname: nickname,
        password: password,
        newPassword: newPassword,
        email: email,
        address: address,
        auto: userInfo.auto
      }).then( (res) => {
        if (res.data.message === "회원 정보 수정 성공") {
          setMessage({
            nickname: "",
            pw: "",
            newPw: "",
            newPwCheck: "",
            email: "",
            verifyEmail: "",
            modify: ""
          });
          removeCookie("sourcingAccess");
          setCookie("sourcingAccess", res.data.accessToken)
          setModalOpen({
            ...modalOpen,
            modify: true
          });
        }
      }).catch( (err) => {
        if (err.response.data.message === "비밀번호가 일치하지 않습니다") {
          setMessage({
            ...message,
            pw: "비밀번호가 일치하지 않습니다"
          });
        }
      });
    }

  };

  const handleWithdrawal = () => {
    setModalOpen({
      ...modalOpen,
      withdrawal: true
    });
  };

  return (
    <>
      <h3>개인 정보 수정</h3>
      <div className="modify__container">
        <div className="modify__container__space-01">닉네임</div>
        <div className="modify__container__space-02">
          <input name="nickname" onChange={handleInputValue} defaultValue={userInfo.nickname} />
        </div>
        <div className="modify__container__space-03">
          <button onClick={handleCheckNickname}>중복확인</button>
        </div>
      </div>
      {message.nickname ? <div className="modify__err-msg">{message.nickname}</div> : null}
      {modalOpen.nickname ? <Check content={"사용할 수 있는 아이디입니다"} handler={() => handleModalClose("nickname")} /> : null}
      <div className="modify__container">
        <div className="modify__container__space-01">현재 비밀번호</div>
        <div className="modify__container__space-02">
          <input name="pw" onChange={handleInputValue} type="password" placeholder="비밀번호를 입력해주세요" />
        </div>
        <div className="modify__container__space-03"></div>
      </div>
      {message.pw ? <div className="modify__err-msg">{message.pw}</div> : null}
      {modalOpen.pw ? <Check content={"기존 비밀번호를 입력해 주세요"} handler={() => handleModalClose("pw")} /> : null}
      <div className="modify__container">
        <div className="modify__container__space-01">새 비밀번호</div>
        <div className="modify__container__space-02">
          <input name="newPw" onChange={handleInputValue} type="password" placeholder="새 비밀번호를 입력해주세요" />
        </div>
        <div className="modify__container__space-03"></div>
      </div>
      {message.newPw ? <div className="modify__err-msg">{message.newPw}</div> : null}
      <div className="modify__container">
        <div className="modify__container__space-01">새 비밀번호 확인</div>
        <div className="modify__container__space-02">
          <input name="newPwCheck" onChange={handleInputValue} type="password" placeholder="새 비밀번호를 다시 입력해주세요" />
        </div>
        <div className="modify__container__space-03"></div>
      </div>
      {message.newPwCheck ? <div className="modify__err-msg">{message.newPwCheck}</div> : null}
      <div className="modify__container">
        <div className="modify__container__space-01">이메일</div>
        {status.email 
        ? <>
            <div className="modify__container__space-02">
              {userInfo.email}
            </div>
            <div className="modify__container__space-03">
              <button onClick={handleChangeEmail}>이메일 변경</button>
            </div>
          </> 
        : <>
            <div className="modify__container__space-02">
              <input name="email" onChange={handleInputValue} placeholder="ex)sourcing@sourcing.com" />
            </div>
            <div className="modify__container__space-03">
              <button onClick={handleCheckEmail} disabled={disable}>인증번호 받기</button>
            </div>
          </>}
      </div>
      {message.email ? <div className="modify__err-msg">{message.email}</div> : null}
      {modalOpen.email ? <Check content={"인증번호가 발송되었습니다"} handler={() => handleModalClose("email")} /> : null}
      {openUI.email 
      ? <div className="modify__container">
          <div className="modify__container__space-01"></div>
          <div className="modify__container__space-02">
            <input name="verifyEmail" onChange={handleInputValue} placeholder="인증번호를 입력해주세요" />
          </div>
          <div className="modify__container__space-03">
            <button onClick={handleVerifyEmail}>인증번호 확인</button>
          </div>
        </div>
      : null}
      {message.verifyEmail ? <div className="modify__err-msg">{message.verifyEmail}</div> : null}
      {modalOpen.verifyEmail ? <Check content={"인증이 완료되었습니다"} handler={() => handleModalClose("verifyEmail")} /> : null}
      <div className="modify__container">
        <div className="modify__container__space-01">주소</div>
        {status.address 
        ? <>
            <div className="modify__container__space-address">{inputValue.address}</div>
            <div className="modify__container__space-03">
              <button onClick={handleClickAddress}>주소지 변경</button>
            </div>
          </>
        : <>
            <div className="modify__container__space-02">
              <button onClick={handleClickAddress}>주소 검색</button>
            </div>
            <div className="modify__container__space-03"></div>
          </>}
      </div>
      {openUI.address 
      ? <div className="modify__container">
          <div className="modify__container__space-01"></div>
          <div className="modify__container__space-02">
            <input name="addressDetail" onChange={handleInputValue} placeholder="상세 주소를 입력해주세요" />
          </div>
          <div className="modify__container__space-03"></div>
        </div> 
      : null}
      {message.modify ? <div className="modify__err-msg">{message.modify}</div> : null}
      <div className="modify__area-btn">
        <button onClick={handleWithdrawal}>회원 탈퇴</button>
        <button onClick={handleClickModify}>정보 수정</button>
      </div>
      {modalOpen.withdrawal ? <CheckTwoBtn content={"회원 탈퇴를 하시겠습니까?"} leftHandler={() => handleModalClose("leftHandler")} rightHandler={() => handleModalClose("rightHandler")} leftBtn={"네"} rightBtn={"아니요"} /> : null}
      {modalOpen.modify ? <Check content={"회원 정보가 수정되었습니다"} handler={() => handleModalClose("modify")} /> : null}
    </>
  );
};

export default Modify;