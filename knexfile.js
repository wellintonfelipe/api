import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

export const knexConfig = {
  development: {
    client: "sqlite3",
    connection: {
      filename: resolve(__dirname, "src", "database", "database.db"),
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb),
    },
    migrations: {
      directory: resolve(__dirname, "src", "database", "knex", "migrations"),
    },
    useNullAsDefault: true,
  },
};
