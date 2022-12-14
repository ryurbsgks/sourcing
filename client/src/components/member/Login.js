import "../../App.css";
import "./member.css";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

function Login() {

  const [loginInfo, setLoginInfo] = useState({
    userID: "",
    pw: "",
    auto: false
  });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleInputValue = (e) => {

    const { name, value } = e.target;

    setLoginInfo({
      ...loginInfo,
      [name]: value
    });

  };

  const handleLoginBtn = () => {
    
    if (!loginInfo.userID || !loginInfo.pw) {
      return setMessage("아이디, 비밀번호를 모두 입력해 주세요");
    }

    axios.post(`${process.env.REACT_APP_URL}/user/login`, {
      userID: loginInfo.userID,
      pw: loginInfo.pw,
      auto: loginInfo.auto
    }, {
      withCredentials: true
    }).then( (res) => {
      if (res.data.message === "로그인 성공") {
        setMessage("");
        return navigate("/", {
          state: {
            isLogin: true
          }
        });
      }
    }).catch( (err) => {
      if (err.response.data.message === "아이디 또는 비밀번호가 일치하지 않습니다") {
        setMessage("아이디 또는 비밀번호가 일치하지 않습니다");
      }
    });

  };

  const handleEnterKey = (e) => {

    if (e.key === "Enter") {
      handleLoginBtn();
    }

  };

  const handleAutoLogin = (e) => {
    setLoginInfo({
      ...loginInfo,
      auto: e.target.checked
    });
  };

  return (
    <section className="login">
      <div className="login__title">로그인</div>
      <input name="userID" onChange={handleInputValue} onKeyDown={handleEnterKey} placeholder="아이디를 입력해주세요" />
      <input name="pw" onChange={handleInputValue} onKeyDown={handleEnterKey} type="password" placeholder="비밀번호를 입력해주세요" />
      {message ? <div className="login__err-msg">{message}</div> : null}
      <div className="login__container">
        <div className="login__container__auto-login">
          <label>
            <input type="checkbox" onChange={handleAutoLogin} />
            자동 로그인
          </label>
        </div>
        <div className="login__container__find-link">
          <Link to="/find/id">아이디 찾기</Link>
          <hr />
          <Link to="/find/pw">비밀번호 찾기</Link>
        </div>
      </div>
      <button onClick={handleLoginBtn} type="button">로그인</button>
      <div className="login__signup">
        <Link to="/member/signup">회원가입 <FontAwesomeIcon icon={faAngleRight} /></Link>
      </div>
    </section>
  );
}

export default Login;