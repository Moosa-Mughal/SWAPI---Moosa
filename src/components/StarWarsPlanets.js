import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import PlanetTable from "./Tables/PlanetTable";
import TablePagination from "./Tables/TablePagination";
import { searchForPlanet } from "./API/searchForPlanet";
import { fetchPlanets } from "./API/fetchPlanets";
import Spinner from "./Spinner";
import Table from "./Tables/Table";

function StarWarsPlanets() {
  const [planetTable, setPlanetTable] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchFailed, setSearchFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paginationCount, setPaginationCount] = useState(0);
  const [page, setPage] = useState(() => {
    if (localStorage.getItem("page")) {
      return parseInt(localStorage.getItem("page"));
    } else {
      return 1;
    }
  });

  useEffect(() => {
    if (localStorage.getItem("searchingPlanets") === "true") {
      if (
        JSON.parse(localStorage.getItem(`searchPage${page}`)) !== undefined &&
        JSON.parse(localStorage.getItem(`searchPage${page}`)).length > 0
      ) {
        setLoading(false);
        setSearchInput(localStorage.getItem("searchInput"));
        setPaginationCount(localStorage.getItem("searchPaginationCount"));
        setPlanetTable(JSON.parse(localStorage.getItem(`searchPage${page}`)));
      } else {
        setSearchInput(localStorage.getItem("searchInput"));
        setLoading(false);
        setSearchFailed(true);
      }
    } else {
      if (localStorage.getItem(`page${page}`)) {
        setLoading(false);
        setPaginationCount(localStorage.getItem("paginationCount"));
        setPlanetTable(JSON.parse(localStorage.getItem(`page${page}`)));
      } else {
        createPlanetTable(1);
      }
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("searchingPlanets") === "true") {
      localStorage.setItem(`searchPage${page}`, JSON.stringify(planetTable));
    } else {
      localStorage.setItem(`page${page}`, JSON.stringify(planetTable));
    }
  }, [planetTable, page]);

  function handlePagination(planetCount) {
    let pages = Math.ceil(planetCount / 10);
    if (pages < 1) {
      setSearchFailed(true);
    }
    setPaginationCount(pages);
    if (localStorage.getItem("searchingPlanets") === "true") {
      localStorage.setItem("searchPaginationCount", pages);
    } else {
      localStorage.setItem("paginationCount", pages);
    }
  }

  function handleNewPage(page) {
    setPage(page);
    localStorage.setItem("page", page);

    setLoading(true);
    setPlanetTable([]);
    if (localStorage.getItem("searchingPlanets") === "true") {
      if (localStorage.getItem(`searchPage${page}`)) {
        setLoading(false);
        setPaginationCount(localStorage.getItem("searchPaginationCount"));
        setPlanetTable(JSON.parse(localStorage.getItem(`searchPage${page}`)));
      } else {
        createSearchPlanetTable(searchInput, page);
      }
    } else {
      if (localStorage.getItem(`page${page}`)) {
        setLoading(false);
        setPaginationCount(localStorage.getItem("paginationCount"));
        setPlanetTable(JSON.parse(localStorage.getItem(`page${page}`)));
      } else {
        createPlanetTable(page);
      }
    }
  }

  function handleSearchButton(planet) {
    setSearchInput(planet);
    setSearchFailed(false);
    setLoading(true);
    setPlanetTable([]);
    setPage(1);

    if (localStorage.getItem("searchingPlanets") === "true") {
      let searchCount = localStorage.getItem("searchPaginationCount");
      for (let i = 1; i <= searchCount; i++) {
        localStorage.removeItem(`searchPage${i}`, []);
      }
    }
    localStorage.setItem("page", 1);
    localStorage.setItem("searchingPlanets", true);
    localStorage.setItem("searchInput", planet);

    createSearchPlanetTable(planet, 1);
  }

  function handleClearButton() {
    setSearchInput("");
    setSearchFailed(false);
    setPage(1);
    setPlanetTable(JSON.parse(localStorage.getItem(`page${1}`)));
    setPaginationCount(localStorage.getItem("paginationCount"));

    let searchCount = localStorage.getItem("searchPaginationCount");
    for (let i = 1; i <= searchCount; i++) {
      localStorage.removeItem(`searchPage${i}`, []);
    }

    localStorage.setItem("searchingPlanets", false);
    localStorage.setItem("searchInput", "");
    localStorage.removeItem("searchPaginationCount", "");
    localStorage.setItem("page", 1);
  }

  function createPlanetTable(page) {
    localStorage.setItem("searchingPlanets", false);
    fetchPlanets(page)
      .then((planets) => {
        return planets.count;
      })
      .then((count) => {
        handlePagination(count);
        setLoading(false);
      });
  }

  function createSearchPlanetTable(planet, page) {
    searchForPlanet(planet, page)
      .then((planets) => {
        return planets.count;
      })
      .then((count) => {
        handlePagination(count);
        setLoading(false);
      });
  }

  const Table = () => (
    <center>
      <PlanetTable planetTable={planetTable} />
      <TablePagination
        paginationCount={paginationCount}
        handleNewPage={handleNewPage}
        activePage={page}
      />
    </center>
  );

  const UserInterface = () => (
    <center>
      <SearchBar
        handleSearchButton={handleSearchButton}
        handleClearButton={handleClearButton}
        searchInput={searchInput}
      />
      <br />
      {searchFailed ? (
        <div id="search-failed-div">
          Find a planet the search did not. Hmm. -Yoda
        </div>
      ) : (
        <Table />
      )}
    </center>
  );

  return <div id="app-div">{loading ? <Spinner /> : <UserInterface />}</div>;
}

export default StarWarsPlanets;
