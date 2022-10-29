import "../../App.css";
import "./main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function Product( { image, title, sale, price, originprice, reviewscore, reviewcount } ) {
  
  const priceKR = price.toLocaleString("ko-KR");
  const originpriceKR = originprice.toLocaleString("ko-KR");
  
  return (
    <article className="product">
      <img src={`${process.env.PUBLIC_URL}/images/dummydata/${image}`} alt="img" />
      <div className="product__title">{title}</div>
      <div className="product__pirce-info">
        <span className="product__pirce-info__sale ">{sale}%</span>
        <span className="product__pirce-info__price"><b>{priceKR}</b>원</span>
        <span className="product__pirce-info__origin-price">{originpriceKR}원</span>
      </div>
      <div className="product__review">
        <FontAwesomeIcon className="icon__size14" icon={faHeart} />
        <span>{reviewscore}</span>
        <span>({reviewcount})</span>
      </div>
    </article>
  );
}

export default Product;