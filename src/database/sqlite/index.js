import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { resolve } from "node:path";

/**
 * Para acessar o banco de dados
 * precisa de um gerenciador de banco de dados
 * SGBD - SISTEMA GERENCIADOR DE BANCO DE DADOS
 */

export async function connection() {
  const database = await open({
    filename: resolve("src/database", "", "database.db"),
    driver: sqlite3.Database,
  });

  return database;
}
