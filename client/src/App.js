import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import SellerSignup from "./pages/SellerSignup";
import Login from "./pages/Login";
import FindID from "./pages/FindID";
import FindPW from "./pages/FindPW";
import Product from "./pages/Product";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/seller/signup" element={<SellerSignup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/findid" element={<FindID />} />
          <Route path="/findpw" element={<FindPW />} />
          <Route path="/product/:category" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;