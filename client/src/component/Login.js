import "../App.css";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

function Login() {

  const [loginInfo, setLoginInfo] = useState({
    userID: "",
    pw: ""
  });

  const navigate = useNavigate();

  const handleInputValue = (e) => {

    const { name, value } = e.target;

    setLoginInfo({
      ...loginInfo,
      [name]: value
    });

  }

  const handleLoginBtn = () => {

    axios.post(`${process.env.REACT_APP_URL}/user/login`, {
      userID: loginInfo.userID,
      pw: loginInfo.pw
    }).then( (res) => {
      if (res.data.message === "로그인 성공") {
        navigate("/");
      }
    }).catch( (err) => {
      console.log("-----err-----", err)
    });

  };

  const handleEnterKey = (e) => {

    if (e.key === "Enter") {
      handleLoginBtn();
    }

  }

  return (
    <section className="login">
      <div className="login__title">로그인</div>
      <input name="userID" onChange={handleInputValue} onKeyDown={handleEnterKey} placeholder="아이디를 입력해주세요" />
      <input name="pw" onChange={handleInputValue} onKeyDown={handleEnterKey} type="password" placeholder="비밀번호를 입력해주세요" />
      <div className="login__container">
        <div className="login__container__auto-login">
          <label>
            <input type="checkbox" />
            자동 로그인
          </label>
        </div>
        <div className="login__container__find-link">
          <Link to="/">아이디 찾기</Link>
          <hr />
          <Link to="/">비밀번호 찾기</Link>
        </div>
      </div>
      <button onClick={handleLoginBtn} type="button">로그인</button>
      <div className="login__signup">
        <Link to="/signup">회원가입 <FontAwesomeIcon icon={faAngleRight} /></Link>
      </div>
    </section>
  );
}

export default Login;