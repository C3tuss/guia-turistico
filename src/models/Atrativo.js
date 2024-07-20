import mongoose from 'mongoose';

const atrativoSchema = new mongoose.Schema({
  destinoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destino',
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  dicas: {
    type: String,
    required: true
  }
});

const AtrativoModel = mongoose.model('Atrativo', atrativoSchema);

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

  static async updateById(id, updateData) {
    return await AtrativoModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  static async deleteById(id) {
    return await AtrativoModel.findByIdAndDelete(id);
  }
}

export default Atrativo;