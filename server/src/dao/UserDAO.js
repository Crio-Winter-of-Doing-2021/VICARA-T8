const User = require('../models/User.js');
class UserDAO {
  constructor() {}

  //@desc Create a new User
  async create(entity) {
    console.log(entity);
    return await User.create(entity);
  }

  //@desc Check an existing User
  async exists(email) {
    return await User.findOne({ email });
  }

  //@desc Update an existing User (only password rightnow)
  async update(id, entity) {
    const { password } = entity;

    return await User.findByIdAndUpdate(id, { password }, { new: true });
  }
}

module.exports = UserDAO;
