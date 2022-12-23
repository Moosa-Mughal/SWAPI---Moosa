import { Route, Routes, Router, Navigate } from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import StarWarsPlanets from "./components/StarWarsPlanets";
import StarWarsPeople from "./components/StarWarsPeople";
import StarWarsStarships from "./components/StarWarsStarships";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/people" element={<StarWarsPeople />} />
        <Route path="/planets" element={<StarWarsPlanets />} />
        <Route path="/starships" element={<StarWarsStarships />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
