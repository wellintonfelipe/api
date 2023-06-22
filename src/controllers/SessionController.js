import { configKnexConnection as knex } from "../database/knex/index.js";
import { AppError } from "../utils/AppError.js";
import { authConfig } from "../config/auth.js";
import { compare } from "bcrypt";
import pkg from "jsonwebtoken";

const { sign } = pkg;

export class SessionController {
  async create(request, response) {
    const { email, password } = request.body;
    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("E-mail e/ou senha incorretos", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorretos", 401);
    }

    const { expiresIn, secret } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });
    return response.json({ user, token });
  }
}
