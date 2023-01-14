import "../../App.css";
import "./main.css";
import "../category/category.css";
import axios from "axios";
import { useState, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Goods from "../category/Goods";
import Loading from "../common/Loading";

function GoodsGroup({ category }) {

  const [title, setTitle] = useState();
  const [url, setUrl] = useState();
  const [data, setData] = useState();

  useEffect( () => {
    axios.get(`${process.env.REACT_APP_URL}/product/recommend`, {
      params: {
        category: category
      }
    }).then( (res) => {
      if (res.data.message === "추천 상품 리스트 조회 성공") {
        return setData(res.data.data);
      }
    }).catch( (err) => {
      if (err.response.data.message === "추천 상품 리스트가 존재하지 않습니다") {
        setData(null);
      }
    });

  }, []);

  useLayoutEffect( () => {

    if (category === "야채") {
      setUrl("vegetable");
      return setTitle("goods-group__title--color-green");
    }

    if (category === "과일") {
      setUrl("fruit");
      return setTitle("goods-group__title--color-red");
    }

    if (category === "수산물") {
      setUrl("seafood");
      return setTitle("goods-group__title--color-blue");
    }

  }, []);

  return (
    <article className="goods-group">
      <div className="container">
        <div className={`${title}`}>{category}</div>
        <div className="goods-group__goods-more">
          <Link to={`/category/${url}`}>전체 상품 보기 <FontAwesomeIcon icon={faAngleRight} /></Link>
        </div>
        <article className="list">
          {data 
          ? data.map( (el) => {
            return <Goods key={el.id} id={el.id} img={el.img} name={el.name} price={el.price} salePrice={el.salePrice} salePct={el.salePct} likeCount={el.likeCount} />
          })
          : <Loading />}
        </article>
      </div>
    </article>
  );
}

export default GoodsGroup;