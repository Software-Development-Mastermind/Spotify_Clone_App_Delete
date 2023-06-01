import "bootstrap/dist/css/bootstrap.min.css";
import "./Components/Singup_login/Login.css";
import "./Components/SideBar/SideBar.css";

import LogSignIn from "./Components/Singup_login/Signup_login";
import Sidebar from "./Components/SideBar/Sidebar";

function App() {
  return (
    <div>
      <LogSignIn />
      <Sidebar />
    </div>
  );
}

export default App;
