import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TopBar from "../components/common/TopBar";
import SearchBar from "../components/common/SearchBar";
import NavBar from "../components/common/NavBar";
import FindID from "../components/find/FindID";
import FindPW from "../components/find/FindPW";
import Check from "../components/modal/Check";
import NotFound from "../components/common/NotFound";

function Find() {

  const params = useParams();
  const isLogin = useSelector( (state) => state.isLogIn );
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <>
      {params.target === "id" || params.target === "pw" 
      ? <>
          <TopBar />
          <header>
            <SearchBar />
            <NavBar />
          </header>
          <main>
            {params.target === "id" ? <FindID /> : <FindPW />}
            {isLogin ? <Check content={"이미 로그인 상태입니다"} handler={handleNavigate} /> : null}
          </main>
        </>
      : <NotFound />}
    </>
  );
}

export default Find;