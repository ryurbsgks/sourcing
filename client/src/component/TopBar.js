import "../App.css";
import { Link } from "react-router-dom";

function TopBar() {
  return (
    <div className="topbar">
      <div className="container">
        <ul className="topbar__menu">
          <li><Link to="/login">로그인</Link></li>
          <li><Link to="/signup">회원가입</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default TopBar;