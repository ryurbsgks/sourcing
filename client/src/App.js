import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Member from "./pages/Member";
import Find from "./pages/Find";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Goods from "./pages/Goods";
import Checkout from "./pages/Checkout";
import Mypage from "./pages/Mypage";
import Search from "./pages/Search";
import Pirce from "./pages/Price";
import NotFound from "./components/common/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/member/:target" element={<Member />} />
        <Route path="/find/:target" element={<Find />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/product/:product" element={<Product />} />
        <Route path="/goods/:goods" element={<Goods />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/mypage/:mypage" element={<Mypage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/price" element={<Pirce />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;