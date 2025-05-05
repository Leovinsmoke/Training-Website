import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./css/App.css";
import Goal from "./pages/Goal";
import Home from "./pages/Home";
import Login from "./pages/Login";
import History from "./pages/History";

function App() {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/" && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />{" "}
        <Route path="/goal" element={<Goal />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
