import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Button from '@mui/material/Button';
import SidebarGlobal from "./scenes/global/SidebarGlobal";
import Tasks from "./scenes/tasks/Tasks";
import Proxies from "./scenes/proxies/Proxies";
import { Routes, Route } from "react-router-dom";
import Billing from "./scenes/billing/Billing";

function App() {

  return (
    <div className="container">
      <SidebarGlobal />
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/proxies" element={<Proxies />} />
      </Routes>
    </div>
  );
}

export default App;
