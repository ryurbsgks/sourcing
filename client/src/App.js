import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Member from "./pages/Member";
import Find from "./pages/Find";
import Category from "./pages/Category";
import NotFound from "./components/common/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/member/:target" element={<Member />} />
        <Route path="/find/:target" element={<Find />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;