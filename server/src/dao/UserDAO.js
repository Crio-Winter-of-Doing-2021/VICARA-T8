const User = require('../models/User.js');
class UserDAO {
  constructor() {}

  async create(entity) {
    return await User.create(entity);
  }

  async exists(email) {
    return await User.findOne({ email });
  }
}

module.exports = UserDAO;
