const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const arquivoSchema = new Schema({
  projeto: {
    type: Schema.Types.ObjectId,
    ref: 'Projeto',
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  caminho: {
    type: String,
    required: true
  },
  conteudo: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: ['estatico', 'dinamico'],
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  pascalCase: {
    type: Boolean,
    default: false
  },
  nomeConcatenado: {
    type: Boolean,
    default: false
  },
  ordem: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('Arquivo', arquivoSchema);
