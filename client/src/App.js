import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Member from "./pages/Member";
import Find from "./pages/Find";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Goods from "./pages/Goods";
import Checkout from "./pages/Checkout";
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;