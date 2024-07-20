import mongoose from "mongoose";
import {destinoSchema} from "./Destino.js";

const atrativoSchema = new mongoose.Schema({
  destinoId: {
    type: destinoSchema
  },
  nome: String,
  tipo: String,
  descricao: String,
  dicas: String
});

class Atrativo {
  constructor(destinoId, nome, tipo, descricao, dicas) {
    this.destinoId = destinoId;
    this.nome = nome;
    this.tipo = tipo;
    this.descricao = descricao;
    this.dicas = dicas;
  }

  static async getByDestinoId(destinoId) {
    return await AtrativoModel.find({ destinoId });
  }

  async save() {
    const atrativo = new AtrativoModel(this);
    return await atrativo.save();
  }
}

const Atrativo = mongoose.model('Atrativo', atrativoSchema);

module.exports = Atrativo;