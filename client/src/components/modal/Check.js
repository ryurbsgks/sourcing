import "../../App.css";
import "./modal.css";

function Check ({ content, handler }) {
  return (
    <div className="check-background">
      <div className="check">
        <div className="check__content">{content}</div>
        <button onClick={handler} type="button">확인</button>
      </div>
    </div>
  );
}

export default Check;