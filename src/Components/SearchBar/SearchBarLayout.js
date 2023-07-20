import React from "react";
import LogSignIn from "../Singup_login/Signup_login";
import Sidebar from "../SideBar/Sidebar";
import SearchBarFeat from "./SearchBarFeat";
import SearchBar from "./SearchBar";

function SearchBarLayout() {
  const [searchResults, setSearchResults] = useState();
  const [config, setConfig] = useState();
  return (
    <div>
      <SearchBarFeat
        setSearchResults={setSearchResults}
        setConfig={setConfig}
      />
      <LogSignIn />
      <Sidebar />
      <SearchBar />
    </div>
  );
}

export default SearchBarLayout;
