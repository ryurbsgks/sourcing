import "../../App.css";
import "./common.css"
import loading from "../../images/loading.gif"

function Loading() {
  return (
    <div className="loading">
      <img src={loading} alt="img" />
    </div>
  );
}

export default Loading;