import "../App.css";

function SignupCheck ({ content, close }) {
  return (
    <div className="signup-check-background">
      <div className="signup-check">
        <div className="signup-check__content">사용할 수 있는 {content}입니다</div>
        <button onClick={close} type="button">확인</button>
      </div>
    </div>
  );
}

export default SignupCheck;