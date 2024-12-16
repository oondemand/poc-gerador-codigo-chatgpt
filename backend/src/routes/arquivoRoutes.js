const express = require('express');
const router = express.Router();
const  Arquivo  = require("../models/Arquivo")

// Create a new Arquivo
router.post('/', async (req, res) => {
  try {
    const novoArquivo = new Arquivo(req.body);
    const arquivoSalvo = await novoArquivo.save();
    res.status(201).json(arquivoSalvo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all Arquivos
router.get('/', async (req, res) => {
  try {
    const arquivos = await Arquivo.find().populate('projeto');
    res.status(200).json(arquivos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read a single Arquivo by ID
router.get('/:id', async (req, res) => {
  try {
    const arquivo = await Arquivo.findById(req.params.id).populate('projeto');
    if (!arquivo) {
      return res.status(404).json({ error: 'Arquivo not found' });
    }
    res.status(200).json(arquivo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an Arquivo by ID
router.put('/:id', async (req, res) => {
  try {
    const arquivoAtualizado = await Arquivo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!arquivoAtualizado) {
      return res.status(404).json({ error: 'Arquivo not found' });
    }
    res.status(200).json(arquivoAtualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an Arquivo by ID
router.delete('/:id', async (req, res) => {
  try {
    const arquivoDeletado = await Arquivo.findByIdAndDelete(req.params.id);
    if (!arquivoDeletado) {
      return res.status(404).json({ error: 'Arquivo not found' });
    }
    res.status(200).json({ message: 'Arquivo deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router