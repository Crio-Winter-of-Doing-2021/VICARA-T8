import logger from "../utils/logger.js";
import { authSchema } from "../utils/validator.js";
import userDAO from "../dao/userDAO";
class UserService extends Error {
  constructor() {
    super();
    console.log("yolo2");
  }

  async create(userData) {
    const entity = await authSchema.validateAsync(userData, {
      abortEarly: false,
    });

    const doesExist = await userDAO.exists(entity.email);

    if (doesExist) {
      //TODO: Error Handler
      throw new Error("NOT FOUND");
    }

    return await userDAO.create(entity);
  }
}

module.exports = new UserService();
