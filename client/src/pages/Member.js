import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TopBar from "../components/common/TopBar";
import SearchBar from "../components/common/SearchBar";
import NavBar from "../components/common/NavBar";
import Login from "../components/member/Login";
import Signup from "../components/member/Signup";
import SignupSeller from "../components/member/SignupSeller";
import Check from "../components/modal/Check";
import NotFound from "../components/common/NotFound";

function Member() {

  const params = useParams();
  const isLogin = useSelector( (state) => state.isLogIn );
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <>
      {params.target === "login" || params.target === "signup" || params.target === "seller" 
      ? <>
          <TopBar />
          <header>
            <SearchBar />
            <NavBar />
          </header>
          <main>
            {params.target === "login" ? <Login /> : params.target === "signup" ? <Signup /> : <SignupSeller />}
            {isLogin ? <Check content={"이미 로그인 상태입니다"} handler={handleNavigate} /> : null}
          </main>
        </>
      : <NotFound />}
    </>
  );
}

export default Member;