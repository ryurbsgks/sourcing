import "../../App.css";
import "./checkout.css";
import { useState, useEffect, useLayoutEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDaumPostcodePopup } from "react-daum-postcode";
import Check from "../modal/Check";
import logo from "../../images/logo.PNG";

function Info() {

  const [userInfo, setUserInfo] = useState({
    userID: "",
    email: "",
    tel: "",
    address: ""
  });
  const [inputValue, setInputValue] = useState({
    email: "",
    address: ""
  });
  const [inputStatus, setInputStatus] = useState(false);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState();

  const location = useLocation();
  const navigate = useNavigate();
  const scriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(scriptUrl);

  useLayoutEffect( () => {

    if (location.state) {
      setUserInfo({
        userID: location.state.userInfo.userID,
        email: location.state.userInfo.email,
        tel: location.state.userInfo.tel,
        address: location.state.userInfo.address
      });
    }

  }, []);

  useEffect( () => {

    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.8.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);

    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };

  }, []);

  const handleInputValue = (e) => {

    const { name, value } = e.target;

    setInputValue({
      ...inputValue,
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

    setUserInfo({
      ...userInfo,
      address: fullAddress
    });
    setInputStatus(true);

  };

  const handleClickAddress = () => {
    open({ onComplete: handleComplete });
  };

  const callback = (rsp) => {

    if (rsp.success) {
      setModal(true);
    } else {
      setModal(false);
    }

  };
  
  const handleClickPayment = () => {

    if (!userInfo.email) {
      if (!inputValue.email) {
        return setMessage("이메일을 입력해주세요");
      }
    }

    if (!userInfo.address) {
      return setMessage("배송지를 입력해주세요");
    }
    
    if (inputStatus) {
      if (!inputValue.address) {
        return setMessage("상세 주소를 입력해주세요");
      }
    }

    if (message) {
      setMessage();
    }

    let price = location.state.dataInfo.pice.replaceAll(",", "");
    const data = {
      pg: "html5_inicis",
      pay_method: "card",
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: Number(price),
      name: "오늘의 장",
      buyer_name: userInfo.userID,
      buyer_tel: userInfo.tel,
      buyer_addr: inputStatus ? `${userInfo.address}-${inputValue.address}` : userInfo.address,
      buyer_email: userInfo.email || inputValue.email
    };
    const { IMP } = window;

    IMP.init(`${process.env.REACT_APP_IAMPORT}`);
    IMP.request_pay(data, callback);

  };

  const handleNavigate = () => {
    navigate("/mypage/orderlist");
  };

  return (
    <>
      <header className="info__header">
        <div className="container">
          <div className="info__header__logo">
            <Link to="/"><img src={logo} alt="logo" /></Link>
          </div>
        </div>
      </header>
      <main className="container">
        <section className="info__main__header">
          <h2 className="info__main__header__title">주문 확인/결제</h2>
        </section>
        <section className="info__main__customer-info">
          <h3 className="info__main__info__title">구매자 정보</h3>
          <table className="info__main__table">
            <tbody>
              <tr>
                <td>아이디</td>
                <td>{userInfo.userID}</td>
              </tr>
              <tr>
                <td>이메일</td>
                {userInfo.email 
                ? <td>{userInfo.email}</td> 
                : <td><input className="info__main__table__input--email" name="email" onChange={handleInputValue} placeholder="ex)sourcing@sourcing.com" /></td>}
              </tr>
              <tr>
                <td>핸드폰 번호</td>
                <td>{userInfo.tel}</td>
              </tr>
              <tr>
                <td>배송지</td>
                {userInfo.address 
                ? <td>{userInfo.address} {inputStatus ? <input className="info__main__table__input--address" name="address" onChange={handleInputValue} placeholder="상세 주소를 입력해주세요" /> : null} <button onClick={handleClickAddress} type="button">배송지 변경</button></td>
                : <td className="info__main__table__warning">배송지를 입력해주세요 <button onClick={handleClickAddress} type="button">배송지 변경</button></td>}
              </tr>
            </tbody>
          </table>
        </section>
        <section className="info__main__goods-info">
          <h3 className="info__main__info__title">상품 정보</h3>
          <table className="info__main__table">
            <thead>
              <tr>
                <th colSpan={2}>{location.state.dataInfo.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{location.state.dataInfo.count}개</td>
                <td>{location.state.dataInfo.pice}원</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="info__main__payment-info">
          <h3 className="info__main__info__title">결제 정보</h3>
          <table className="info__main__table">
            <tbody>
              <tr>
                <td>총 결제 금액</td>
                <td><b>{location.state.dataInfo.pice}</b>원</td>
              </tr>
            </tbody>
          </table>
          <button className="info__main__payment-info__btn" onClick={handleClickPayment}>결제하기</button>
          {modal ? <Check content={"상품 구매가 완료되었습니다"} handler={handleNavigate} /> : null}
          {message ? <div className="info__main__payment-info__err-msg">{message}</div> : null}
        </section>
      </main>
    </>
  );
};

export default Info;