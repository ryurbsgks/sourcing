import "../../App.css";
import "./mypage.css";
import axios from "axios";
import { useState, useLayoutEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";

function Order({ userInfo }) {

  const [data, setData] = useState([]);

  useLayoutEffect( () => {

    axios.get(`${process.env.REACT_APP_URL}/user/orderhistory`, {
      params: {
        userID: userInfo
      }
    }).then( (result) => {
      if (result.data.message === "주문 내역 리스트 조회 성공") {
        setData(result.data.data);
      }
    });

  }, [userInfo]);

  return (
    <>
      <h3>주문 내역</h3>
      {data.length !== 0 
      ? <>
          {data.map( (el, index) => {
            return  <div className="order" key={index}>
                      <div className="order__number">주문번호 : {el.merchant_uid}</div>
                      <div className="order__status">{el.status === 1 ? "상품 준비중" : el.status === 2 ? "배송중" : el.status === 3 ? "배송 완료" : "구매 취소"}</div>
                      <button id={el.imp_uid}>구매 취소</button>
                      {el.productData.map( (el, index) => {
                        const price = (el.price * el.count).toLocaleString("ko-KR")
                        return  <div className="order__good" key={index}>
                                  <img src={`${process.env.REACT_APP_URL}/${el.img}`} alt="img" />
                                  <div className="order__good__info">
                                    <div>{el.name}</div>
                                    <div>{el.count}개</div>
                                    <div>{price}원</div>
                                  </div>
                                </div>
                      })}
                    </div>
          })}
        </>
      : <div className="like__data-none">
          <div>
            <FontAwesomeIcon className="icon__size100 icon__color-gray" icon={faFileLines} />
          </div>
          <span>주문 내역이 없습니다</span>
        </div>}
    </>
  );
};

export default Order;