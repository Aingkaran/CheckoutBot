import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Button from '@mui/material/Button';
import SidebarGlobal from "./scenes/global/SidebarGlobal";
import Tasks from "./scenes/tasks";
import Proxies from "./scenes/proxies";
import { Routes, Route } from "react-router-dom";
import Billing from "./scenes/billing/";
import Account from "./scenes/account/";

function App() {
  const [userID, setUserID] = useState()
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: "",
    username: "",
    email: ""
  })



  return (
    <div className="container" style={{ display: 'flex', height: "100vh" }}>
      <SidebarGlobal />
      <main style={{ width: '100vw', margin: '2rem' }}>
        <Routes class="content">
          <Route path="/" element={<Tasks userInfo={userInfo} />} />
          <Route path="/billing" element={<Billing userInfo={userInfo} />} />
          <Route path="/proxies" element={<Proxies userInfo={userInfo} />} />
          <Route path="/account" element={<Account loggedIn={loggedIn} setLoggedIn={setLoggedIn} userInfo={userInfo} setUserInfo={setUserInfo} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
