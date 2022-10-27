import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TopBar from "../component/header/TopBar";
import SearchBar from "../component/header/SearchBar";
import NavBar from "../component/header/NavBar";
import FindIDComponent from "../component/login/FindID";
import Check from "../modal/Check";

function FindID() {

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
        <FindIDComponent />
      </main>
    </>
  );
};

export default FindID;