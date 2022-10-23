import TopBar from "../component/TopBar";
import SearchBar from "../component/SearchBar";
import NavBar from "../component/NavBar";
import FindPWComponent from "../component/FindPW";

function FindPW() {
  return (
    <>
      <header>
        <TopBar />
        <SearchBar />
        <NavBar />
      </header>
      <main>
        <FindPWComponent />
      </main>
    </>
  );
};

export default FindPW;