import "../../App.css";
import "./modal.css";

function CheckTwoBtn ({ content, leftHandler, rightHandler, leftBtn, rightBtn }) {
  return (
    <div className="check-background">
      <div className="check">
        <div className="check__content">{content}</div>
        <div className="check__area-btn">
          <button className="test" onClick={leftHandler} type="button">{leftBtn}</button>
          <button className="test" onClick={rightHandler} type="button">{rightBtn}</button>
        </div>
      </div>
    </div>
  )
};

export default CheckTwoBtn;