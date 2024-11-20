import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserArea from "./components/userArea";

function App() {
  const [currentUser, setCurrentUser] = useState("");
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login setCurrentUser={setCurrentUser} />} />
          <Route
            path="/signup"
            element={<Signup setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/:username"
            element={<UserArea currentUser={currentUser} />}
          />
          <Route path="*" element={<h1>page is not found</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
