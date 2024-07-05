import "./App.css";
import { useState } from "react";
import logo from "./logo.png";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      setIsLoading(true); // Inicia o carregamento
      try {
        const res = await fetch("URL_DO_SEU_BACKEND", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description: inputValue }),
        });
        const data = await res.json();
        setResponse(data);
      } catch (error) {
        console.error("Erro ao fazer a requisição:", error);
      } finally {
        setIsLoading(false); // Finaliza o carregamento
      }
    }
  };

  const renderResponse = (data) => {
    if (!data || data.length === 0) {
      return (
        <p>Nenhuma recomendação encontrada. Tente descrever de outra forma.</p>
      );
    }

    return (
      <div>
        <h3>Recomendações:</h3>
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <strong>Prato:</strong> {item.dishName} <br />
              <strong>Descrição:</strong> {item.description}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="container">
      <img
        src={logo}
        alt="Logo"
        style={{ marginRight: "auto", maxWidth: "75px", borderRadius: "8px" }}
      />
      <h1 className="title">Recomendador de pratos</h1>
      <p className="subtitle">
        Descreva seu momento e receba recomendações de pratos.
      </p>

      <label className="label" htmlFor="descriptionInput">
        Descreva seu momento:
      </label>
      <input
        id="descriptionInput"
        type="text"
        className="inputField"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Descreva seu momento aqui"
      />
      {isLoading ? <p>Carregando...</p> : response && renderResponse(response)}
    </div>
  );
}

export default App;
