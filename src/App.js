import "./App.css";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.search) {
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />
          <Routes>
            <Route path="/rooms/:roomId" element={<Chat />} />
            <Route path="/" element={<Chat />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
