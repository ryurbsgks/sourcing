import "../../App.css";
import "./mypage.css";
import defaultImage from "../../images/defaultImage.jpg"

function Order() {
  return (
    <>
      <h3>주문 내역</h3>
      <div className="order">
        <div className="order__number">주문번호 : xxxxxxxxxxx</div>
        <div className="order__status">상품 준비중</div>
        <button>구매 취소</button>
        <div className="order__good">
          <img src={defaultImage} alt="img" />
          <div className="order__good__info">
            <div>바나나</div>
            <div>10개</div>
            <div>35,000원</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;