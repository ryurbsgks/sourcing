import "../../App.css";
import "./category.css";
import { useState, useLayoutEffect, useEffect } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function Header({ params, auth , sort }) {

  const [category, setCategory] = useState("");
  const [sortbox, setSortbox] = useState({
    status: false,
    content: ""
  });
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const location = useLocation();
  
  useLayoutEffect( () => {

    if (params === "vegetable") {
      return setCategory("야채");
    }

    if (params === "fruit") {
      return setCategory("과일");
    }

    if (params === "seafood") {
      return setCategory("수산물");
    }

    return setCategory(`'${params}'에 대한 검색결과`);

  }, [params]);

  useEffect( () => {

    switch (sort) {
      case "best":
        setSortbox({
          ...sortbox,
          content: "베스트순"
        });
        break;
      case "new":
        setSortbox({
          ...sortbox,
          content: "신상품순"
        });
        break;
      case "lowprice":
        setSortbox({
          ...sortbox,
          content: "낮은 가격순"
        });
        break;
      case "heighprice":
        setSortbox({
          ...sortbox,
          content: "높은 가격순"
        });
        break;
      case null:
        setSortbox({
          ...sortbox,
          content: "신상품순"
        });
        break;
      default:
        navigate("/404-page-not-found");
    }

  }, [sort]);

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

    if (location.pathname === "/search") {

      if (e.target.value === 0) {
        setSortbox({
          status: false,
          content: "베스트순"
        });
        searchParams.set("sort", "best");
        return setSearchParams(searchParams);
      }

      if (e.target.value === 1) {
        setSortbox({
          status: false,
          content: "신상품순"
        });
        searchParams.set("sort", "new");
        return setSearchParams(searchParams);
      }

      if (e.target.value === 2) {
        setSortbox({
          status: false,
          content: "낮은 가격순"
        });
        searchParams.set("sort", "lowprice");
        return setSearchParams(searchParams);
      }

      if (e.target.value === 3) {
        setSortbox({
          status: false,
          content: "높은 가격순"
        });
        searchParams.set("sort", "heighprice");
        return setSearchParams(searchParams);
      }

    }
    
    if (e.target.value === 0) {
      setSortbox({
        status: false,
        content: "베스트순"
      });
      return navigate(`/category/${params}?sort=best`);
    }

    if (e.target.value === 1) {
      setSortbox({
        status: false,
        content: "신상품순"
      });
      return navigate(`/category/${params}?sort=new`);
    }

    if (e.target.value === 2) {
      setSortbox({
        status: false,
        content: "낮은 가격순"
      });
      return navigate(`/category/${params}?sort=lowprice`);
    }

    if (e.target.value === 3) {
      setSortbox({
        status: false,
        content: "높은 가격순"
      });
      return navigate(`/category/${params}?sort=heighprice`);
    }

  };

  return (
    <header>
      <h2 className="header__title">{category}</h2>
      <div className="header__menu">
        {auth === 1 ? null : <Link to="/product/new"><button>상품 등록</button></Link>}
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
    </header>
  );
}

export default Header;