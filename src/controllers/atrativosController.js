import Atrativo from "../models/Atrativo.js";

exports.getAtrativosByDestino = async (req, res) => {
    try {
      const atrativos = await Atrativo.getByDestinoId(req.params.destinoId);
      res.json(atrativos);
    } catch (err) {
      res.status(500).send(err);
    }
  };
  
  exports.createAtrativo = async (req, res) => {
    try {
      const { destinoId, nome, tipo, descricao, dicas } = req.body;
      const atrativo = new Atrativo(destinoId, nome, tipo, descricao, dicas);
      const savedAtrativo = await atrativo.save();
      res.json(savedAtrativo);
    } catch (err) {
      res.status(500).send(err);
    }
  };
