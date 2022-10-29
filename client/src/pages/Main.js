import TopBar from "../components/common/TopBar";
import SearchBar from "../components/common/SearchBar";
import NavBar from "../components/common/NavBar";
import Banner from "../components/main/Banner";
import ProductRecommend from "../components/main/ProductRecommend";

function Main() {
  return (
    <>
      <TopBar />
      <header>
        <SearchBar />
        <NavBar />
      </header>
      <main>
        <Banner />
        <ProductRecommend />
      </main>
    </>
  );
}

export default Main;