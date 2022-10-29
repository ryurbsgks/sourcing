import { useParams } from "react-router-dom";
import TopBar from "../components/common/TopBar";
import SearchBar from "../components/common/SearchBar";
import NavBar from "../components/common/NavBar";
import FindID from "../components/find/FindID";
import FindPW from "../components/find/FindPW";

function Find() {

  const params = useParams();

  return (
    <>
      <TopBar />
      <header>
        <SearchBar />
        <NavBar />
      </header>
      <main>
        {params.target === "id" ? <FindID /> : null}
        {params.target === "pw" ? <FindPW /> : null}
      </main>
    </>
  );
}

export default Find;