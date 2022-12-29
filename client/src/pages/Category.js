import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import TopBar from "../components/common/TopBar";
import SearchBar from "../components/common/SearchBar";
import NavBar from "../components/common/NavBar";
import Header from "../components/category/Header";
import List from "../components/category/List";
import { isAuthenticated } from "../function";

function Category() {

  const [auth, setAuth] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();
  const isLogin = useSelector( (state) => state.isLogIn );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect( () => {

    if (params.category !== "vegetable" && params.category !== "fruit" && params.category !== "seafood") {
      return navigate("/404-page-not-found");
    }

  }, [params.category]);

  useEffect( () => {

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
          <Header params={params.category} auth={auth} sort={searchParams.get("sort")} />
          <List params={params.category} sort={searchParams.get("sort")} page={searchParams.get("page")} />
        </section>
      </main>
    </>
  );
}

export default Category;