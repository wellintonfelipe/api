import { configKnexConnection as knex } from "../database/knex/index.js";

export class TagsController {
  async index(request, response) {
    const { user_id } = request.params;

    const tags = await knex("tags").where({ user_id });

    return response.json(tags);
  }
}
