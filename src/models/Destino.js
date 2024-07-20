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

class Destino {
  constructor(nome, descricao, imagem, localizacao) {
    this.nome = nome;
    this.descricao = descricao;
    this.imagem = imagem;
    this.localizacao = localizacao;
  }

  static async getAll() {
    return await DestinoModel.find();
  }

  static async getById(id) {
    return await DestinoModel.findById(id);
  }

  async save() {
    const destino = new DestinoModel(this);
    return await destino.save();
  }
}


const Destino = mongoose.model('Destino', destinoSchema);

module.exports = {Destino, destinoSchema};


