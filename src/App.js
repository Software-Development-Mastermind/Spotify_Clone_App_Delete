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
import ArtistPageHipHop from "./Components/ArtistPage/ArtistPageHipHop";
import ArtistPageJazz from "./Components/ArtistPage/ArtistPageJazz";
import ArtistPageMetal from "./Components/ArtistPage/ArtistPageMetal";
import ArtistPagePop from "./Components/ArtistPage/ArtistPagePop";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/searchbar" element={<SearchBar />} />
        <Route path="/randomizer" element={<RandomizerLayout />} />
        <Route path="/genre/Hip Hop" component={ArtistPageHipHop} />
        <Route path="/genre/Jazz" component={ArtistPageJazz} />
        <Route path="/genre/Metal" component={ArtistPageMetal} />
        <Route path="/genre/Pop" component={ArtistPagePop} />
      </Routes>
    </Router>
  );
}

export default App;
