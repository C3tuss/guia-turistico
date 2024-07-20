import express from "express";
import DestinoController from "../controllers/destinoController.js";

const routes = express.Router();

routes.get('/api/destinos', DestinoController.listarDestinos);
routes.get('/api/destinos/:id', DestinoController.listarDestinoPorId);
routes.post('/api/destinos', DestinoController.cadastrarDestino);
routes.put('/api/destinos/:id', DestinoController.atualizarDestino);
routes.delete('/api/destinos/:id', DestinoController.excluirDestino);

export default routes;
