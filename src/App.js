import "bootstrap/dist/css/bootstrap.min.css";
import "./Components/Singup_login/Login.css";
import "./Components/SideBar/SideBar.css";
import "./Components/Layout/Layout.css";
import "./Components/MusicList/MusicBar.css";
import "./Components/SearchBar/SearchBar.css";
import "./Components/Randomizer/Randomizer.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import SearchBar from "./Components/SearchBar/SearchBar";
import RandomizerLayout from "./Components/Randomizer/RandomizerLayout";
import ArtistPageHipHop from "./Components/ArtistPage/HipHopLayout/ArtistPageHipHop";
import ArtistPageJazz from "./Components/ArtistPage/ArtistPageJazz";
import ArtistPageMetal from "./Components/ArtistPage/ArtistPageMetal";
import ArtistPagePop from "./Components/ArtistPage/ArtistPagePop";
import HipHopLayout from "./Components/ArtistPage/HipHopLayout/HipHopLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} index />
        <Route path="/searchbar" element={<SearchBar />} />
        <Route path="/randomizer" element={<RandomizerLayout />} />
        <Route path="HipHopLayout" element={<HipHopLayout />} />
        <Route path="/genre/Jazz" element={<ArtistPageJazz />} />
        <Route path="/genre/Metal" element={<ArtistPageMetal />} />
        <Route path="/genre/Pop" element={<ArtistPagePop />} />
      </Routes>
    </Router>
  );
}

export default App;
