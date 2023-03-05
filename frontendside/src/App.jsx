import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import PrivateRoute from "./components/Routes/Private";
import Pagenotfound from "./pages/Pagenotfound";
import Profile from "./pages/Profile";
import Userslist from "./pages/Userslist";
import Usersupdate from "./pages/Usersupdate";
import Usersread from "./pages/Usersread";

function App() {

  return (
   <Router>
   <Routes>
   <Route exact path="/" element={<HomePage />} />
   <Route path="/dashboard" element={<PrivateRoute />} />
   <Route path="/register" element={<Register />} />
   <Route path="/login" element={<Login />} />
   <Route path="/profile" element={<Profile />} />
   <Route path="/userslist" element={<Userslist />} />
   <Route path="/usersupdate/:id" element={<Usersupdate />} />
   <Route path="/usersread/:id" element={<Usersread />} />
   <Route path="*" element={<Pagenotfound />} />
   </Routes>
   </Router>
  );
};

export default App
