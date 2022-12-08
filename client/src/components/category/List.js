import "../../App.css";
import "./category.css";
import axios from "axios";
import { useState, useLayoutEffect } from "react";
import Goods from "./Goods";
import Loading from "../common/Loading";

function List({ params, sort }) {

  const [data, setData] = useState();

  useLayoutEffect( () => {

    axios.get(`${process.env.REACT_APP_URL}/product/list`, {
      params: {
        category: params,
        sortTarget: sort.target,
        sortOption: sort.option
      }
    }).then( (res) => {
      if (res.data.message === "상품 리스트 조회 성공") {
        return setData(res.data.data);
      }
    });

  }, [params, sort]);

  return (
    <>
      <section className="list">
        {data 
        ? data.map( (el) => {
            return <Goods key={el.id} img={el.img} name={el.name} price={el.price} salePrice={el.salePrice} salePct={el.salePct} />
          })
        : <Loading />}
      </section>
    </>
  );
}

export default List;