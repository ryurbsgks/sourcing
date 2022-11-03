import "../../App.css";
import "./category.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function Header({ params, auth }) {

  const [category, setCategory] = useState("");
  const [sortbox, setSortbox] = useState({
    status: false,
    content: "베스트순"
  });
  
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

  }, [params]);

  const handleClickSortbox = () => {

    if (sortbox.status) {
      return setSortbox({
        ...sortbox,
        status: false
      });
    }

    if (!sortbox.status) {
      return setSortbox({
        ...sortbox,
        status: true
      });
    }

  };

  const handleClickSortboxList = (e) => {

    if (e.target.value === 0) {
      return setSortbox({
        status: false,
        content: "베스트순"
      });
    }

    if (e.target.value === 1) {
      return setSortbox({
        status: false,
        content: "신상품순"
      });
    }

    if (e.target.value === 2) {
      return setSortbox({
        status: false,
        content: "낮은 가격순"
      });
    }

    if (e.target.value === 3) {
      return setSortbox({
        status: false,
        content: "높은 가격순"
      });
    }

  };

  return (
    <>
      <h2 className="header__title">{category}</h2>
      <div className="header__menu">
        {auth === 2 ? <Link to="/product/new"><button>상품 등록</button></Link> : null}
        <div className="header__menu__sortbox" onClick={handleClickSortbox}>
          <span>{sortbox.content}</span>
          <div className="header__menu__sortbox__icon">
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
        </div>
        {sortbox.status
        ? <div className="header__menu__sortbox-list">
            <ul onClick={handleClickSortboxList}>
              <li value={0}>베스트순</li>
              <li value={1}>신상품순</li>
              <li value={2}>낮은 가격순</li>
              <li value={3}>높은 가격순</li>
            </ul>
          </div>
        : null}
      </div>
    </>
  );
}

export default Header;