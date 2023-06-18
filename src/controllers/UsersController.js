import { hash, compare } from "bcrypt";
import { connection } from "../database/sqlite/index.js";
import { AppError } from "../utils/AppError.js";

export class UsersController {
  /**
   * index - Get para listar vários registros
   * show - GET para existe um registro especifico
   * create - POST para criar um registro.
   * update - PUT para atualizar um registro.
   * delete - DELETE para remover um registro.
   *
   * -----------------------------------------
   * As classes podem haver um método ou mais(até 5), pelo padrão adotado.
   * Se hover um sexto método, é instruído para criar uma classe a parte
   */

  //envia para as rotas no arquivo index.js na pasta routes
  async create(request, response) {
    const { name, email, password } = request.body;
    const database = await connection();
    const checkUserExist = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (checkUserExist) {
      throw new AppError("Este e-mail já existe!");
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );
    response.status(201).json({
      message: "Usuário cadastrado com sucesso",
    });
  }

  async update(request, response) {
    const { email, name, password, old_password } = request.body;
    const { id } = request.params;

    const database = await connection();

    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    const userWithUpdatedEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso.");
    }

    if (password && !old_password) {
      throw new AppError(
        "Você precisa informar a senha antiga para definir a nova senha"
      );
    }
    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere");
      }
      user.password = await hash(password, 8);
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    const query = `UPDATE users SET name = ?, email = ?, password = ?, updated_at = DATETIME('now') WHERE id = ?
    `;

    await database.run(query, [user.name, user.email, user.password, id]);

    return response.status(200).json({ message: `user update success` });
  }
}
