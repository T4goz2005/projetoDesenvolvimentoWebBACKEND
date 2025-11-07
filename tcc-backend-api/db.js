// db.js
const { Pool } = require('pg');
require('dotenv').config(); 

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Função para testar a conexão quando a API inicia
pool.connect((err, client, done) => {
    if (err) {
        console.error('❌ Erro ao conectar com o banco de dados:', err.stack);
        return;
    }
    console.log('✅ Conexão bem-sucedida com o PostgreSQL!');
    done();
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
};