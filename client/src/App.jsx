import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserArea from "./components/userArea";
import FileContent from "./components/FileContent";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/:username" element={<UserArea />} />
          <Route path="*" element={<h1>page is not found</h1>} />
          <Route path="/:username/:file" element={<FileContent/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
