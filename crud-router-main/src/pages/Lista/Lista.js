import React, { useState } from "react";
import "./Lista.css";

function Lista({ contacts, setContacts }) {
  // Inicializando contatos, edição vazios e telefone
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const handleSave = (id) => {
    // Salvando no id
    // Varre todos os elementos do contacts
    setContacts(
      // Faz uma "lista/array", atualizando assim a lista de contatos
      contacts.map((c) =>
        c.id === id ? { ...c, name: newName, phone: newPhone } : c
      )
    );
    setEditingId(null);
  };

  const handleEdit = (contact) => {
    // Mudando as variáveis de estado
    // ID, Nome, Telefone
    // Ao modificar o ID, o return percebe e ordena atualização do mapeamento da Lista, permitindo processos de alteração
    setEditingId(contact.id);
    setNewName(contact.name);
    setNewPhone(contact.phone);
  };

  const handleDelete = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  return (
    <div className="lista-container">
      <h2>Lista de Contatos</h2>
      {contacts.length === 0 ? (
        <p>Nenhum contato cadastrado</p>
      ) : (
        // SENÃO
        // Função de apresentação de Lista
        <ul>
          {/* Mapeia os elementos cadastrados, verificando e definindo uma chave;
           Se o editingID for igual ao contact.id, ele já vai renderizar os campos de input, assim carregando o novo nome e telefone
           Caso não seja igual, executa um 'span' mostrando o nome, telefone e então apresenta o botão de editar ou deletar */}
          {contacts.map((contact) => (
            <li key={contact.id} className="contact-item">
              {editingId === contact.id ? (
                <>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />

                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                  />

                  <button onClick={() => handleSave(contact.id)}>Salvar</button>
                </>
              ) : (
                <>
                  <span>
                    {contact.name} - {contact.phone}
                  </span>
                  <button onClick={() => handleEdit(contact)}>
                    Editar Contato
                  </button>
                  <button onClick={() => handleDelete(contact.id)}>
                    Excluir Contato
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default Lista;
