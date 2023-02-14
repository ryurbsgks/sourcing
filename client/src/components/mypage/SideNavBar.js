import "../../App.css";
import "./mypage.css";
import { NavLink } from "react-router-dom";

function SideNavBar() {
  return (
    <nav className="sidenavbar">
      <h2>나의 장 목록</h2>
      <ul className="sidenavbar__menu">
        <li><NavLink to="/mypage/order" style={({ isActive }) => ({ color: isActive ? "green" : "" })}>주문 내역</NavLink></li>
        <li><NavLink to="/mypage/cart" style={({ isActive }) => ({ color: isActive ? "green" : "" })}>장바구니</NavLink></li>
        <li><NavLink to="/mypage/like" style={({ isActive }) => ({ color: isActive ? "green" : "" })}>찜한 상품</NavLink></li>
        <li><NavLink to="/mypage/modify" style={({ isActive }) => ({ color: isActive ? "green" : "" })}>개인 정보 수정</NavLink></li>
      </ul>
    </nav>
  );
};

export default SideNavBar;