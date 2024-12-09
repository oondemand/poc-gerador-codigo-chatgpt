const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projetoSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['ativo', 'inativo']
  },
  prompt: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Projeto', projetoSchema);
