import "../../App.css";
import "./main.css";
import GoodsGroup from "./GoodsGroup";

function GoodsRecommend() {

  const categoryArr = ["야채", "과일", "수산물"];

  return (
    <section className="goods-recommend">
      <div className="container">
        <div className="goods-recommend__subtitle">오늘의 장</div>
        <div className="goods-recommend__title">카테고리별 <span>추천</span> 상품</div>
        {categoryArr.map( (el, index) => {
          return <GoodsGroup key={index} category={el} />
        })}
      </div>
    </section>
  );
}

export default GoodsRecommend;