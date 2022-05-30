import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./components/topBar";
import About from "./components/About";
import Contact from "./components/Contact";
import NavBar from "./components/NavBar";
import CGV from "./components/CGV";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/policy" element={<CGV />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
