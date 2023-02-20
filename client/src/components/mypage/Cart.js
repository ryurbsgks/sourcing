import "../../App.css";
import "./mypage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import defaultImage from "../../images/defaultImage.jpg"

function Cart() {
  return (
    <>
      <h3>장바구니</h3>
      <div className="cart__select-all">
        <label>
          <input type="checkbox" />
          <span>전체 선택</span>
        </label>
      </div>
      <div className="cart__good">
        <input type="checkbox" />
        <img src={defaultImage} alt="img" />
        <div className="cart__good__info">
          <div>상품명</div>
          <div>3,500원</div>
        </div>
        <button>
          <FontAwesomeIcon className="icon__size28" icon={faXmark} />
        </button>
      </div>
      <div className="cart__total-price">
        <div>총 주문 금액 <span>3,500원</span></div>
      </div>
      <button className="cart__buy-btn">구매하기</button>
    </>
  );
};

export default Cart;