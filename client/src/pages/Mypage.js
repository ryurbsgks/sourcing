import "./pages.css";
import { useState, useEffect, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TopBar from "../components/common/TopBar";
import SearchBar from "../components/common/SearchBar";
import NavBar from "../components/common/NavBar";
import SideNavBar from "../components/mypage/SideNavBar";
import Order from "../components/mypage/Order";
import Cart from "../components/mypage/Cart";
import Like from "../components/mypage/Like";
import Modify from "../components/mypage/Modify";
import Check from "../components/modal/Check";
import { isAuthenticated } from "../function";

function Mypage() {

  const [userInfo, setUserInfo] = useState();

  const isLogin = useSelector( (state) => state.isLogIn );
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  useLayoutEffect( () => {

    if (isLogin) {

      const cb = (res) => {

        setUserInfo({
          id: res.data.data.userInfo.id,
          userID: res.data.data.userInfo.userID,
          nickname: res.data.data.userInfo.nickname,
          email: res.data.data.userInfo.email,
          tel: res.data.data.userInfo.tel,
          address: res.data.data.userInfo.address,
          auto: res.data.data.userInfo.auto
        });
      };

      isAuthenticated(dispatch, cb);

    }

  }, []);
  
  useEffect( () => {

    if (params.mypage !== "order" && params.mypage !== "cart" && params.mypage !== "like" && params.mypage !== "modify") {
      return navigate("/404-page-not-found");
    }

  }, [params.mypage]);

  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <>
      {isLogin 
      ? <>
          <TopBar />
          <header>
            <SearchBar />
            <NavBar />
          </header>
          <main className="mypage__main">
            <SideNavBar />
            <section className="mypage__main__section">
              {userInfo 
              ? params.mypage === "order"
              ? <Order userInfo={userInfo.id} />
              : params.mypage === "cart" 
              ? <Cart userInfo={userInfo} /> 
              : params.mypage === "like" 
              ? <Like userInfo={userInfo.id} /> 
              : params.mypage === "modify" 
              ? <Modify userInfo={userInfo} /> 
              : null 
              : null}
            </section>
          </main>
        </>
      : <Check content={"로그인 후 이용할 수 있습니다"} handler={handleNavigate} />}
    </>
  );
};

export default Mypage;