import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TopBar from "../components/common/TopBar";
import SearchBar from "../components/common/SearchBar";
import NavBar from "../components/common/NavBar";
import Banner from "../components/main/Banner";
import ProductRecommend from "../components/main/ProductRecommend";
import { setIsLogin } from "../redux/action";
import { isAuthenticated } from "../function";

function Main() {

  const location = useLocation();
  const isLogin = useSelector( (state) => state.isLogIn );
  const dispatch = useDispatch();

  useEffect( () => {

    if (location.state) {
      if (location.state.isLogin) {
        dispatch(setIsLogin(true));
      }
    }

    if (isLogin) {
      isAuthenticated(dispatch);
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
        <Banner />
        <ProductRecommend />
      </main>
    </>
  );
}

export default Main;