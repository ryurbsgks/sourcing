import "../../App.css";
import "./category.css";
import { useState, useLayoutEffect } from "react";

function Goods({ img, name, price, salePrice, salePct }) {

  const [KRW, setKRW] = useState({
    price: price.toLocaleString("ko-KR"),
    salePrice
  });

  useLayoutEffect( () => {

    if (salePrice) {
      setKRW({
        ...KRW,
        salePrice: salePrice.toLocaleString("ko-KR")
      });
    }

  }, []);

  return (
    <article className="goods">
      <img src={`${process.env.REACT_APP_URL}/${img}`} alt="img" />
      <div className="goods__title">{name}</div>
      {salePrice 
      ? <div className="goods__price-info">
          <span className="goods__price-info__salePct">{salePct}%</span>
          <span className="goods__price-info__price"><b>{KRW.salePrice}</b>원</span>
          <span className="goods__price-info__origin-price">{KRW.price}원</span>
        </div>
      : <div className="goods__price-info">
          <span className="goods__price-info__price"><b>{KRW.price}</b>원</span>
        </div>}
    </article>
  );
}

export default Goods;