import "../../App.css";
import "./mypage.css";
import axios from "axios";
import { useState, useLayoutEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Cart({ userInfo }) {

  const [data, setData] = useState([]);
  const [price, setPrice] = useState();

  useLayoutEffect( () => {

    axios.get(`${process.env.REACT_APP_URL}/user/mypageCart`, {
      params: {
        userID: userInfo
      }
    }).then( (result) => {
      if (result.data.message === "장바구니 리스트 조회 성공") {
        setData(result.data.data);
      }
    });

  }, [userInfo]);

  useLayoutEffect( () => {

    if (data.length !== 0) {

      const arrPirce = data.map( (el) => {
        return el.sortPrice
      });
      const totalPrice = arrPirce.reduce( (acc, cur) => {
        return acc + cur;
      }, 0);
      const totalPriceKR = totalPrice.toLocaleString("ko-KR");
      
      setPrice(totalPriceKR);
    }

  }, [data]);

  return (
    <>
      <h3>장바구니</h3>
      {data.length !== 0
      ? <>
          <div className="cart__select-all">
            <label>
              <input type="checkbox" />
              <span>전체 선택</span>
            </label>
          </div>
          {data.map( (el, index) => {
            const price = el.sortPrice.toLocaleString("ko-KR")
            return  <div className="cart__good" key={index}>
                      <input type="checkbox" />
                      <img src={`${process.env.REACT_APP_URL}/${el.img}`} alt="img" />
                      <div className="cart__good__info">
                        <div>{el.name}</div>
                        <div>{price}원</div>
                      </div>
                      <button>
                        <FontAwesomeIcon className="icon__size28" icon={faXmark} />
                      </button>
                    </div>
          })}
          <div className="cart__total-price">
            <div>총 주문 금액 <span>{price}원</span></div>
          </div>
          <button className="cart__buy-btn">구매하기</button>
        </>
      : <div className="like__data-none">
          <span>장바구니에 담긴 상품이 없습니다</span>
        </div>}
    </>
  );
};

export default Cart;