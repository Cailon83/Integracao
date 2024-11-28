import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../services/api";
import Table from "../components/BatimentosCardiacosTable";
import Form from "../components/BatimentosCardiacosForm";

// Registro dos componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Batimentos = () => {
  const [batimentos, setBatimentos] = useState([]);
  const [search, setSearch] = useState("");
  const [currentBatimento, setCurrentBatimento] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {
    fetchAllBatimentos();
  }, []);

  const fetchAllBatimentos = async () => {
    try {
      const response = await api.get("/batimentos");
      setBatimentos(response.data);
    } catch (error) {
      console.error("Erro ao buscar batimentos:", error);
      alert("Erro ao buscar os batimentos.");
    }
  };

  const handleSearch = async () => {
    try {
      if (!isNaN(search) && search.trim() !== "") {
        const response = await api.get(`/batimentos/${search}`);
        setBatimentos([response.data]);
      } else {
        alert("Por favor, insira um ID válido.");
      }
    } catch (error) {
      console.error("Erro ao buscar batimento:", error);
      alert("Erro ao buscar batimento. Verifique o console para mais detalhes.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/batimentos/${id}`);
      setBatimentos(batimentos.filter((batimento) => batimento.id !== id));
      alert("Batimento deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar batimento:", error);
      alert("Erro ao deletar batimento.");
    }
  };

  const handleEdit = (id) => {
    const batimento = batimentos.find((b) => b.id === id);
    setCurrentBatimento(batimento);
    setShowModal(true);
  };

  const openNewFormModal = () => {
    setCurrentBatimento(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowGraph(false);
  };

  const toggleGraph = () => {
    setShowGraph(!showGraph);
  };

  const graphData = {
    labels: batimentos.map((b) => new Date(b.dataBatimento).toLocaleString("pt-BR")),
    datasets: [
      {
        label: "BPM",
        data: batimentos.map((b) => b.bpm),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const graphOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Gráfico de Batimentos (BPM)" },
    },
    scales: {
      x: { title: { display: true, text: "dataBatimento" } },
      y: { title: { display: true, text: "bpm" } },
    },
  };

  return (
    <div>
      <h1>Gerenciamento de Batimentos</h1>

      {/* Barra de busca */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Buscar por ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button
          onClick={search.length > 0 ? handleSearch : fetchAllBatimentos}
          style={{ marginRight: "10px" }}
        >
          Buscar
        </button>
        <button onClick={openNewFormModal} style={{ padding: "5px" }}>
          Novo Batimento
        </button>
      </div>

      {/* Tabela de Batimentos */}
      <Table
        data={batimentos}
        columns={["id", "bpm", "dataBatimento"]}
        actions={(id, action) => {
          if (action === "edit") handleEdit(id);
          if (action === "delete") handleDelete(id);
        }}
      />

      {/* Modal para Formulário */}
      {showModal && (
        <div className="modal" style={modalStyles}>
          <div className="modal-content" style={modalContentStyles}>
            <h2>{currentBatimento ? "Editar Batimento" : "Novo Batimento"}</h2>
            <button onClick={closeModal} style={{ marginBottom: "10px" }}>
              Fechar
            </button>
            <Form
              endpoint="/batimentos"
              method={currentBatimento ? "PUT" : "POST"}
              aluno={currentBatimento}
            />
          </div>
        </div>
      )}

      {/* Gráfico de Batimentos */}
      {batimentos.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={toggleGraph}>
            {showGraph ? "Ocultar Gráfico" : "Mostrar Gráfico"}
          </button>
          {showGraph && <Line data={graphData} options={graphOptions} />}
        </div>
      )}
    </div>
  );
};

export default Batimentos;

// Estilos para o modal
const modalStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyles = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "600px",
  width: "100%",
};
