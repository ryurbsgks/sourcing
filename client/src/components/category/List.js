import "../../App.css";
import "./category.css";
import axios from "axios";
import { useState, useLayoutEffect, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAngleLeft, faAngleRight, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import Goods from "./Goods";
import Loading from "../common/Loading";

function List({ params, sort, page }) {

  const [data, setData] = useState();
  const GOOD_PER_PAGE = 16;
  const PAGE_PER_DISPLAY = 5;
  const [pagination, setPagination] = useState({
    totalGood: 0,
    totalPage: 0
  });
  const [currentPage, setCurrentPage] = useState();
  const [displayPageGroup, setDisplayPageGroup] = useState(Math.ceil(currentPage / PAGE_PER_DISPLAY));
  const [pageGroup, setPageGroup] = useState({
    first: (displayPageGroup - 1) * PAGE_PER_DISPLAY + 1,
    last: displayPageGroup * PAGE_PER_DISPLAY
  });

  const navigate = useNavigate();

  useEffect( () => {

    if (isNaN(page) || page === "" || page === "0") {
      return navigate("/404-page-not-found");
    }

    if (page === null) {
      return setCurrentPage(1);
    }

    setCurrentPage(Number(page))

  }, [page]);

  useEffect( () => {

    if (!isNaN(currentPage)) {

      setDisplayPageGroup(Math.ceil(currentPage / PAGE_PER_DISPLAY));

      if (sort === "best" || sort === "new" || sort === "lowprice" || sort === "heighprice" || sort === null) {

        axios.get(`${process.env.REACT_APP_URL}/product/list`, {
          params: {
            category: params,
            sort: sort,
            currentPage: currentPage
          }
        }).then( (res) => {
          if (res.data.message === "상품 리스트 조회 성공") {
            setPagination({
              totalGood: res.data.count,
              totalPage: Array.from({length: Math.ceil(res.data.count / GOOD_PER_PAGE)}, (x, i) => i + 1)
            });
            return setData(res.data.data);
          }
        });

      }
    }

  }, [currentPage, params, sort]);

  useLayoutEffect( () => {
    setPageGroup({
      first: (displayPageGroup - 1) * PAGE_PER_DISPLAY + 1,
      last: displayPageGroup * PAGE_PER_DISPLAY
    });
  }, [displayPageGroup]);

  const handleClickPageNum = (e) => {
    setCurrentPage(e.target.value);
    sort ? navigate(`/category/${params}?sort=${sort}&page=${e.target.value}`) : navigate(`/category/${params}?page=${e.target.value}`);
  };

  const handleClickIcon = (e) => {

    if (e.currentTarget.value === -1) {
      setCurrentPage(currentPage - 1);
      return sort ? navigate(`/category/${params}?sort=${sort}&page=${currentPage - 1}`) : navigate(`/category/${params}?page=${currentPage - 1}`);
    }

    if (e.currentTarget.value === 2) {
      setCurrentPage(currentPage + 1);
      return sort ? navigate(`/category/${params}?sort=${sort}&page=${currentPage + 1}`) : navigate(`/category/${params}?page=${currentPage + 1}`);
    }

    setCurrentPage(e.currentTarget.value);
    return sort ? navigate(`/category/${params}?sort=${sort}&page=${e.currentTarget.value}`) : navigate(`/category/${params}?page=${e.currentTarget.value}`);
  }

  return (
    <>
      <section className="list">
        {data 
        ? data.map( (el) => {
            return <Goods key={el.id} id={el.id} img={el.img} name={el.name} price={el.price} salePrice={el.salePrice} salePct={el.salePct} />
          })
        : <Loading />}
      </section>
      {pagination.totalGood > GOOD_PER_PAGE 
      ? <section className="list-page">
          {currentPage !== 1 
          ? <ul>
              <li className="list-page__icon" onClick={handleClickIcon} value={1}><FontAwesomeIcon icon={faAnglesLeft} /></li>
              <li className="list-page__icon" onClick={handleClickIcon} value={-1}><FontAwesomeIcon icon={faAngleLeft} /></li>
            </ul>
          : null}
          <ul onClick={handleClickPageNum}>
            {pagination.totalPage.map( (el) => {
              if (pageGroup.first <= el && el <= pageGroup.last) {
                if (currentPage === el) {
                  return <li key={el} className="list-page__num--active" value={el}>{el}</li>
                }
                return <li key={el} className="list-page__num" value={el}>{el}</li>
              }
            })}
          </ul>
          {currentPage < pagination.totalPage.length 
          ? <ul>
              <li className="list-page__icon" onClick={handleClickIcon} value={2}><FontAwesomeIcon icon={faAngleRight} /></li>
              <li className="list-page__icon" onClick={handleClickIcon} value={pagination.totalPage.length}><FontAwesomeIcon icon={faAnglesRight} /></li>
            </ul>
          : null}
        </section>
      : null}  
    </>
  );
}

export default List;