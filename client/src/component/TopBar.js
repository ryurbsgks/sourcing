import "../App.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setIsLogin } from "../redux/action";

function TopBar() {

  const isLogin = useSelector( (state) => state.isLogIn );
  const dispatch = useDispatch();

  const handleLogoutBtn = () => {
    dispatch(setIsLogin(false));
  };

  return (
    <div className="topbar">
      <div className="container">
        {isLogin 
        ? <ul className="topbar__menu">
            <li><Link to="/">마이페이지</Link></li>
            <li><Link to="/" onClick={handleLogoutBtn}>로그아웃</Link></li>
          </ul>
        : <ul className="topbar__menu">
            <li><Link to="/login">로그인</Link></li>
            <li><Link to="/signup">회원가입</Link></li>
          </ul>
        }
      </div>
    </div>
  );
}

export default TopBar;