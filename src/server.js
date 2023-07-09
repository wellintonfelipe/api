//importando o express do pacote
import pkg from "express-async-errors";
import express from "express";
import { routes } from "./routes/index.js";
import { AppError } from "./utils/AppError.js";
import { migrationsRun } from "./database/sqlite/migrations/index.js";
import { UPLOADS_FOLDER } from "./tmp/uploads/upload.js";
migrationsRun();

//chamando o api do express
const app = express();

//Em qual formato estamos usando no servidor
app.use(express.json());
//chamada para os aquivos de uploads
app.use("/files", express.static(UPLOADS_FOLDER));

//aplicação esta usando essa rota
app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "internal error server",
  });
});

//criando a porta
const PORT = 3333;

//listando a porta chamando a Api para a porta 3333
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
