import React, { useState } from 'react';
import './CodeGenerator.css';

const CodeGenerator = () => {
  const [projetoId, setProjetoId] = useState('6754cd3f760eb6acd676c65e');
  const [nome, setNome] = useState('');
  const [prompt, setPrompt] = useState('');

  const [message, setMessage] = useState('');

  const handleGenerateCode = async () => {
    setMessage('Gerando código...');

    const response = await fetch('http://localhost:5000/api/generate-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projetoId, nome, prompt }),
    });

    const data = await response.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className="code-generator">
      <h2>Gerador de Código</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Nome do Projeto que será criado"
          value={projetoId}
          onChange={(e) => setProjetoId(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Nome do Projeto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Descrição dos campos e validações necessárias"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="form-control"
        />
      </div>
      <button onClick={handleGenerateCode} className="btn btn-primary">Gerar Código</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CodeGenerator;
