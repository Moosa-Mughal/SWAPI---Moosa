/* eslint-disable no-undef */
import React from "react";
import TablePagination from "./TablePagination";
import CharacterTable from "./CharacterTable";
import PlanetTable from "./PlanetTable";
import StarshipTable from "./StarshipTable";

function Table(props) {
  // if (pathLocation.pathname === "/people") {
  function handleNewPage(page) {
    setPage(page);
    localStorage.setItem("page", page);

    setLoading(true);
    setCharacterTable([]);

    if (localStorage.getItem("searchingPeople") === "true") {
      if (localStorage.getItem(`searchPage${page}`)) {
        setLoading(false);
        setPaginationCount(localStorage.getItem("searchPaginationCount"));
        setCharacterTable(
          JSON.parse(localStorage.getItem(`searchPage${page}`))
        );
      } else {
        createSearchCharacterTable(searchInput, page);
      }
    } else {
      if (localStorage.getItem(`page${page}`)) {
        setLoading(false);
        setPaginationCount(localStorage.getItem("paginationCount"));
        setCharacterTable(JSON.parse(localStorage.getItem(`page${page}`)));
      } else {
        createCharacterTable(page);
      }
    }
  }

  return (
    <center>
      <TablePagination
        paginationCount={paginationCount}
        handleNewPage={handleNewPage}
        activePage={page}
      />
      <CharacterTable characterTable={characterTable} />
    </center>
  );
  // } else if (pathLocation.pathname === "/planets") {
  //   function handleNewPage(page) {
  //     setPage(page);
  //     localStorage.setItem("page", page);

  //     setLoading(true);
  //     setPlanetTable([]);

  //     if (localStorage.getItem("searchingPlanets") === "true") {
  //       if (localStorage.getItem(`searchPage${page}`)) {
  //         setLoading(false);
  //         setPaginationCount(localStorage.getItem("searchPaginationCount"));
  //         setCharacterTable(
  //           JSON.parse(localStorage.getItem(`searchPage${page}`))
  //         );
  //       } else {
  //         createSearchPlanetTable(searchInput, page);
  //       }
  //     } else {
  //       if (localStorage.getItem(`page${page}`)) {
  //         setLoading(false);
  //         setPaginationCount(localStorage.getItem("paginationCount"));
  //         setPlanetTable(JSON.parse(localStorage.getItem(`page${page}`)));
  //       } else {
  //         createPlanetTable(page);
  //       }
  //     }
  //   }

  //   return (
  //     <center>
  //       <TablePagination
  //         paginationCount={paginationCount}
  //         handleNewPage={handleNewPage}
  //         activePage={page}
  //       />
  //       <PlanetTable planetTable={planetTable} />
  //     </center>
  //   );
  // } else if (pathLocation.pathname === "/starships") {
  //   function handleNewPage(page) {
  //     setPage(page);
  //     localStorage.setItem("page", page);

  //     setLoading(true);
  //     setStarshipTable([]);

  //     if (localStorage.getItem("searchingStarships") === "true") {
  //       if (localStorage.getItem(`searchPage${page}`)) {
  //         setLoading(false);
  //         setPaginationCount(localStorage.getItem("searchPaginationCount"));
  //         setStarshipTable(
  //           JSON.parse(localStorage.getItem(`searchPage${page}`))
  //         );
  //       } else {
  //         createSearchStarshipTable(searchInput, page);
  //       }
  //     } else {
  //       if (localStorage.getItem(`page${page}`)) {
  //         setLoading(false);
  //         setPaginationCount(localStorage.getItem("paginationCount"));
  //         setStarshipTable(JSON.parse(localStorage.getItem(`page${page}`)));
  //       } else {
  //         createStarshipTable(page);
  //       }
  //     }
  //   }

  //   return (
  //     <center>
  //       <TablePagination
  //         paginationCount={paginationCount}
  //         handleNewPage={handleNewPage}
  //         activePage={page}
  //       />
  //       <StarshipTable starshipTable={starshipTable} />
  //     </center>
  //   );
  // }
}

export default Table;
