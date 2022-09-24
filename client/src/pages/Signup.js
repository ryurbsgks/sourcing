import SignupComponent from "../component/Signup";
import TopBar from "../component/TopBar";
import SearchBar from "../component/SearchBar";
import NavBar from "../component/NavBar";

function Signup() {
  return (
    <>
      <header>
        <TopBar />
        <SearchBar />
        <NavBar />
      </header>
      <main>
        <SignupComponent />
      </main>
    </>
  );
}

export default Signup;