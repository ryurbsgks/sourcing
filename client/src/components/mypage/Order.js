import "../../App.css";
import "./mypage.css";
import axios from "axios";
import { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import Check from "../modal/Check";

function Order({ userInfo }) {

  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [targetID, setTargetID] = useState();

  const navigate = useNavigate();

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

  const handleNavigate = (id) => {
    navigate(`/goods/${id}`);
  };

  const handleClickCancel = (e) => {
    setTargetID(e.target.id);
    setModal(true);
  };

  const handleCheckHandler = () => {

    axios.patch(`${process.env.REACT_APP_URL}/user/orderhistory`, {
      merchant_uid: targetID,
      status: 4
    }).then( (result) => {
      if (result.data.message === "구매 취소 성공") {
        setTargetID(null);
        setModal(false);
        navigate(0);
      }
    });
    
  };

  return (
    <>
      <h3>주문 내역</h3>
      {data.length !== 0 
      ? <>
          {data.map( (el, index) => {
            return  <div className="order" key={index}>
                      <div className="order__number">주문번호 : {el.merchant_uid}</div>
                      {el.status === 4 
                      ? <div className="order__status--red">구매 취소</div>
                      : <div className="order__status--blue">
                          {el.status === 1 ? "상품 준비 중" : el.status === 2 ? "배송 중" : "배송 완료"}
                        </div>}
                      {el.status === 1 ? <button id={el.merchant_uid} onClick={handleClickCancel}>구매 취소</button> : null}
                      {el.productData.map( (el, index) => {
                        const price = (el.price * el.count).toLocaleString("ko-KR")
                        return  <div className="order__good" key={index} onClick={() => handleNavigate(el.id)}>
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
          {modal ? <Check content={"구매 상품을 취소하시겠습니까?"} handler={handleCheckHandler} /> : null}
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