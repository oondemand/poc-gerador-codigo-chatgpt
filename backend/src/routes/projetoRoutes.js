const express = require('express');
const router = express.Router();
const Projeto = require("../models/Projeto")

router.post('/', async (req, res) => {
  try {
    const novoProjeto = new Projeto(req.body);
    const projetoSalvo = await novoProjeto.save();
    res.status(201).json(projetoSalvo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all Projetos
router.get('/', async (req, res) => {
  try {
    const projetos = await Projeto.find();
    res.status(200).json(projetos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read a single Projeto by ID
router.get('/:id', async (req, res) => {
  try {
    const projeto = await Projeto.findById(req.params.id);
    if (!projeto) {
      return res.status(404).json({ error: 'Projeto not found' });
    }
    res.status(200).json(projeto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a Projeto by ID
router.put('/:id', async (req, res) => {
  try {
    const projetoAtualizado = await Projeto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!projetoAtualizado) {
      return res.status(404).json({ error: 'Projeto not found' });
    }
    res.status(200).json(projetoAtualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a Projeto by ID
router.delete('/:id', async (req, res) => {
  try {
    const projetoDeletado = await Projeto.findByIdAndDelete(req.params.id);
    if (!projetoDeletado) {
      return res.status(404).json({ error: 'Projeto not found' });
    }
    res.status(200).json({ message: 'Projeto deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router