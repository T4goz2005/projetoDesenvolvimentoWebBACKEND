// routes/pacientes.js
const express = require('express');
const router = express.Router();
const db = require('../db'); 

// Rota GET: /api/pacientes/
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM pacientes ORDER BY nome ASC');
        return res.status(200).json(result.rows);
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao buscar pacientes.' });
    }
});

// Rota POST: /api/pacientes/ (Para cadastrar)
router.post('/', async (req, res) => {
    const { nome, idade, cpf } = req.body; 

    try {
        const text = 'INSERT INTO pacientes(nome, idade, cpf) VALUES($1, $2, $3) RETURNING *';
        const values = [nome, idade, cpf];

        const result = await db.query(text, values);
        return res.status(201).json(result.rows[0]);
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao cadastrar paciente.' });
    }
});

module.exports = router;