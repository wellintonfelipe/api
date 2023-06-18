import { knexConfig } from "../../../knexfile.js";
import knex from "knex";

export const configKnexConnection = knex(knexConfig.development);
