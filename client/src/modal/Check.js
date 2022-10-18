import "../App.css";

function Check ({ content, handler }) {
  return (
    <div className="signup-check-background">
      <div className="signup-check">
        <div className="signup-check__content">{content}</div>
        <button onClick={handler} type="button">확인</button>
      </div>
    </div>
  );
}

export default Check;