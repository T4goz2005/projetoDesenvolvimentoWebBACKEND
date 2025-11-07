// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db'); // Garante que a conexão seja feita
const pacientesRoutes = require('./routes/pacientes'); // Importa as rotas

const app = express();
const port = process.env.API_PORT || 3001;

// Configuração do CORS: Permite acesso do Frontend
app.use(cors({
    origin: process.env.REACT_APP_URL // Usa a URL do .env
}));

app.use(express.json()); // Middleware para ler JSON

// Rota de teste
app.get('/', (req, res) => {
    res.send('API do TCC OK!');
});

// Rota principal para Pacientes
// Qualquer chamada para http://localhost:3001/api/pacientes será tratada aqui
app.use('/api/pacientes', pacientesRoutes); 

app.listen(port, () => {
    console.log(`Servidor API rodando em http://localhost:${port}`);
});