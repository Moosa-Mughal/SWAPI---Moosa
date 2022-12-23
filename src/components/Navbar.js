import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-dark">
        <a class="navbar-brand" href="/">
          <h1 id="star-wars-header">Star Wars Api</h1>
        </a>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a id="star-wars-link" href="/people">
                People
              </a>
            </li>
            <li class="nav-item active">
              <a id="star-wars-link" href="/planets">
                Planets
              </a>
            </li>
            <li class="nav-item active">
              <a id="star-wars-link" href="/starships">
                Starships
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
