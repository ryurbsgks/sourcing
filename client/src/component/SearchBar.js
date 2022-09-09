import "../App.css"
import logo from "../images/logo.PNG"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faMagnifyingGlass, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { Link } from "react-router-dom"

function SearchBar() {
  return (
    <div className="header__searchbar">
      <div className="container row">
        <div className="header__searchbar__logo">
          <img src={logo} alt="오늘의 장 logo" />
        </div>
        <div className="header__searchbar__searchbox">
          <div className="header__searchbar__searchbox__dropmenu">
            <Link to="/">전체<FontAwesomeIcon icon={faCaretDown} /></Link>
          </div>
          <div className="header__searchbar__searchbox__droplist">
            <ul>
              <li><Link to="/">전체</Link></li>
              <li><Link to="/">야채</Link></li>
              <li><Link to="/">과일</Link></li>
              <li><Link to="/">수산</Link></li>
            </ul>
          </div>
          <input placeholder="검색어를 입력해 주세요" />
          <button><FontAwesomeIcon icon={faMagnifyingGlass} />SEARCH</button>
        </div>
        <ul className="header__searchbar__menu"> 
          <li><Link to="/"><FontAwesomeIcon className="icon__size28" icon={faHeart} /></Link></li>
          <li><Link to="/"><FontAwesomeIcon className="icon__size28" icon={faCartShopping} /></Link></li>
        </ul>
      </div>
    </div>
  );
}

export default SearchBar;