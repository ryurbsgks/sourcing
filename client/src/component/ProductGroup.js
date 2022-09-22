import "../App.css";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import Product from "./Product";
import dummyData from "../dummydata/dummydata";

function ProductGroup( { category } ) {

  const [color, setColor] = useState();

  useEffect( () => {

    if(category === "야채") {
      setColor("product-group__title--color-green");
    }else if(category === "청과") {
      setColor("product-group__title--color-red");
    }else if(category === "수산") {
      setColor("product-group__title--color-blue");
    }else {
      setColor("");
    }
    
  }, [category]);

  return (
    <article className="product-group container">
      <div className={`product-group__title ${color}`}>{category}</div>
      <div className="product-group__product-more">
        <Link to="/">전체 상품 보기 &gt;</Link>
      </div>
      <div className="product-group__product-list">
        {dummyData[category].map( (el) => {
          return <Product key={el.id} image={el.image} title={el.title} sale={el.sale} price={el.price} originprice={el.originprice} reviewscore={el.reviewscore} reviewcount={el.reviewcount} />
        })}
      </div>
    </article>
  );
}

export default ProductGroup;