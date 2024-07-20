import Atrativo from '../models/Atrativo.js';

class AtrativoController {
  static async listarAtrativosPorDestino(req, res) {
    try {
      const destinoId = req.params.destinoId;
      const atrativos = await Atrativo.getByDestinoId(destinoId);
      res.status(200).json(atrativos);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  }

  static async cadastrarAtrativo(req, res) {
    const { destinoId, nome, tipo, descricao, dicas } = req.body;

    if (!destinoId || !nome || !tipo || !descricao || !dicas) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    try {
      const novoAtrativo = new Atrativo(destinoId, nome, tipo, descricao, dicas);
      await novoAtrativo.save();
      res.status(201).json({ message: "Atrativo criado com sucesso", atrativo: novoAtrativo });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha ao cadastrar atrativo` });
    }
  }

  static async atualizarAtrativo(req, res) {
    try {
      const id = req.params.id;
      const updatedAtrativo = await Atrativo.updateById(id, req.body);
      res.status(200).json({ message: "Atrativo atualizado", atrativo: updatedAtrativo });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na atualização` });
    }
  }

  static async excluirAtrativo(req, res) {
    try {
      const id = req.params.id;
      await Atrativo.deleteById(id);
      res.status(200).json({ message: "Atrativo deletado com sucesso" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha ao deletar` });
    }
  }
}

export default AtrativoController;
