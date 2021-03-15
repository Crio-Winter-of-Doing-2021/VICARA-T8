const User = require('../models/User.js');
class UserDAO {
  constructor() {}

  //@desc Create a new User
  async create(entity) {
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

  async UpdateStorage(id, size, operation) {
    try {
      const status = false;
      const user = await User.findById(id);
      const newsize;
      switch (operation) {
        case 'add':
          newsize = user.size - size;
          if (newsize > 0) {
            const user = await User.findByIdAndUpdate(
              id,
              { size: newsize },
              { new: true }
            );
            if (user) status = true;
          }
          break;
        case 'substract':
          newsize = user.size + size;
          const user = await User.findByIdAndUpdate(
            id,
            { size: newsize },
            { new: true }
          );
          if (user) status = true;

          break;
      }
      return status;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserDAO;
