import TopBar from "../component/TopBar";
import SearchBar from "../component/SearchBar";
import NavBar from "../component/NavBar";
import Banner from "../component/Banner";
import ProductRecommend from "../component/ProductRecommend";

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
        <ProductRecommend />
      </main>
    </>
  );
}

export default Main;