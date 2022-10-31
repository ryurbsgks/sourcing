import "../../App.css";
import "./common.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="container">
        <ul className="navbar__menu">
          <li><Link to="/category/vegetable">야채</Link></li>
          <li><Link to="/category/fruit">과일</Link></li>
          <li><Link to="/category/seafood">수산물</Link></li>
          <li><Link to="/">오늘의 시세</Link></li>
          <li><Link to="/">예약</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;