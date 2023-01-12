import "../../App.css";
import "./common.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faMagnifyingGlass, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import logo from "../../images/logo.PNG";

function SearchBar() {

  const [menuBox, setMenuBox] = useState({
    status: false,
    content: "전체"
  });

  const handleClickMenuBox = () => {

    if (menuBox.status) {
      return setMenuBox({
        ...menuBox,
        status: false
      });
    }

    setMenuBox({
      ...menuBox,
      status: true
    });
    
  };

  const handleClickMenuBoxList = (e) => {

    if (e.target.value === 0) {
      return setMenuBox({
        status: false,
        content: "전체"
      });
    }

    if (e.target.value === 1) {
      return setMenuBox({
        status: false,
        content: "야채"
      });
    }

    if (e.target.value === 2) {
      return setMenuBox({
        status: false,
        content: "과일"
      });
    }

    if (e.target.value === 3) {
      return setMenuBox({
        status: false,
        content: "수산"
      });
    }

  };

  return (
    <div className="searchbar">
      <div className="searchbar__logo">
        <Link to="/"><img src={logo} alt="logo" /></Link>
      </div>
      <div className="searchbar__searchbox">
        <div className="searchbar__searchbox__menu" onClick={handleClickMenuBox}>
          <div className="searchbar__searchbox__menu__text">{menuBox.content}</div>
          <div className="searchbar__searchbox__menu__icon"><FontAwesomeIcon icon={faCaretDown} /></div>
        </div>
        <input placeholder="검색어를 입력해주세요" />
        <button type="button"><FontAwesomeIcon className="icon__size14" icon={faMagnifyingGlass} />SEARCH</button>
        {menuBox.status
        ? <div className="searchbar__searchbox__menu-list">
            <ul onClick={handleClickMenuBoxList}>
              <li value={0}>전체</li>
              <li value={1}>야채</li>
              <li value={2}>과일</li>
              <li value={3}>수산</li>
            </ul>
          </div>
        : null}
      </div>
      <ul className="searchbar__menu">
        <li><Link to="/"><FontAwesomeIcon className="icon__size28 icon__color-red" icon={faHeart} /></Link></li>
        <li><Link to="/"><FontAwesomeIcon className="icon__size28" icon={faCartShopping} /></Link></li>
      </ul>
    </div>
  );
}

export default SearchBar;