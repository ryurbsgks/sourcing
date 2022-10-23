import TopBar from "../component/TopBar";
import SearchBar from "../component/SearchBar";
import NavBar from "../component/NavBar";
import FindIDComponent from "../component/FindID";

function FindID() {
  return (
    <>
      <header>
        <TopBar />
        <SearchBar />
        <NavBar />
      </header>
      <main>
        <FindIDComponent />
      </main>
    </>
  );
};

export default FindID;