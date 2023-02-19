import "../../App.css";
import "./common.css";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="container">
        <ul className="navbar__menu">
          <li><NavLink to="/category/vegetable" style={({ isActive }) => ({ color: isActive ? "green" : "" })}>야채</NavLink></li>
          <li><NavLink to="/category/fruit" style={({ isActive }) => ({ color: isActive ? "green" : "" })}>과일</NavLink></li>
          <li><NavLink to="/category/seafood" style={({ isActive }) => ({ color: isActive ? "green" : "" })}>수산물</NavLink></li>
          <li><NavLink to="/" style={({ isActive }) => ({ color: isActive ? "green" : "" })}>오늘의 시세</NavLink></li>
          <li><NavLink to="/" style={({ isActive }) => ({ color: isActive ? "green" : "" })}>예약</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;