import Destino from "../models/Destino.js";

exports.getDestinos = async (req, res) => {
  try {
    const destinos = await Destino.getAll();
    res.json(destinos);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getDestinoById = async (req, res) => {
  try {
    const destino = await Destino.getById(req.params.id);
    res.json(destino);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createDestino = async (req, res) => {
  try {
    const { nome, descricao, imagem, localizacao } = req.body;
    const destino = new Destino(nome, descricao, imagem, localizacao);
    const savedDestino = await destino.save();
    res.json(savedDestino);
  } catch (err) {
    res.status(500).send(err);
  }
};