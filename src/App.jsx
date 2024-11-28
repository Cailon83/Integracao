import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Alunos from "./pages/Alunos";
import Batimentos from "./pages/Batimentos";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alunos" element={<Alunos />} />
          <Route path="/batimentos" element={<Batimentos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
