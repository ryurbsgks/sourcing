import "../../App.css";
import "./common.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsLogin } from "../../redux/action";
import { removeCookie } from "../../function";

function TopBar() {

  const isLogin = useSelector( (state) => state.isLogIn );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoutBtn = () => {
    dispatch(setIsLogin(false));
    removeCookie("sourcingAccess");
    navigate("/");
  };

  return (
    <article className="topbar">
      <div className="container">
        {isLogin 
        ? <ul className="topbar__menu">
            <li><Link to="/mypage/order">마이페이지</Link></li>
            <li><Link to="/" onClick={handleLogoutBtn}>로그아웃</Link></li>
          </ul>
        : <ul className="topbar__menu">
            <li><Link to="/member/login">로그인</Link></li>
            <li><Link to="/member/signup">회원가입</Link></li>
          </ul>
        }
      </div>
    </article>
  );
}

export default TopBar;