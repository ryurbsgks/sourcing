import "../../App.css";
import "./category.css";
import axios from "axios";
import { useState, useLayoutEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAngleLeft, faAngleRight, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import Goods from "./Goods";
import Loading from "../common/Loading";

function List({ params, sort }) {

  const [data, setData] = useState();
  const GOOD_PER_PAGE = 16;
  const PAGE_PER_DISPLAY = 5;
  const [pagination, setPagination] = useState({
    totalGood: 0,
    totalPage: 0
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [displayPageGroup, setDisplayPageGroup] = useState(Math.ceil(currentPage / PAGE_PER_DISPLAY));
  const [pageGroup, setPageGroup] = useState({
    first: (displayPageGroup - 1) * PAGE_PER_DISPLAY + 1,
    last: displayPageGroup * PAGE_PER_DISPLAY
  });

  useLayoutEffect( () => {

    axios.get(`${process.env.REACT_APP_URL}/product/list`, {
      params: {
        category: params,
        sortTarget: sort.target,
        sortOption: sort.option,
        currentPage: currentPage
      }
    }).then( (res) => {
      if (res.data.message === "상품 리스트 조회 성공") {
        setPagination({
          ...pagination,
          totalGood: res.data.count,
          totalPage: Array.from({length: Math.ceil(res.data.count / GOOD_PER_PAGE)}, (x, i) => i + 1)
        });
        return setData(res.data.data);
      }
    });
    
  }, [params, sort]);

  useLayoutEffect( () => {
    setCurrentPage(1);
  }, [params]);

  useLayoutEffect( () => {

    setDisplayPageGroup(Math.ceil(currentPage / PAGE_PER_DISPLAY));

    axios.get(`${process.env.REACT_APP_URL}/product/list`, {
      params: {
        category: params,
        sortTarget: sort.target,
        sortOption: sort.option,
        currentPage: currentPage
      }
    }).then( (res) => {
      if (res.data.message === "상품 리스트 조회 성공") {
        return setData(res.data.data);
      }
    });

  }, [currentPage]);

  useLayoutEffect( () => {
    setPageGroup({
      first: (displayPageGroup - 1) * PAGE_PER_DISPLAY + 1,
      last: displayPageGroup * PAGE_PER_DISPLAY
    });
  }, [displayPageGroup]);

  const handleClickPageNum = (e) => {
    return setCurrentPage(e.target.value);
  };

  const handleClickIcon = (e) => {

    if (e.currentTarget.value === -1) {
      return setCurrentPage(currentPage - 1);
    }

    if (e.currentTarget.value === 2) {
      return setCurrentPage(currentPage + 1);
    }

    return setCurrentPage(e.currentTarget.value);
  }

  return (
    <>
      <section className="list">
        {data 
        ? data.map( (el) => {
            return <Goods key={el.id} img={el.img} name={el.name} price={el.price} salePrice={el.salePrice} salePct={el.salePct} />
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