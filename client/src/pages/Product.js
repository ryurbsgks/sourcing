import { useState, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import New from "../components/product/New";
import NotFound from "../components/common/NotFound";
import Check from "../components/modal/Check";
import { isAuthenticated } from "../function";

function Product() {

  const [auth, setAuth] = useState();
  const [props, setProps] = useState();

  const params = useParams();
  const isLogin = useSelector( (state) => state.isLogIn );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect( () => {

    if (isLogin) {

      const cb = (res) => {
        setAuth(res.data.data.userInfo.auth);
        setProps(res.data.data.userInfo.id);
      }

      isAuthenticated(dispatch, cb);

    }

  }, []);

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <>
      {params.product === "new" 
      ? <>
          {auth === 2 ? null : <Check content={"해당 페이지에 권한이 없습니다"} handler={handleNavigate} />}
          <New props={props} />
        </> 
      : <NotFound />}
    </>
  );
}

export default Product;