import mongoose from "mongoose";

const atrativoSchema = new mongoose.Schema({
  destinoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destino'
  },
  nome: String,
  tipo: String,
  descricao: String,
  dicas: String
});

const Atrativo = mongoose.model('Atrativo', atrativoSchema);

module.exports = Atrativo;