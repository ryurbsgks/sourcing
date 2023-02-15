import "../../App.css";
import "./mypage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import defaultImage from "../../images/defaultImage.jpg"

function Like() {

  return (
    <>
      <h3>찜한 상품</h3>
      <div className="like">
        <img src={defaultImage} alt="img" />
        <div className="like__info">
          <div>오이</div>
          <div>1,230원</div>
        </div>
        <div className="like__btn">
          <button>삭제</button>
          <button><FontAwesomeIcon className="icon__size14" icon={faCartShopping} />담기</button>
        </div>
      </div>
    </>
  );
}

export default Like;