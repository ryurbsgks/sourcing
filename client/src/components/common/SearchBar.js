import "../../App.css";
import "./common.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faMagnifyingGlass, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import logo from "../../images/logo.PNG";

function SearchBar() {
  return (
    <div className="searchbar">
      <div className="searchbar__logo">
        <Link to="/"><img src={logo} alt="logo" /></Link>
      </div>
      <div className="searchbar__searchbox">
        <div className="searchbar__searchbox__menu">
          <div className="searchbar__searchbox__menu__text">전체</div>
          <div className="searchbar__searchbox__menu__icon"><FontAwesomeIcon icon={faCaretDown} /></div>
        </div>
        <input placeholder="검색어를 입력해주세요" />
        <button type="button"><FontAwesomeIcon className="icon__size14" icon={faMagnifyingGlass} />SEARCH</button>
        <div className="searchbar__searchbox__menu-list">
          <ul>
            <li>전체</li>
            <li>야채</li>
            <li>과일</li>
            <li>수산</li>
          </ul>
        </div>
      </div>
      <ul className="searchbar__menu">
        <li><Link to="/"><FontAwesomeIcon className="icon__size28 icon__color-red" icon={faHeart} /></Link></li>
        <li><Link to="/"><FontAwesomeIcon className="icon__size28" icon={faCartShopping} /></Link></li>
      </ul>
    </div>
  );
}

export default SearchBar;