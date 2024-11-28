import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import api from "../services/api";
import Table from "../components/Table";
import Form from "../components/Form";

// Registro dos componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Alunos = () => {
  const [alunos, setAlunos] = useState([]);
  const [search, setSearch] = useState("");
  const [currentAluno, setCurrentAluno] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [batimentos, setBatimentos] = useState([]);
  const [showBatimentoModal, setShowBatimentoModal] = useState(false);
  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {
    handleSearchAll();
  }, []);

  const handleSearch = async () => {
    try {
      if (!isNaN(search) && search.trim() !== "") {
        const response = await api.get(`/aluno/${search}`);
        setAlunos([response.data]);
      } else {
        const response = await api.get("/aluno/buscarPorNome", {
          params: { nome: search },
        });
        setAlunos(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
      alert("Erro ao buscar aluno(s). Verifique o console para mais detalhes.");
    }
  };

  const handleSearchAll = async () => {
    try {
      const response = await api.get("/aluno");
      setAlunos(response.data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
      alert("Erro ao buscar alunos. Verifique o console para mais detalhes.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/aluno/${id}`);
      setAlunos(alunos.filter((aluno) => aluno.id !== id));
      alert("Aluno deletado com sucesso!");
    } catch (error) {
      alert("Erro ao deletar aluno.");
    }
  };

  const handleEdit = (id) => {
    const aluno = alunos.find((aluno) => aluno.id === id);
    setCurrentAluno(aluno);
    setShowModal(true);
  };

  const handleBatimentos = async (id) => {
    try {
      const response = await api.get(`/batimentos/${id}`);
      setBatimentos(response.data);
      setShowBatimentoModal(true);
    } catch (error) {
      console.error("Erro ao buscar batimentos:", error);
      alert("Erro ao buscar batimentos. Verifique o console para mais detalhes.");
    }
  };

  const handleActions = (id, action) => {
    if (action === "edit") {
      handleEdit(id);
    } else if (action === "delete") {
      handleDelete(id);
    } else if (action === "batimento") {
      handleBatimentos(id);
    }
  };

  const openNewFormModal = () => {
    setCurrentAluno(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowBatimentoModal(false);
    setBatimentos([]);
    setShowGraph(false);
  };

  const toggleGraph = () => {
    setShowGraph(!showGraph);
  };

  const batimentoGraphData = {
    labels: batimentos.map((batimento) =>
      new Date(batimento.dataBatimento).toLocaleString("pt-BR")
    ),
    datasets: [
      {
        label: "Batimentos por Minuto (BPM)",
        data: batimentos.map((batimento) => batimento.bpm),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const batimentoGraphOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Gráfico de Batimentos (BPM)",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Data e Hora",
        },
      },
      y: {
        title: {
          display: true,
          text: "BPM",
        },
      },
    },
  };

  return (
    <div>
      <h1>Gerenciamento de Alunos</h1>

      {/* Barra de busca por nome ou ID */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Buscar por nome ou ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button
          onClick={search.length > 0 ? handleSearch : handleSearchAll}
          style={{ marginRight: "10px" }}
        >
          Buscar
        </button>
        <button onClick={openNewFormModal} style={{ padding: "5px" }}>
          Novo
        </button>
      </div>

      {/* Tabela de Alunos */}
      <Table
        data={alunos}
        columns={[
          "id",
          "nome",
          "etnia",
          "dataNascimento",
          "cidade",
          "email",
          "contatoEmergencia",
          "curso",
        ]}

        actions={handleActions}
        extraActions={[{ name: "Batimentos", action: "batimento" }]}
      />
        
      {/* Modal para Formulário */}
      {showModal && (
        <div className="modal" style={modalStyles}>
          <div className="modal-content" style={modalContentStyles}>
            <h2>{currentAluno ? "Editar Aluno" : "Novo Aluno"}</h2>
            <button onClick={closeModal} style={{ marginBottom: "10px" }}>
              Fechar
            </button>
            <Form
              endpoint="/aluno"
              method={currentAluno ? "PUT" : "POST"}
              aluno={currentAluno}
            />
          </div>
        </div>
      )}

      {/* Modal para Batimentos */}
      {showBatimentoModal && (
        <div className="modal" style={modalStyles}>
          <div className="modal-content" style={modalContentStyles}>
            <h2>Batimentos do Aluno</h2>
            <button onClick={closeModal} style={{ marginBottom: "10px" }}>
              Fechar
            </button>
            <button onClick={toggleGraph} style={{ marginBottom: "10px" }}>
              {showGraph ? "Ocultar Gráfico" : "Mostrar Gráfico"}
            </button>
            {!showGraph && (
              <Table
                data={batimentos}
                columns={["bpm", "dataBatimento"]}
                actions={null}
              />
            )}
            {showGraph && (
              <Line
                data={batimentoGraphData}
                options={batimentoGraphOptions}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Alunos;

// Estilos simples para o modal
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

