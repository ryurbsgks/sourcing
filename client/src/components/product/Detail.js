import "../../App.css";
import "./product.css";
import axios from "axios";
import { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faCartShopping, faHeart as faHearts } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import Check from "../modal/Check";

function Detail({ data, userID }) {

  const [count, setCount] = useState(1);
  const [price, setPrice] = useState({
    price: data.price.toLocaleString("ko-KR"),
    salePrice: data.salePrice.toLocaleString("ko-KR"),
    totalPrice: ""
  });
  const [modal, setModal] = useState({
    like: false
  });
  const [likeStatus, setLikeStatus] = useState(false);

  const isLogin = useSelector( (state) => state.isLogIn );
  const navigate = useNavigate();

  useLayoutEffect( () => {

    if (userID) {
      axios.get(`${process.env.REACT_APP_URL}/product/like`, {
        params: {
          userID: userID,
          productID: data.id
        }
      }).then( (res) => {
        if (res.data.message === "찜 상태입니다") {
          return setLikeStatus(true);
        }
  
        return setLikeStatus(false);
      });
    }

  }, []);

  useLayoutEffect( () => {

    if (data.salePrice) {
      return setPrice({
        ...price,
        totalPrice: (data.salePrice * count).toLocaleString("ko-KR")
      });
    }

    setPrice({
      ...price,
      totalPrice: (data.price * count).toLocaleString("ko-KR")
    });

  }, [count]);

  const handleClickCount = (id) => {

    if (id === "increase") {
      return setCount(count + 1);
    }

    if (id === "decrease") {
      if (count > 1) {
        return setCount(count - 1);
      }
    }

  };

  const handleNavigate = () => {
    navigate("/member/login");
  };

  const handleClickLike = () => {

    if (isLogin) {
      if (likeStatus) {

        axios.delete(`${process.env.REACT_APP_URL}/product/like`, {
          data: {
            userID: userID,
            productID: data.id
          }
        });

        return setLikeStatus(false);
      }

      axios.post(`${process.env.REACT_APP_URL}/product/like`, {
        userID: userID,
        productID: data.id
      });
      
      return setLikeStatus(true);
    }

    setModal({
      ...modal,
      like: true
    });
  };

  return (
    <>
      <main className="container">
        <section className="detail__info">
          <div className="detail__info__img">
            <img src={`${process.env.REACT_APP_URL}/${data.img}`} alt="img" />
          </div>
          <div className="detail__info__content">
            <div className="detail__info__content__title">{data.name}</div>
            {data.salePrice 
            ? <>
                <div className="detail__info__content__sale-price">
                  <span className="detail__info__content__sale-price__salePct">{data.salePct}%</span>
                  <div className="detail__info__content__price">{price.salePrice}<span>원</span></div>
                </div>
                <div className="detail__info__content__origin-price">{price.price}원</div>
              </>
            : <div className="detail__info__content__price">{price.price}<span>원</span></div>}
            <div className="detail__info__content__box">
              <div className="detail__info__content__box__space-01">판매자</div>
              <div className="detail__info__content__box__space-02">{data.nickname}</div>
            </div>
            <div className="detail__info__content__box">
              <div className="detail__info__content__box__space-01">판매 단위</div>
              <div className="detail__info__content__box__space-02">{data.unit}</div>
            </div>
            <div className="detail__info__content__box">
              <div className="detail__info__content__box__space-01">중량/용량</div>
              <div className="detail__info__content__box__space-02">{data.weight}</div>
            </div>
            <div className="detail__info__content__box">
              <div className="detail__info__content__box__space-01">원산지</div>
              <div className="detail__info__content__box__space-02">{data.origin}</div>
            </div>
            <div className="detail__info__content__box">
              <div className="detail__info__content__box__space-01">구매수량</div>
              <div className="detail__info__content__box__count-box">
                <div className="detail__info__content__box__count-box__icon" onClick={() => handleClickCount("decrease")}>
                  <FontAwesomeIcon className="icon__size14" icon={faMinus} />
                </div>
                <div className="detail__info__content__box__count-box__count">{count}</div>
                <div className="detail__info__content__box__count-box__icon" onClick={() => handleClickCount("increase")}>
                  <FontAwesomeIcon className="icon__size14" icon={faPlus} />
                </div>
              </div>
            </div>
            <div className="detail__info__content__total-price">
              <span>총 상품 금액</span>
              <div className="detail__info__content__price">{price.totalPrice}<span>원</span></div>
            </div>
            <div className="detail__info__content__btn-area">
              <button className="detail__info__content__btn-area__icon-btn" onClick={handleClickLike}>
                {likeStatus ? <FontAwesomeIcon className="icon__size28 icon__color-red" icon={faHearts} /> : <FontAwesomeIcon className="icon__size28 icon__color-red" icon={faHeart} />}
              </button>
              {modal.like ? <Check content={"로그인 후 이용할 수 있습니다"} handler={handleNavigate} /> : null}
              <button className="detail__info__content__btn-area__icon-btn">
                <FontAwesomeIcon className="icon__size28" icon={faCartShopping} />
              </button>
              <button className="detail__info__content__btn-area__btn">구매하기</button> 
            </div>
          </div>
        </section>
        <section className="detail__viewer">
          <nav>
            <ul>
              <li>상품설명</li>
              <li>후기</li>
            </ul>
          </nav>
          <section>
            <Viewer initialValue={data.content || "상품 설명이 없습니다"} />
          </section>
        </section>
      </main>
    </>
  );
}

export default Detail;