import "../App.css";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsLogin } from "../redux/action";
import { getCookie } from "../function";

function TopBar() {

  useEffect( () => {

    if (isLogin) {

      axios.get(`${process.env.REACT_APP_URL}/user/auth`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${getCookie("sourcingAccess")}`
        }
      }).then( (res) => {
        if (res.data.message !== "로그인 상태입니다") {
          return dispatch(setIsLogin(false));
        }
      });

    }
    
  }, []);

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