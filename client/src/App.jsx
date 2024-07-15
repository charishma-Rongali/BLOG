import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from "./components/Homepage";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateBlog from "./components/CreateBlog";

function App(){
  return(
    <Router>
      <NavBar/>
      <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/create-blog" element={<CreateBlog />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
