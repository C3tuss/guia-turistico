import express from "express";
import path from 'path';
import bodyParser from "body-parser";
import cors from "cors"; // Adiciona o import do cors
import { fileURLToPath } from "url";
import conectaNaDatabase from "./configs/dbConnection.js";
import routes from "./routes/index.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());

// Configura o CORS
const corsOptions = {
  origin: '*', // Permite todas as origens. Substitua por uma URL específica para restringir o acesso.
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const conexao = await conectaNaDatabase();

conexao.on("error", (erro) => {
  console.error("erro de conexão", erro);
});

conexao.once("open", () => {
  console.log("Conexao com o banco feita com sucesso");
});

routes(app);

export default app;
