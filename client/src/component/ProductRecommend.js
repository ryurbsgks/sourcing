import "../App.css";
import ProductGroup from "./ProductGroup";
import { dummydata } from "../dummydata/dummydata";

function ProductRecommend() {
  return (
    <section className="product-recommend">
      <div className="container">
        <div className="product-recommend__subtitle">오늘의 장</div>
        <div className="product-recommend__title">카테고리별 <span>추천</span> 상품</div>
        {Object.keys(dummydata).map( (el, index) => {
          return <ProductGroup key={index} category={el} />
        })}
      </div>
    </section>
  );
}

export default ProductRecommend;