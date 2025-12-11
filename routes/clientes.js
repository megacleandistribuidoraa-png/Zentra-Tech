// routes/clientes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// listar
router.get('/', (req, res) => {
  db.query('SELECT * FROM clientes ORDER BY id DESC', (err, results) => {
    if(err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// buscar por id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM clientes WHERE id = ?', [id], (err, results) => {
    if(err) return res.status(500).json({ error: err.message });
    if(!results[0]) return res.status(404).json({ error: 'Cliente não encontrado' });
    res.json(results[0]);
  });
});

// criar
router.post('/', (req, res) => {
  const { nome, endereco, cpf_cnpj, data_nascimento } = req.body;
  if(!nome || !cpf_cnpj) return res.status(400).json({ error: 'Nome e CPF/CNPJ são obrigatórios' });
  db.query('INSERT INTO clientes (nome, endereco, cpf_cnpj, data_nascimento) VALUES (?, ?, ?, ?)',
    [nome, endereco || null, cpf_cnpj, data_nascimento || null], (err, result) => {
      if(err) return res.status(500).json({ error: err.message });
      db.query('SELECT * FROM clientes WHERE id = ?', [result.insertId], (err2, rows) => {
        if(err2) return res.status(500).json({ error: err2.message });
        res.status(201).json(rows[0]);
      });
  });
});

// atualizar
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { nome, endereco, cpf_cnpj, data_nascimento } = req.body;
  db.query('UPDATE clientes SET nome=?, endereco=?, cpf_cnpj=?, data_nascimento=? WHERE id=?',
    [nome, endereco || null, cpf_cnpj, data_nascimento || null, id], (err, result) => {
      if(err) return res.status(500).json({ error: err.message });
      res.json({ ok: true, message: 'Cliente atualizado' });
    });
});

// deletar
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM clientes WHERE id=?', [id], (err, result) => {
    if(err) return res.status(500).json({ error: err.message });
    res.json({ ok: true });
  });
});

module.exports = router;
