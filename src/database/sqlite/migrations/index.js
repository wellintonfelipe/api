import { createUsers } from "./createUsers.js";
import { connection } from "../index.js";

export async function migrationsRun() {
  const schemas = [createUsers].join(" ");

  connection()
    .then((db) => db.exec(schemas))
    .catch((error) => console.error(error));
}
