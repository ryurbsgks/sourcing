import "../../App.css";
import "./mypage.css";
import axios from "axios";
import { useState, useLayoutEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Cart({ userInfo }) {

  const [data, setData] = useState([]);
  const [price, setPrice] = useState();
  const [checkbox, setCheckbox] = useState([]);

  useLayoutEffect( () => {

    axios.get(`${process.env.REACT_APP_URL}/user/mypageCart`, {
      params: {
        userID: userInfo
      }
    }).then( (result) => {
      if (result.data.message === "장바구니 리스트 조회 성공") {
        
        const arr = [];

        result.data.data.map( (el) => {
          const obj = {
            id: el.id,
            sortPrice: el.sortPrice,
            count: el.count
          };
          arr.push(obj);
        });
        setCheckbox(arr);
        setData(result.data.data);
      }
    });

  }, [userInfo]);

  useLayoutEffect( () => {

    if (checkbox.length === 0) {
      return setPrice(0);
    }

    const arrPirce = checkbox.map( (el) => el.sortPrice * el.count);
    const totalPrice = arrPirce.reduce( (acc, cur) => acc + cur, 0);
    const totalPriceKR = totalPrice.toLocaleString("ko-KR");

    setPrice(totalPriceKR);

  }, [checkbox]);

  const handleCheckAll = (e) => {

    if (e.target.checked) {

      const arr = [];

      data.map( (el) => {
        const obj = {
          id: el.id,
          sortPrice: el.sortPrice,
          count: el.count
        };
        arr.push(obj);
      });
      return setCheckbox(arr);
    }

    return setCheckbox([]);
  };

  const handleCheckSingle = (e, id) => {

    if (e.target.checked) {

      const checkData = data.find( (el) => el.id === id);
      const obj = {
        id: checkData.id,
        sortPrice: checkData.sortPrice,
        count: checkData.count
      };

      return setCheckbox( (el) => [...el, obj]);
    }

    return setCheckbox(checkbox.filter( (el) => el.id !== id));
  };

  const handleDeleteCart = (id) => {

    axios.delete(`${process.env.REACT_APP_URL}/product/cart`, {
      data: {
        userID: userInfo,
        productID: id
      }
    }).then( (result) => {
      if (result.status === 204) {
        setData(data.filter( (el) => el.id !== id));
        setCheckbox(checkbox.filter( (el) => el.id !== id));
      }
    });

  };

  return (
    <>
      <h3>장바구니</h3>
      {data.length !== 0
      ? <>
          <div className="cart__select-all">
            <label>
              <input type="checkbox" onChange={handleCheckAll} checked={checkbox.length === data.length ? true : false} />
              <span>전체 선택</span>
            </label>
          </div>
          {data.map( (el, index) => {
            const price = (el.sortPrice * el.count).toLocaleString("ko-KR")
            return  <div className="cart__good" key={index}>
                      <input type="checkbox" onChange={(e) =>handleCheckSingle(e, el.id)} checked={checkbox.find(element => element.id === el.id) ? true : false} />
                      <img src={`${process.env.REACT_APP_URL}/${el.img}`} alt="img" />
                      <div className="cart__good__info">
                        <div>{el.name}</div>
                        <div>{el.count}{el.saleUnit}</div>
                        <div>{price}원</div>
                      </div>
                      <button onClick={() => handleDeleteCart(el.id)}>
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