import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import TopBar from "../components/common/TopBar";
import SearchBar from "../components/common/SearchBar";
import NavBar from "../components/common/NavBar";
import Header from "../components/category/Header";
import { getCookie } from "../function";
import { setIsLogin } from "../redux/action";

function Category() {

  const [auth, setAuth] = useState(1);

  const params = useParams();
  const isLogin = useSelector( (state) => state.isLogIn );
  const dispatch = useDispatch();

  useEffect( () => {

    if (isLogin) {

      axios.get(`${process.env.REACT_APP_URL}/user/auth`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${getCookie("sourcingAccess")}`
        }
      }).then( (res) => {
        if (res.data.message === "로그인 상태입니다") {
          return setAuth(res.data.data.userInfo.auth);
        }

        dispatch(setIsLogin(false));
      });

    }
    
  }, []);

  return (
    <>
      <TopBar />
      <header>
        <SearchBar />
        <NavBar />
      </header>
      <main>
        <section className="container">
          <Header params={params.category} auth={auth} />
        </section>
      </main>
    </>
  );
}

export default Category;