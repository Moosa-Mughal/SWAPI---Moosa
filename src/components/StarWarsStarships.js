import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import StarshipTable from "./Tables/StarshipTable";
import TablePagination from "./Tables/TablePagination";
import { searchForStarships } from "./API/searchForStarships";
import { fetchStarships } from "./API/fetchStarships";
import Spinner from "./Spinner";
import Table from "./Tables/Table";

function StarWarsStarships() {
  const [starshipTable, setStarshipTable] = useState([]);
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
    if (localStorage.getItem("searchingStarships") === "true") {
      if (
        JSON.parse(localStorage.getItem(`searchPage${page}`)) !== undefined &&
        JSON.parse(localStorage.getItem(`searchPage${page}`)).length > 0
      ) {
        setLoading(false);
        setSearchInput(localStorage.getItem("searchInput"));
        setPaginationCount(localStorage.getItem("searchPaginationCount"));
        setStarshipTable(JSON.parse(localStorage.getItem(`searchPage${page}`)));
      } else {
        setSearchInput(localStorage.getItem("searchInput"));
        setLoading(false);
        setSearchFailed(true);
      }
    } else {
      if (localStorage.getItem(`page${page}`)) {
        setLoading(false);
        setPaginationCount(localStorage.getItem("paginationCount"));
        setStarshipTable(JSON.parse(localStorage.getItem(`page${page}`)));
      } else {
        createStarshipTable(1);
      }
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("searchingStarships") === "true") {
      localStorage.setItem(`searchPage${page}`, JSON.stringify(starshipTable));
    } else {
      localStorage.setItem(`page${page}`, JSON.stringify(starshipTable));
    }
  }, [starshipTable, page]);

  function handlePagination(starshipCount) {
    let pages = Math.ceil(starshipCount / 10);
    if (pages < 1) {
      setSearchFailed(true);
    }
    setPaginationCount(pages);
    if (localStorage.getItem("searchingStarships") === "true") {
      localStorage.setItem("searchPaginationCount", pages);
    } else {
      localStorage.setItem("paginationCount", pages);
    }
  }

  function handleNewPage(page) {
    setPage(page);
    localStorage.setItem("page", page);

    setLoading(true);
    setStarshipTable([]);
    if (localStorage.getItem("searchingStarships") === "true") {
      if (localStorage.getItem(`searchPage${page}`)) {
        setLoading(false);
        setPaginationCount(localStorage.getItem("searchPaginationCount"));
        setStarshipTable(JSON.parse(localStorage.getItem(`searchPage${page}`)));
      } else {
        createSearchStarshipTable(searchInput, page);
      }
    } else {
      if (localStorage.getItem(`page${page}`)) {
        setLoading(false);
        setPaginationCount(localStorage.getItem("paginationCount"));
        setStarshipTable(JSON.parse(localStorage.getItem(`page${page}`)));
      } else {
        createStarshipTable(page);
      }
    }
  }

  function handleSearchButton(starship) {
    setSearchInput(starship);
    setSearchFailed(false);
    setLoading(true);
    setStarshipTable([]);
    setPage(1);

    if (localStorage.getItem("searchingStarship") === "true") {
      let searchCount = localStorage.getItem("searchPaginationCount");
      for (let i = 1; i <= searchCount; i++) {
        localStorage.removeItem(`searchPage${i}`, []);
      }
    }
    localStorage.setItem("page", 1);
    localStorage.setItem("searchingStarships", true);
    localStorage.setItem("searchInput", starship);

    createSearchStarshipTable(starship, 1);
  }

  function handleClearButton() {
    setSearchInput("");
    setSearchFailed(false);
    setPage(1);
    setStarshipTable(JSON.parse(localStorage.getItem(`page${1}`)));
    setPaginationCount(localStorage.getItem("paginationCount"));

    let searchCount = localStorage.getItem("searchPaginationCount");
    for (let i = 1; i <= searchCount; i++) {
      localStorage.removeItem(`searchPage${i}`, []);
    }

    localStorage.setItem("searchingStarships", false);
    localStorage.setItem("searchInput", "");
    localStorage.removeItem("searchPaginationCount", "");
    localStorage.setItem("page", 1);
  }

  function createStarshipTable(page) {
    localStorage.setItem("searchingStarships", false);
    fetchStarships(page)
      .then((starships) => {
        return starships.count;
      })
      .then((count) => {
        handlePagination(count);
        setLoading(false);
      });
  }

  function createSearchStarshipTable(starship, page) {
    searchForStarships(starship, page)
      .then((starships) => {
        return starships.count;
      })
      .then((count) => {
        handlePagination(count);
        setLoading(false);
      });
  }

  const Table = () => (
    <center>
      <StarshipTable starshipTable={starshipTable} />
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
          Find a starship the search did not. Hmm. -Yoda
        </div>
      ) : (
        <Table />
      )}
    </center>
  );

  return <div id="app-div">{loading ? <Spinner /> : <UserInterface />}</div>;
}

export default StarWarsStarships;
