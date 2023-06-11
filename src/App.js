import "bootstrap/dist/css/bootstrap.min.css";
import "./Components/Singup_login/Login.css";
import "./Components/SideBar/SideBar.css";
import "./Components/Layout/Layout.css";
import "./Components/MusicList/MusicBar.css";
import "./Components/SearchBar/SearchBar.css";
import "./Components/Randomizer/RandomizerLayout.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import SearchBar from "./Components/SearchBar/SearchBar";
import RandomizerLayout from "./Components/Randomizer/RandomizerLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/searchbar" element={<SearchBar />} />
        <Route path="/RandomizerLayout" element={<RandomizerLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
