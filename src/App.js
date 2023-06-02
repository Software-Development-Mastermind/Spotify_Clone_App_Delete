import "bootstrap/dist/css/bootstrap.min.css";
import "./Components/Singup_login/Login.css";
import "./Components/SideBar/SideBar.css";
import "./Components/Layout/Layout.css";
import "./Components/MusicList/MusicBar.css";

import LogSignIn from "./Components/Singup_login/Signup_login";
import Sidebar from "./Components/SideBar/Sidebar";
import Musicbar from "./Components/MusicList/MusicBar";
import Layout from "./Components/Layout/Layout";

function App() {
  return (
    <div>
      <LogSignIn />
      <Layout />
    </div>
  );
}

export default App;
