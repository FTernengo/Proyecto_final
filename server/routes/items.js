// server/routes/items.js

const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Crear un elemento
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  try {
    const [result] = await pool.execute('INSERT INTO items (name, description) VALUES (?, ?)', [name, description]);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Leer todos los elementos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM items');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Leer un elemento por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute('SELECT * FROM items WHERE id = ?', [id]);
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: 'Elemento no encontrado' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Actualizar un elemento
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const [result] = await pool.execute('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id]);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Eliminar un elemento
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.execute('DELETE FROM items WHERE id = ?', [id]);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
