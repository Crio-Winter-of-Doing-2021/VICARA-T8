const File = require('../models/File');

class FileDAO {
  async add(object) {
    try {
      return await File.create(object);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = FileDAO;
