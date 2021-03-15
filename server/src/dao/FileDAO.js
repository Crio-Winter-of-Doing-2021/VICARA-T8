const File = require('../models/File');

class FileDAO {
  async add(object) {
    try {
      return await File.create(object);
    } catch (err) {
      throw err;
    }
  }

  async delete(object) {
    try {
      return await File.deleteOne(object);
    } catch (err) {
      throw err;
    }
  }

  async getInfo(id) {
    try {
      return await File.findById(id);
    } catch (err) {
      throw err;
    }
  }

  async update(object) {
    try {
      // To Be Implemented
    } catch (err) {
      throw err;
    }
  }
}

module.exports = FileDAO;
