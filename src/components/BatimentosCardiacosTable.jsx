import React from "react";
import "./Table.css";

const BatimentosCardiacosTable = ({ data, actions }) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
      <thead>
        <tr>
          <th
            style={{
              border: "1px solid #ddd",
              padding: "8px",
              textAlign: "left",
              backgroundColor: "#f2f2f2",
            }}
          >
            ID
          </th>
          <th
            style={{
              border: "1px solid #ddd",
              padding: "8px",
              textAlign: "left",
              backgroundColor: "#f2f2f2",
            }}
          >
            Data e Hora
          </th>
          <th
            style={{
              border: "1px solid #ddd",
              padding: "8px",
              textAlign: "left",
              backgroundColor: "#f2f2f2",
            }}
          >
            BPM
          </th>
          <th
            style={{
              border: "1px solid #ddd",
              padding: "8px",
              textAlign: "left",
              backgroundColor: "#f2f2f2",
            }}
          >
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row,index) => (
          <tr key={index}>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              {row.id}
            </td>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              {new Date(row.dataBatimento).toLocaleString()}
            </td>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              {row.bpm}
            </td>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >

              <button
                onClick={() => actions(row.id, "delete")}
                style={{
                  padding: "5px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BatimentosCardiacosTable;
