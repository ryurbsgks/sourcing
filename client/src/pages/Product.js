import { useState, useLayoutEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import New from "../components/product/New";
import Edit from "../components/product/Edit";
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
  const location = useLocation();

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
          {auth === 1 ? <Check content={"해당 페이지에 권한이 없습니다"} handler={handleNavigate} /> : null}
          <New props={props} />
        </> 
      : params.product === "edit" 
      ? <>
          {location.state ? <Edit props={location.state} /> : <Check content={"해당 페이지에 권한이 없습니다"} handler={handleNavigate} />}
        </>
      : <NotFound />}
    </>
  );
}

export default Product;