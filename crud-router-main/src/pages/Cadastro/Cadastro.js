import React, { useState }  from "react";
import "./Cadastro.css";

function Cadastro({contacts, setContacts}){
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = (e) => { // Função para salvar um novo contato
    e.preventDefault(); // Evita que o formulário recarregue a página ao enviar
    const newContact = {id: Date.now(), name, phone} // Cria um novo contato com id único, nome e telefone atuais
    // Adiciona o novo contato à lista existente
    setContacts([...contacts, newContact]);
    // Limpa os campos de nome e telefone para entrada de novos dados
    setName("");
    setPhone("");
}

    return(
        <div className="cadastro-container">
            <h2>Cadastrar Contato</h2>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />

                <input
                type="text"
                placeholder="Telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                />

                <button type="submit">Salvar</button>
            </form>
        </div>
    )
}
export default Cadastro;