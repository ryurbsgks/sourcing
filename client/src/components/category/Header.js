import "../../App.css";
import "./category.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function Header({ params, auth }) {

  const [category, setCategory] = useState("");
  
  useEffect( () => {

    if (params === "vegetable") {
      return setCategory("야채");
    }

    if (params === "fruit") {
      return setCategory("과일");
    }

    if (params === "seafood") {
      return setCategory("수산물");
    }

  }, []);

  return (
    <>
      <h2 className="header__title">{category}</h2>
      <div className="header__menu">
        {auth === 2 ? <button>상품 등록</button> : null}
        <div className="header__menu__sortbox">
          <span>베스트순</span>
          <div className="header__menu__sortbox__icon">
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
        </div>
        <div className="header__menu__sortbox-list">
          <ul>
            <li>베스트순</li>
            <li>신상품순</li>
            <li>낮은 가격순</li>
            <li>높은 가격순</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;