import React from 'react';

const Contato = () => {
  return (
    <div style={{ padding: '20px', lineHeight: '1.6', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#4CAF50' }}>Contato</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>
          <strong>Cailon Sérgio</strong> - 
          <a href="mailto:cailon.fonseca@aluno.ifsp.edu.br" style={{ textDecoration: 'none', color: '#000' }}>
            cailon.fonseca@aluno.ifsp.edu.br
          </a>
        </li>
        <li>
          <strong>Isabely Rocha</strong> - 
          <a href="mailto:isabely.o@aluno.ifsp.edu.br" style={{ textDecoration: 'none', color: '#000' }}>
            isabely.o@aluno.ifsp.edu.br
          </a>
        </li>
        <li>
          <strong>Mariana Rezende</strong> - 
          <a href="mailto:godoi.m@aluno.ifsp.edu.br" style={{ textDecoration: 'none', color: '#000' }}>
            godoi.m@aluno.ifsp.edu.br
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Contato;

