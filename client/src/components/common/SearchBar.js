import "../../App.css";
import "./common.css";
import { useLayoutEffect, useState } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faMagnifyingGlass, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import logo from "../../images/logo.PNG";
import Check from "../modal/Check";

function SearchBar() {

  const [menuBox, setMenuBox] = useState({
    status: false,
    content: "전체"
  });
  const [inputValue, setInputValue] = useState();
  const [modal, setModal] = useState(false);
  const [defaultValue, setDefaultValue] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
 
  const navigate = useNavigate();
  const location = useLocation();

  useLayoutEffect( () => {

    if (location.pathname === "/search") {

      const category = searchParams.get("category");
      const goods = searchParams.get("goods");
      
      switch (category) {
        case "vegetable": 
          setMenuBox({
            ...menuBox,
            content: "야채"
          });
          break;
        case "fruit": 
          setMenuBox({
            ...menuBox,
            content: "과일"
          });
          break;
        case "seafood": 
          setMenuBox({
            ...menuBox,
            content: "수산"
          });
          break;
      };

      if (goods) {
        setInputValue(goods);
        setDefaultValue(goods);
      }
      
    }

  }, [location]);

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

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleEnterKey = (e) => {

    if (e.key === "Enter") {
      handleClickSearch();
    }

  };

  const handleClickSearch = () => {

    if (!inputValue) {
      return setModal(true);
    }

    if (menuBox.content === "전체") {
      return navigate(`/search?goods=${inputValue}`);
    }

    let category;

    switch (menuBox.content) {
      case "야채":
        category = "vegetable";
        break;
      case "과일": 
        category = "fruit";
        break;
      case "수산": 
        category = "seafood";
        break;
    };

    return navigate(`/search?category=${category}&goods=${inputValue}`);
  };

  const handleCheckHandler = () => {
    setModal(false);
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
        <input onChange={handleInputValue} onKeyDown={handleEnterKey} placeholder="검색어를 입력해주세요" defaultValue={defaultValue} />
        <button type="button" onClick={handleClickSearch}><FontAwesomeIcon className="icon__size14" icon={faMagnifyingGlass} />SEARCH</button>
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
        <li><Link to="/mypage/like"><FontAwesomeIcon className="icon__size28 icon__color-red" icon={faHeart} /></Link></li>
        <li><Link to="/mypage/cart"><FontAwesomeIcon className="icon__size28" icon={faCartShopping} /></Link></li>
      </ul>
      {modal ? <Check content={"검색어를 입력해주세요"} handler={handleCheckHandler} /> : null}
    </div>
  );
}

export default SearchBar;