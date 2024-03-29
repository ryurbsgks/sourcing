import axios from "axios";
import { useState, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TopBar from "../components/common/TopBar";
import SearchBar from "../components/common/SearchBar";
import NavBar from "../components/common/NavBar";
import Detail from "../components/product/Detail";
import { isAuthenticated } from "../function";

function Goods() {

  const [data, setData] = useState();
  const [userInfo, setUserInfo] = useState({
    id: "",
    nickname: "",
    userID: "",
    email: "",
    tel: "",
    address: ""
  });

  const params = useParams();
  const isLogin = useSelector( (state) => state.isLogIn );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect( () => {

    if (isLogin) {

      const cb = (res) => {
        setUserInfo({
          id: res.data.data.userInfo.id,
          nickname: res.data.data.userInfo.nickname,
          userID: res.data.data.userInfo.userID,
          email: res.data.data.userInfo.email,
          tel: res.data.data.userInfo.tel,
          address: res.data.data.userInfo.address,
        });
      };

      isAuthenticated(dispatch, cb);

    }

  }, []);

  useLayoutEffect( () => {

    axios.get(`${process.env.REACT_APP_URL}/product/detail`, {
      params: {
        id: params.goods
      }
    }).then( (res) => {
      if (res.data.message === "상세페이지 요청 성공") {
        return setData(res.data.data);
      }
    }).catch( (err) => {
      if (err.response.data.message === "요청한 데이터가 존재하지 않습니다") {
        navigate("/404-page-not-found");
      }
    });

  }, [params.goods]);

  return (
    <>
      <TopBar />
      <header>
        <SearchBar />
        <NavBar />
      </header>
      {data ? <Detail data={data} userInfo={userInfo} /> : null}
    </>
  );
}

export default Goods;