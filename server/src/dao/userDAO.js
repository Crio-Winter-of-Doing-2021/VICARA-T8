import User from "../models/User.js";
class userDAO {
  constructor() {
    console.log("yolo");
  }

  async create(entity) {
    return await User.create(entity);
  }

  async exists(email) {
    return await User.findOne({ email });
  }
}

module.exports = new userDAO();
