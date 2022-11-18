import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import TopBar from "../components/common/TopBar";
import SearchBar from "../components/common/SearchBar";
import NavBar from "../components/common/NavBar";
import Header from "../components/category/Header";
import NotFound from "../components/common/NotFound";
import { isAuthenticated } from "../function";

function Category() {

  const [auth, setAuth] = useState(1);

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
              <Header params={params.category} auth={auth} />
            </section>
          </main>
        </>
      : <NotFound />}
    </>
  );
}

export default Category;