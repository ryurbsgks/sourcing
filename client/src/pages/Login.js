import TopBar from "../component/TopBar";
import SearchBar from "../component/SearchBar";
import NavBar from "../component/NavBar";
import LoginComponent from "../component/Login";

function Login() {
  return (
    <>
      <header>
        <TopBar />
        <SearchBar />
        <NavBar />
      </header>
      <main>
        <LoginComponent />
      </main>
    </>
  );
}

export default Login;