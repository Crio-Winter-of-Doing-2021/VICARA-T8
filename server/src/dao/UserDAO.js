const User = require('../models/User.js');
class UserDAO {
  constructor() {}

  async create(entity) {
    console.log(entity);
    return await User.create(entity);
  }

  async exists(email) {
    return await User.findOne({ email });
  }

  async update(id, entity) {
    const { password } = entity;

    return await User.findByIdAndUpdate(id, { password }, { new: true });
  }
}

module.exports = UserDAO;
