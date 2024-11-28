import React, { useState, useEffect } from "react";
import api from "../services/api";

const BatimentosCardiacosForm = ({ endpoint, method, batimento }) => {
  const [formData, setFormData] = useState({
    id: batimento?.id || "",
    bpm: batimento?.bpm || "",
    dataBatimento: batimento?.dataBatimento || "",
  });

  useEffect(() => {
    if (batimento) {
      setFormData({
        id: batimento.id,
        bpm: batimento.bpm,
        dataBatimento: batimento.dataBatimento,
      });
    }
  }, [batimento]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (method === "POST") {
        await api.post(endpoint, formData);
        alert("Batimento criado com sucesso!");
      } else if (method === "PUT") {
        await api.put(`${endpoint}/${formData.id}`, formData);
        alert("Batimento atualizado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao salvar batimento:", error);
      alert("Erro ao salvar batimento. Verifique os dados e tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div>
        <label htmlFor="bpm">BPM:</label>
        <input
          type="number"
          id="bpm"
          name="bpm"
          value={formData.bpm}
          onChange={handleChange}
          required
          style={{ marginLeft: "10px", padding: "5px" }}
        />
      </div>
      <div>
        <label htmlFor="dataBatimento">Data e Hora:</label>
        <input
          type="datetime-local"
          id="dataBatimento"
          name="dataBatimento"
          value={formData.dataBatimento}
          onChange={handleChange}
          required
          style={{ marginLeft: "10px", padding: "5px" }}
        />
      </div>
      <button
        type="submit"
        style={{
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Salvar
      </button>
    </form>
  );
};

export default BatimentosCardiacosForm;
