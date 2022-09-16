import TopBar from "../component/TopBar";
import SearchBar from "../component/SearchBar";
import NavBar from "../component/NavBar";
import Banner from "../component/Banner";

function Main() {
  return (
    <>
      <header>
        <TopBar />
        <SearchBar />
        <NavBar />
      </header>
      <main>
        <Banner />
      </main>
    </>
  );
}

export default Main;