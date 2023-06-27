import { Router } from "express";
import { NotesController } from "../controllers/NotesController.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";
export const notesRoutes = Router();

// teste middleware
// function myMiddleware(request, response, next) {
//   console.log("você passou pelo Middleware");

//   if (!request.body.isAdmin) {
//     return response.status(401).json({ message: "user unauthorized" });
//   }
//   next();
// }

const notesController = new NotesController();

//middlewares de autenticação
notesRoutes.use(ensureAuthenticated);

//chamando o controller
notesRoutes.post("/", notesController.create);
notesRoutes.get("/", notesController.show);
notesRoutes.delete("/", notesController.delete);
notesRoutes.get("/", notesController.index);

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

// notesRoutes.put("/:id", notesController.update);
