import { Router } from "express";
import { UsersController } from "../controllers/UsersController.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

export const usersRoutes = Router();

// teste middleware
// function myMiddleware(request, response, next) {
//   console.log("você passou pelo Middleware");

//   if (!request.body.isAdmin) {
//     return response.status(401).json({ message: "user unauthorized" });
//   }
//   next();
// }

const usersController = new UsersController();

//chamando o controller
usersRoutes.post("/", usersController.create);

//Método de busca -> GET
/*


app.get("/message/:id", (req, res) => {
  const { id, name, address } = req.params;
  res.send(`Id da message: ${id}`);
});

app.get("/users", (req, res) => {
  const { page, limit } = req.query;

  res.send(`Página: ${page}. Mostrar: ${limit}`);
});

*/

usersRoutes.put("/", ensureAuthenticated, usersController.update);
