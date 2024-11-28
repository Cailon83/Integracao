import React from "react";
import "./Table.css";

const Table = ({ data, columns, actions }) => {
  if (!data || data.length === 0) {
    return <p>Não há dados disponíveis.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column.toUpperCase()}</th> // Exibe o nome da coluna em maiúsculo
          ))}
          {actions && <th>AÇÕES</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={column}>{row[column]}</td> // Exibe o valor da célula para cada coluna
            ))}
            {actions && (
              <td>
                <button onClick={() => actions(row.id, "edit")} style={{ margin: "5px" }}>
                  Editar
                </button>
                <button onClick={() => actions(row.id, "delete")} style={{ margin: "5px" }}>
                  Deletar
                </button>
                <button onClick={() => actions(row.id, "batimento")} style={{ margin: "5px" }}>
                  Batimento
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
