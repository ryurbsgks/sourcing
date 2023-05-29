import "../../App.css";
import "./reservation.css";
import { useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function ReservationForm() {

  const [status, setStatus] = useState({
    seller: false,
    address: false
  });
  const [seller, setSeller] = useState("판매자를 선택해주세요");
  const [reservationFormInfo, setReservationFormInfo] = useState({
    content: "",
    address: "",
    addressDetail: "",
    name: "",
    tel: ""
  });

  const arr = ["테스트 판매자", "엉클마린", "삼해수산", "민지청과", "시원청과"];
  const scriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(scriptUrl);

  const handleClickStatus = () => {

    if (status.seller) {
      return setStatus({
        ...status,
        seller: false
      });
    }
    
    if (!status.seller) {
      return setStatus({
        ...status,
        seller: true
      });
    }
  
  };

  const handleClickSeller = (e) => {
    setSeller(arr[e.target.value]);
  };

  const handleInputValue = (e) => {

    const { name, value } = e.target;

    setReservationFormInfo({
      ...reservationFormInfo,
      [name]: value
    });
  };

  const handleComplete = (data) => {

    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }

      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }

      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setReservationFormInfo({
      ...reservationFormInfo,
      address: fullAddress
    });
    setStatus({
      ...status,
      address: true
    });
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <section className="reservationForm">
      <div className="reservationForm__title">상품 예약</div>
      <div className="reservationForm__require"><span>*</span> 필수입력사항</div>
      <div className="reservationForm__container">
        <div className="reservationForm__container__space-01">판매자<span>*</span></div>
        <div className="reservationForm__container__seller" onClick={handleClickStatus}>
          <span>{seller}</span>
          <div>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
          {status.seller 
          ? <div className="reservationForm__container__seller-list">
              <ul onClick={handleClickSeller}>
                {arr.map( (el, index) => <li key={index} value={index}>{el}</li>)}
              </ul>
            </div>
          : null}
        </div>
      </div>
      <div className="reservationForm__container">
        <div className="reservationForm__container__space-01">상세 내용<span>*</span></div>
      </div>
      <div className="reservationForm__detail">
        <div>판매자가 판매하는 상품 중 원하는 상품을 말씀해주세요. (예_감자 1박스, 바나나 1박스, 방어 5키로대 1마리)</div>
        <textarea className="reservationForm__textarea" name="content" onChange={handleInputValue} placeholder="내용을 입력해주세요"></textarea>
      </div>
      <div className="reservationForm__container">
        <div className="reservationForm__container__space-01">배송받을 주소<span>*</span></div>
        <div className="reservationForm__container__space-02">
          {reservationFormInfo.address 
          ? <input readOnly={true} value={reservationFormInfo.address} />
          : <button onClick={handleClick} type="button"><FontAwesomeIcon icon={faMagnifyingGlass} />주소 검색</button>}
        </div>
      </div>
      {status.address 
      ? <div className="reservationForm__container">
          <div className="reservationForm__container__space-01"></div>
          <div className="reservationForm__container__space-02">
            <input name="addressDetail" onChange={handleInputValue} placeholder="상세 주소를 입력해주세요" />
          </div>
        </div>
      : null}
      <div className="reservationForm__container">
        <div className="reservationForm__container__space-01">수령인 성함<span>*</span></div>
        <div className="reservationForm__container__space-02">
          <input name="name" onChange={handleInputValue} placeholder="수령인 성함을 입력해주세요" />
        </div>
      </div>
      <div className="reservationForm__container">
        <div className="reservationForm__container__space-01">수령인 연락처<span>*</span></div>
        <div className="reservationForm__container__space-02">
          <input name="tel" onChange={handleInputValue} placeholder="수령인 연락처를 입력해주세요" />
        </div>
      </div>
      <div className="reservationForm__btn">
        <button type="button">예약하기</button>
      </div>
    </section>
  );
}

export default ReservationForm;