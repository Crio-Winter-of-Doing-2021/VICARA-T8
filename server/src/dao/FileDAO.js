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

  async getInfo(userId, fileId) {
    try {
      const val = await File.findOne({
        'metadata.ownerId': userId,
        'metadata.fileId': fileId,
      });
      return val;
    } catch (err) {
      throw err;
    }
  }

  async getList(match, sort, limit) {
    try {
      return await (await File.find(match).sort(sort)).limit(limit);
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
