import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "./App.css";

// Importando Home
import Home from "./pages/Home/Home";

// Importando Páginas
import Login from "./pages/Login/Login";

// Importando NavBar - Main Menu
import NavBar from './components/NavBar/NavBar';

// Importando Lista
import Lista from './pages/Lista/Lista';

// Importando Cadastro
import Cadastro from './pages/Cadastro/Cadastro';

function App() {
  // Estado Global simplificado de login e Contatos
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contacts, setContacts] = useState([]);

  // FUNÇÕES FETCH API

  const API_URL = "http://localhost:3000/contacts"; // Endpoint local JSON Server

  // GET - Buscar todos os contatos
  const fetchContacts = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Erro ao buscar contatos");
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Erro (GET):", error);
    }
  };

  // POST - Adicionar novo contato
  const addContact = async (newContact) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact),
      });
      if (!response.ok) throw new Error("Erro ao adicionar contato");
      const data = await response.json();
      setContacts((prev) => [...prev, data]);
    } catch (error) {
      console.error("Erro (POST):", error);
    }
  };

  // PUT - Atualizar contato existente
  const updateContact = async (id, updatedContact) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContact),
      });
      if (!response.ok) throw new Error("Erro ao atualizar contato");
      const data = await response.json();
      setContacts((prev) =>
        prev.map((contact) => (contact.id === id ? data : contact))
      );
    } catch (error) {
      console.error("Erro (PUT):", error);
    }
  };

  // DELETE - Remover contato
  const deleteContact = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erro ao deletar contato");
      setContacts((prev) => prev.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error("Erro (DELETE):", error);
    }
  };

  // LOGIN / LOGOUT
  const handleLogin = (username, password) => {
    if (username === "admin" && password === "123") {
      setIsAuthenticated(true);
      fetchContacts(); // Carrega contatos ao logar
    } else {
      alert("Usuário ou senha inválidos!");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // ROTAS
  return (
    <Router>
      {isAuthenticated && <NavBar onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/Login"
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/Login" />}
        />

        <Route
          path="/cadastro"
          element={
            isAuthenticated ? (
              <Cadastro
                contacts={contacts}
                setContacts={setContacts}
                addContact={addContact}
              />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />

        <Route
          path="/lista"
          element={
            isAuthenticated ? (
              <Lista
                contacts={contacts}
                setContacts={setContacts}
                deleteContact={deleteContact}
                updateContact={updateContact}
              />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />

        <Route path="*" element={<Navigate to="/Login" />} />
      </Routes>
    </Router>
  );
}

export default App;
