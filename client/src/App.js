import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Member from "./pages/Member";
import Find from "./pages/Find";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/member/:target" element={<Member />} />
        <Route path="/find/:target" element={<Find />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;