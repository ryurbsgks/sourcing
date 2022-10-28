import TopBar from "../component/header/TopBar";
import SearchBar from "../component/header/SearchBar";
import NavBar from "../component/header/NavBar";
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