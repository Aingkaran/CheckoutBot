import { useState, useContext } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Button from '@mui/material/Button';
import SidebarGlobal from "./scenes/global/SidebarGlobal";
import Tasks from "./scenes/tasks";
import Proxies from "./scenes/proxies";
import { Routes, Route } from "react-router-dom";
import Billing from "./scenes/billing/";
import Account from "./scenes/account/";
import UserContext from './UserContext';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: "",
    username: "",
    email: ""
  })


  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, loggedIn, setLoggedIn }}>

      <div className="container" style={{ display: 'flex', height: "100vh" }}>
        <SidebarGlobal />
        <main style={{ width: '100vw', margin: '2rem' }}>
          <Routes class="content">
            <Route path="/" element={<Tasks />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/proxies" element={<Proxies />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </main>
      </div>
    </UserContext.Provider>

  );
}

export default App;
