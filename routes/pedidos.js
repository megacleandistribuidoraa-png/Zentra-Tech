// routes/pedidos.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// listar pedidos (opcional query cliente_id)
router.get('/', (req, res) => {
  const clienteId = req.query.cliente_id;
  let sql = 'SELECT p.*, c.nome as cliente_nome FROM pedidos p JOIN clientes c ON p.cliente_id=c.id';
  const params = [];
  if(clienteId){
    sql += ' WHERE p.cliente_id = ?';
    params.push(clienteId);
  }
  sql += ' ORDER BY p.id DESC';
  db.query(sql, params, (err, rows) => {
    if(err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// detalhe do pedido
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM pedidos WHERE id=?', [id], (err, rows) => {
    if(err) return res.status(500).json({ error: err.message });
    if(!rows[0]) return res.status(404).json({ error: 'Pedido não encontrado' });
    const pedido = rows[0];
    db.query('SELECT pi.*, pr.nome FROM pedido_itens pi JOIN produtos pr ON pi.produto_id=pr.id WHERE pi.pedido_id=?', [id], (err2, itens) => {
      if(err2) return res.status(500).json({ error: err2.message });
      res.json({ pedido, itens });
    });
  });
});

module.exports = router;
