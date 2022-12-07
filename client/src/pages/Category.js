import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import TopBar from "../components/common/TopBar";
import SearchBar from "../components/common/SearchBar";
import NavBar from "../components/common/NavBar";
import Header from "../components/category/Header";
import List from "../components/category/List";
import NotFound from "../components/common/NotFound";
import { isAuthenticated } from "../function";

function Category() {

  const [auth, setAuth] = useState(1);
  const [sort, setSort] = useState({
    target: "id",
    option: "desc"
  });

  const params = useParams();
  const isLogin = useSelector( (state) => state.isLogIn );
  const dispatch = useDispatch();

  useEffect( () => {

    if (isLogin) {

      const cb = (res) => {
        setAuth(res.data.data.userInfo.auth);
      }
      
      isAuthenticated(dispatch, cb);

    }
    
  }, []);

  const handleChangeSort = (target, option) => {
    setSort({
      target: target,
      option: option
    });
  };

  return (
    <>
      {params.category === "vegetable" || params.category === "fruit" || params.category === "seafood"
      ? <>
          <TopBar />
          <header>
            <SearchBar />
            <NavBar />
          </header>
          <main>
            <section className="container">
              <Header params={params.category} auth={auth} handleChangeSort={handleChangeSort} />
              <List params={params.category} sort={sort} />
            </section>
          </main>
        </>
      : <NotFound />}
    </>
  );
}

export default Category;