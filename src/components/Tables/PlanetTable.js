import React from "react";
import { Table } from "react-bootstrap";

function PlanetTable(props) {
  return (
    <div id="lists-table">
      <Table id="table" hover striped>
        <thead id="lists-table-header">
          <tr>
            <th className="cell-Pname">Planet Name</th>
            <th className="cell-climate">Climate</th>
            <th className="cell-terrain">Terrain</th>
            <th className="cell-population">Population</th>
            <th className="cell-diameter">Diameter</th>
          </tr>
        </thead>
        <tbody id="lists-table-body">
          {props.planetTable.map((planet, index) => (
            <tr key={index}>
              <td className="cell-Pname">{planet.name}</td>
              <td className="cell-climate">{planet.climate}</td>
              <td className="cell-terrain">{planet.terrain}</td>
              <td className="cell-population">{planet.population}</td>
              <td className="cell-diameter">{planet.diameter}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PlanetTable;
