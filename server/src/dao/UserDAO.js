class UserDAO {
  constructor(User) {
    this.user = User;
  }

  //@desc Create a new User
  async create(entity) {
    return await this.user.create(entity);
  }

  //@desc Check an existing User
  async exists(email) {
    return await this.user.findOne({ email });
  }

  //@desc Update an existing User (only password rightnow)
  async update(id, entity) {
    const { password } = entity;

    return await this.user.findByIdAndUpdate(id, { password }, { new: true });
  }

  async UpdateStorage(id, size, operation) {
    try {
      const status = false;
      const user = await this.user.findById(id);
      let newsize;
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
          const user = await this.user.findByIdAndUpdate(
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
