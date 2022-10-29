import "../../App.css";
import "./common.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="container">
        <ul className="navbar__menu">
          <li><Link to="/">야채</Link></li>
          <li><Link to="/">청과</Link></li>
          <li><Link to="/">수산</Link></li>
          <li><Link to="/">오늘의 시세</Link></li>
          <li><Link to="/">예약</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;