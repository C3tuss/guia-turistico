import mongoose from "mongoose";

const destinoSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  imagem: String,
  localizacao: {
    lat: Number,
    lng: Number
  }
});

const Destino = mongoose.model('Destino', destinoSchema);

module.exports = Destino;


