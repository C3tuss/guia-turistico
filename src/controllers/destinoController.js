import Destino, { DestinoModel } from '../models/Destino.js';

class DestinoController {
  static async listarDestinos(req, res) {
    try {
      const listaDestinos = await Destino.getAll();
      res.status(200).json(listaDestinos);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  }

  static async listarDestinoPorId(req, res) {
    try {
      const id = req.params.id;
      const destinoEncontrado = await Destino.getById(id);
      if (destinoEncontrado) {
        res.status(200).json(destinoEncontrado);
      } else {
        res.status(404).json({ message: 'Destino não encontrado' });
      }
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  }

  static async cadastrarDestino(req, res) {
    const { nome, descricao, imagem, localizacao } = req.body;

    if (!nome || !descricao || !imagem || !localizacao || !localizacao.lat || !localizacao.lng) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    try {
      const novoDestino = new Destino(nome, descricao, imagem, localizacao);
      await novoDestino.save();
      res.status(201).json({ message: "Destino criado com sucesso", destino: novoDestino });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha ao cadastrar destino` });
    }
  }

  static async atualizarDestino(req, res) {
    try {
      const id = req.params.id;
      const updatedDestino = await Destino.updateById(id, req.body);
      if (updatedDestino) {
        res.status(200).json({ message: "Destino atualizado", destino: updatedDestino });
      } else {
        res.status(404).json({ message: 'Destino não encontrado' });
      }
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na atualização` });
    }
  }

  static async excluirDestino(req, res) {
    try {
      const id = req.params.id;
      const deletedDestino = await Destino.deleteById(id);
      if (deletedDestino) {
        res.status(200).json({ message: "Destino deletado com sucesso" });
      } else {
        res.status(404).json({ message: 'Destino não encontrado' });
      }
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha ao deletar` });
    }
  }

  static async buscarDestinos(req, res) {
    try {
      const nome = req.query.nome;
      if (!nome) {
        return res.status(400).json({ message: 'Nome não fornecido' });
      }
  
      // Filtra destinos que contêm a palavra-chave no nome
      const destinos = await DestinoModel.find({
        nome: new RegExp(nome, 'i') // Pesquisa case-insensitive
      });
  
      console.log('Destinos encontrados:', destinos);
  
      res.status(200).json(destinos);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na busca de destinos` });
    }
  }
}

export default DestinoController;
