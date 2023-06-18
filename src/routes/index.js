import { Router } from "express";

import { usersRoutes } from "./users.routes.js";
import { notesRoutes } from "./notes.routes.js";
import { tagsRoutes } from "./tags.routes.js";
import { sessionRoutes } from "./sessions.routes.js";

export const routes = Router();

/**
 * @rota_de_usuários
 */
routes.use("/users", usersRoutes);

/**
 * @rota_de_notas
 */

routes.use("/notes", notesRoutes);

/**
 * @rota_de_tags
 */
routes.use("/tags", tagsRoutes);

/**
 * @rota_de_session
 */
routes.use("/session", sessionRoutes);
