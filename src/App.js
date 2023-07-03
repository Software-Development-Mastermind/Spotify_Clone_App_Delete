import "bootstrap/dist/css/bootstrap.min.css";
import "./Components/Singup_login/Login.css";
import "./Components/SideBar/SideBar.css";
import "./Components/Layout/Layout.css";
import "./Components/MusicList/MusicBar.css";
import "./Components/SearchBar/SearchBar.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import SearchBar from "./Components/SearchBar/SearchBar";
import RandomizerLayout from "./Components/Randomizer/RandomizerLayout";
import ArtistPagePop from "./Components/ArtistPage/ArtistPagePop";
import HipHopLayout from "./Components/ArtistPage/HipHopLayout/HipHopLayout";
import JazzLayout from "./Components/ArtistPage/JazzLayout/JazzLayout";
import MetalLayout from "./Components/ArtistPage/MetalLayout/MetalLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} index />
        <Route path="/searchbar" element={<SearchBar />} />
        <Route path="/randomizer" element={<RandomizerLayout />} />
        <Route path="HipHopLayout" element={<HipHopLayout />} />
        <Route path="JazzLayout" element={<JazzLayout />} />
        <Route path="MetalLayout" element={<MetalLayout />} />
        <Route path="/genre/Pop" element={<ArtistPagePop />} />
      </Routes>
    </Router>
  );
}

export default App;
