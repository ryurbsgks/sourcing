import "../../App.css";
import "./product.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

function Detail({ params }) {

  const [sale, setSale] = useState(false);

  return (
    <>
      <main className="container">
        <section className="detail__info">
          <div className="detail__info__img">
            <img src={`${process.env.PUBLIC_URL}/images/dummydata/바나나.jpg`} alt="img" />
          </div>
          <div className="detail__info__content">
            <div className="detail__info__content__title">바나나</div>
            {sale 
            ? <div className="detail__info__content__price">4,500<span>원</span></div>
            : <>
                <div className="detail__info__content__sale-price">
                  <span className="detail__info__content__sale-price__salePct">10%</span>
                  <div className="detail__info__content__price">4,050<span>원</span></div>
                </div>
                <div className="detail__info__content__origin-price">4,500원</div>
              </> 
            }
            <div className="detail__info__content__box">
              <div className="detail__info__content__box__space-01">판매자</div>
              <div className="detail__info__content__box__space-02">ryurbsgks</div>
            </div>
            <div className="detail__info__content__box">
              <div className="detail__info__content__box__space-01">판매 단위</div>
              <div className="detail__info__content__box__space-02">1송이</div>
            </div>
            <div className="detail__info__content__box">
              <div className="detail__info__content__box__space-01">중량/용량</div>
              <div className="detail__info__content__box__space-02">8손</div>
            </div>
            <div className="detail__info__content__box">
              <div className="detail__info__content__box__space-01">원산지</div>
              <div className="detail__info__content__box__space-02">수입산</div>
            </div>
            <div className="detail__info__content__box">
              <div className="detail__info__content__box__space-01">구매수량</div>
              <div className="detail__info__content__box__count-box">
                <div className="detail__info__content__box__count-box__icon">
                  <FontAwesomeIcon className="icon__size14" icon={faMinus} />
                </div>
                <div className="detail__info__content__box__count-box__count">100</div>
                <div className="detail__info__content__box__count-box__icon">
                  <FontAwesomeIcon className="icon__size14" icon={faPlus} />
                </div>
              </div>
            </div>
            <div className="detail__info__content__total-price">
              <span>총 상품 금액</span>
              <div className="detail__info__content__price">4,500<span>원</span></div>
            </div>
            <div className="detail__info__content__btn-area">
              <button className="detail__info__content__btn-area__icon-btn">
                <FontAwesomeIcon className="icon__size28 icon__color-red" icon={faHeart} />
              </button>
              <button className="detail__info__content__btn-area__icon-btn">
                <FontAwesomeIcon className="icon__size28" icon={faCartShopping} />
              </button>
              <button className="detail__info__content__btn-area__btn">구매하기</button> 
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Detail;