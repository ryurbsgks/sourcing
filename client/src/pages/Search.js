import { useState, useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TopBar from "../components/common/TopBar";
import SearchBar from "../components/common/SearchBar";
import NavBar from "../components/common/NavBar";
import Header from "../components/category/Header";
import List from "../components/category/List";
import { isAuthenticated } from "../function";

function Search() {

  const [auth, setAuth] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const isLogin = useSelector( (state) => state.isLogIn );
  const dispatch = useDispatch();

  useLayoutEffect( () => {

    if (isLogin) {

      const cb = (res) => {
        setAuth(res.data.data.userInfo.auth);
      }

      isAuthenticated(dispatch, cb);

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
          <Header params={searchParams.get("goods")} auth={auth} sort={searchParams.get("sort")} />
          <List params={searchParams.get("category")} sort={searchParams.get("sort")} page={searchParams.get("page")} />
        </section>
      </main>
    </>
  );
};

export default Search;