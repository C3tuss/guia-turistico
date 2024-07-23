import mongoose from 'mongoose';

const destinoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  imagem: {
    type: String,
    required: true
  },
  localizacao: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  }
});

const DestinoModel = mongoose.model('Destino', destinoSchema);

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

  static async updateById(id, updateData) {
    return await DestinoModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  static async deleteById(id) {
    return await DestinoModel.findByIdAndDelete(id);
  }
}

export { destinoSchema, DestinoModel };
export default Destino;
