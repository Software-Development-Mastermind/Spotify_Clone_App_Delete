import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Components/Singup_login/Login.css";
import "./Components/SideBar/SideBar.css";
import "./Components/Layout/Layout.css";
import "./Components/MusicList/MusicBar.css";
import "./Components/SearchBar/SearchBar.css";

import HomePage from "./Components/HomePage";
import SearchBar from "./Components/SearchBar/SearchBar";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/Homepage" element={<HomePage />} />
        <Route path="/searchbar" element={<SearchBar />} />
      </Routes>
    </Router>
  );
}

export default App;
