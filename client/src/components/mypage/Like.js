import "../../App.css";
import "./mypage.css";
import axios from "axios";
import { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

function Like({ userInfo }) {

  const [data, setData] = useState();

  const navigate = useNavigate();

  useLayoutEffect( () => {

    axios.get(`${process.env.REACT_APP_URL}/user/mypageLike`, {
      params: {
        userID: userInfo
      }
    }).then( (result) => {
      if (result.data.message === "찜 상품 리스트 조회 성공") {
        setData(result.data.data);
      }
    });

  }, [userInfo]);

  const handleNavigate = (id) => {
    navigate(`/goods/${id}`);
  };

  const handleDelete = (e, index, id) => {
    e.stopPropagation();

    axios.delete(`${process.env.REACT_APP_URL}/product/like`, {
      data: {
        userID: userInfo,
        productID: id
      }
    });

    let newData = data.slice();

    newData.splice(index, 1);

    if (newData.length === 0) {
      return setData(null);
    }

    setData(newData);
  };

  return (
    <>
      <h3>찜한 상품</h3>
      {data 
      ? data.map( (el, index) => {
          const price = el.sortPrice.toLocaleString("ko-KR")
          return  <div className="like" key={el.id} onClick={() => handleNavigate(el.id)}>
                    <img src={`${process.env.REACT_APP_URL}/${el.img}`} alt="img" />
                    <div className="like__info">
                      <div>{el.name}</div>
                      <div>{price}원</div>
                    </div>
                    <div className="like__btn">
                      <button onClick={(e) => handleDelete(e, index, el.id)}>삭제</button>
                      <button><FontAwesomeIcon className="icon__size14" icon={faCartShopping} />담기</button>
                    </div>
                  </div>
        })
      : <div className="like__data-none">
          <div>
            <FontAwesomeIcon className="icon__size100 icon__color-gray" icon={faHeart} />
          </div>
          <span>찜한 상품이 없습니다</span>
        </div>}
    </>
  );
}

export default Like;