import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import TopBar from "../components/common/TopBar";
import SearchBar from "../components/common/SearchBar";
import NavBar from "../components/common/NavBar";
import Banner from "../components/main/Banner";
import ProductRecommend from "../components/main/ProductRecommend";
import { setIsLogin } from "../redux/action";

function Main() {

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect( () => {

    if (location.state) {
      if (location.state.isLogin) {
        dispatch(setIsLogin(true));
      }
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