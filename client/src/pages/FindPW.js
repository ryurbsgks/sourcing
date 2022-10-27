import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TopBar from "../component/header/TopBar";
import SearchBar from "../component/header/SearchBar";
import NavBar from "../component/header/NavBar";
import FindPWComponent from "../component/login/FindPW";
import Check from "../modal/Check";

function FindPW() {

  const isLogin = useSelector( (state) => state.isLogIn );
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <>
      <header>
        <TopBar />
        <SearchBar />
        <NavBar />
      </header>
      <main>
        {isLogin ? <Check content={"이미 로그인 상태입니다"} handler={handleNavigate} /> : null}
        <FindPWComponent />
      </main>
    </>
  );
};

export default FindPW;