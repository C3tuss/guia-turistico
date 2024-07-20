import express from "express";
import AtrativoController from "../controllers/atrativosController.js"

const routes = express.Router();
routes.get('/api/atrativos/:destinoId', AtrativoController.listarAtrativosPorDestino);
routes.post('/api/atrativos', AtrativoController.cadastrarAtrativo);
routes.put('/api/atrativos/:id', AtrativoController.atualizarAtrativo);
routes.delete('/api/atrativos/:id', AtrativoController.excluirAtrativo);

export default routes;