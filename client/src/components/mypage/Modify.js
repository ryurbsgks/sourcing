import "../../App.css";
import "./mypage.css";
import { useState } from "react";

function Modify({ userInfo }) {

  const [status, setStatus] = useState({
    email: userInfo.email ? true : false,
    address: userInfo.address ? true : false
  });
  const [openUI, setOpenUI] = useState(false);

  return (
    <>
      <h3>개인 정보 수정</h3>
      <div className="modify__container">
        <div className="modify__container__space-01">닉네임</div>
        <div className="modify__container__space-02">
          <input defaultValue={userInfo.nickname} />
        </div>
        <div className="modify__container__space-03">
          <button>중복확인</button>
        </div>
      </div>
      <div className="modify__container">
        <div className="modify__container__space-01">현재 비밀번호</div>
        <div className="modify__container__space-02">
          <input type="password" placeholder="비밀번호를 입력해주세요" />
        </div>
        <div className="modify__container__space-03"></div>
      </div>
      <div className="modify__container">
        <div className="modify__container__space-01">새 비밀번호</div>
        <div className="modify__container__space-02">
          <input type="password" placeholder="새 비밀번호를 입력해주세요" />
        </div>
        <div className="modify__container__space-03"></div>
      </div>
      <div className="modify__container">
        <div className="modify__container__space-01">새 비밀번호 확인</div>
        <div className="modify__container__space-02">
          <input type="password" placeholder="새 비밀번호를 다시 입력해주세요" />
        </div>
        <div className="modify__container__space-03"></div>
      </div>
      <div className="modify__container">
        <div className="modify__container__space-01">이메일</div>
        {status.email 
        ? <>
            <div className="modify__container__space-02">
              {userInfo.email}
            </div>
            <div className="modify__container__space-03">
              <button>이메일 변경</button>
            </div>
          </> 
        : <>
            <div className="modify__container__space-02">
              <input placeholder="ex)sourcing@sourcing.com" />
            </div>
            <div className="modify__container__space-03">
              <button>인증번호 받기</button>
            </div>
          </>}
      </div>
      {openUI 
      ? <div className="modify__container">
          <div className="modify__container__space-01"></div>
          <div className="modify__container__space-02">
            <input placeholder="인증번호를 입력해주세요" />
          </div>
          <div className="modify__container__space-03">
            <button>인증번호 확인</button>
          </div>
        </div>
      : null}
      <div className="modify__container">
        <div className="modify__container__space-01">주소</div>
        {status.address 
        ? <>
            <div className="modify__container__space-address">{userInfo.address}</div>
            <div className="modify__container__space-03">
              <button>주소지 변경</button>
            </div>
          </>
        : <>
            <div className="modify__container__space-02">
              <button>주소 검색</button>
            </div>
            <div className="modify__container__space-03"></div>
          </>}
      </div>
      <div className="modify__area-btn">
        <button>회원 탈퇴</button>
        <button>정보 수정</button>
      </div>
    </>
  );
};

export default Modify;