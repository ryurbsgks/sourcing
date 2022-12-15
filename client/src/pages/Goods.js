import { useParams } from "react-router-dom";
import TopBar from "../components/common/TopBar";
import SearchBar from "../components/common/SearchBar";
import NavBar from "../components/common/NavBar";
import Detail from "../components/product/Detail";

function Goods() {

  const params = useParams();

  return (
    <>
      <TopBar />
      <header>
        <SearchBar />
        <NavBar />
      </header>
      <Detail params={params.goods}/>
    </>
  );
}

export default Goods;