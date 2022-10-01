import TopBar from "../component/TopBar";
import SearchBar from "../component/SearchBar";
import NavBar from "../component/NavBar";
import SignupComponent from "../component/Signup";

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