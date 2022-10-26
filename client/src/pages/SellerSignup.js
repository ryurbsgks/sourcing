import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TopBar from "../component/TopBar";
import SearchBar from "../component/SearchBar";
import NavBar from "../component/NavBar";
import SellerSignupComponent from "../component/SellerSignup";
import Check from "../modal/Check";

function SellerSignup() {

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
        <SellerSignupComponent />
      </main>
    </>
  );
}

export default SellerSignup;