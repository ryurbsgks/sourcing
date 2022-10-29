import { useParams } from "react-router-dom";
import TopBar from "../components/common/TopBar";
import SearchBar from "../components/common/SearchBar";
import NavBar from "../components/common/NavBar";
import Login from "../components/member/Login";
import Signup from "../components/member/Signup";
import SignupSeller from "../components/member/SignupSeller";

function Member() {

  const params = useParams();

  return (
    <>
      <TopBar />
      <header>
        <SearchBar />
        <NavBar />
      </header>
      <main>
        {params.target === "login" ? <Login /> : null}
        {params.target === "signup" ? <Signup /> : null}
        {params.target === "seller" ? <SignupSeller /> : null}
      </main>
    </>
  );
}

export default Member;