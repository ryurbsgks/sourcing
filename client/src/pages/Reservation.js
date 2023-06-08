import { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TopBar from "../components/common/TopBar";
import SearchBar from "../components/common/SearchBar";
import NavBar from "../components/common/NavBar";
import ReservationForm from "../components/reservation/ReservationForm";
import Check from "../components/modal/Check";
import { isAuthenticated } from "../function";

function Reservation() {

  const [userInfo, setUserInfo] = useState();

  const isLogin = useSelector( (state) => state.isLogIn );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect( () => {

    if (isLogin) {

      const cb = (res) => {

        setUserInfo({
          id: res.data.data.userInfo.id
        });

      };

      isAuthenticated(dispatch, cb);

    }

  }, []);

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
          <main>
            <ReservationForm userInfo={userInfo} />
          </main>
        </>
      : <Check content={"로그인 후 이용할 수 있습니다"} handler={handleNavigate} />}
    </>
  );
}

export default Reservation;