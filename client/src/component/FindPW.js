import "../App.css";

function FindPW() {
  return (
    <section className="find">
      <div className="find__title">비밀번호 찾기</div>
      <button className="find__auth-btn--select">핸드폰 인증</button>
      <button className="find__auth-btn">이메일 인증</button>
      <input placeholder="아이디를 입력해주세요" />
      <input placeholder="핸드폰 번호를 입력해주세요" />
      <button className="find__find-btn">비밀번호 찾기</button>
    </section>
  );
};

export default FindPW;