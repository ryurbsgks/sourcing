import TopBar from "../components/common/TopBar";
import SearchBar from "../components/common/SearchBar";
import NavBar from "../components/common/NavBar";
import Graph from "../components/price/Graph";

function Pirce () {

  return (
    <>
      <TopBar />
      <header>
        <SearchBar />
        <NavBar />
      </header>
      <main className="container">
        <Graph />
      </main>
    </>
  );
};

export default Pirce;