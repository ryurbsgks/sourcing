import "../App.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

function Login() {
  return (
    <section className="login">
      <div className="login__title">로그인</div>
      <input placeholder="아이디를 입력해주세요" />
      <input type="password" placeholder="비밀번호를 입력해주세요" />
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
      <button type="button">로그인</button>
      <div className="login__signup">
        <Link to="/signup">회원가입 <FontAwesomeIcon icon={faAngleRight} /></Link>
      </div>
    </section>
  );
}

export default Login;