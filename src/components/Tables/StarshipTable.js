import React from "react";
import { Table } from "react-bootstrap";

function StarshipsTable(props) {
  return (
    <div id="lists-table">
      <Table id="table" hover striped>
        <thead id="lists-table-header">
          <tr>
            <th className="cell-name">Name</th>
            <th className="cell-model">Model</th>
            <th className="cell-passengers">Passengers</th>
            <th className="cell-cargo-capacity">Cargo Capacity</th>
            <th className="cell-cost">Cost</th>
          </tr>
        </thead>
        <tbody id="lists-table-body">
          {props.starshipTable.map((starship, index) => (
            <tr key={index}>
              <td className="cell-name">{starship.name}</td>
              <td className="cell-model">{starship.model}</td>
              <td className="cell-passengers">{starship.passengers}</td>
              <td className="cell-capacity">{starship.cargo_capacity}</td>
              <td className="cell-cost">{starship.cost_in_credits}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default StarshipsTable;
