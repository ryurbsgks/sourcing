import "../App.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="header__navbar">
      <div className="container">
        <ul className="header__navbar__menu row">
          <li><Link to="/">야채</Link></li>
          <li><Link to="/">청과</Link></li>
          <li><Link to="/">수산</Link></li>
          <li><Link to="/">오늘의 시세</Link></li>
          <li><Link to="/">예약</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;