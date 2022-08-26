import "../App.css";
import { Link } from "react-router-dom"

function TopBar() {
  return (
    <div className="header__topbar">
      <div className="container">
        <ul className="header__topbar__menu">
          <li><Link to="/login">로그인</Link></li>
          <li><Link to="/signup">회원가입</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default TopBar;