import "../../App.css";
import "./common.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faExclamation } from "@fortawesome/free-solid-svg-icons"

function NotFound() {
  return (
    <main>
      <div className="notfound__icon">
        <FontAwesomeIcon className="icon__size150" icon={faCircle} />
        <FontAwesomeIcon className="icon__size100 notfound__icon__exclamation" icon={faExclamation} />
      </div>
      <h2 className="notfound__title">찾으시는 페이지가 없습니다</h2>
      <p className="notfound__content">잘못된 접근이거나 요청하신 페이지를 찾을 수 없습니다<br />다시 한번 확인해주세요</p>
      <Link to ="/"><button className="notfound__btn">홈으로</button></Link>
    </main>
  );
}

export default NotFound;