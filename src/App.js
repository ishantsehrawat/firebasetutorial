import React from "react";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const user = localStorage.getItem("token");
  console.log(user);
  return (
    <Router>
      <div className="h-screen w-full bg-cgrey">
        <Routes>
          <Route index element={!user ? <Signin /> : <Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
