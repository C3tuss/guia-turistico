import "dotenv/config";
import app from "./src/app.js";

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Servidor esta rodando na porta 3000.");
    console.log("Acesse aqui http://localhost:3000/");
});