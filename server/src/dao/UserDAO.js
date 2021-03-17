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
      let status = false;
      const userobject = await this.user.findById(id);

      let newsize;
      let limit = userobject.storage.limit;
      switch (operation) {
        case 'add':
          newsize = parseInt(userobject.storage.size) + size;
          if (limit > newsize) {
            let success = await this.user.findByIdAndUpdate(
              id,
              { 'storage.size': newsize },
              { new: true }
            );

            if (success) status = true;
          }
          break;
        case 'substract':
          newsize = parseInt(userobject.size) - size;
          let success = await this.user.findByIdAndUpdate(
            id,
            { 'storage.size': newsize },
            { new: true }
          );
          if (success) status = true;
          break;
      }
      return status;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserDAO;
