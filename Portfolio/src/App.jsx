import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./css/App.css";
import Goal from "./pages/Goal";
import Home from "./pages/Home";
import Login from "./pages/Login";
function App() {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/login" && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />{" "}
        <Route path="/goal" element={<Goal />} />
      </Routes>
    </div>
  );
}

export default App;
