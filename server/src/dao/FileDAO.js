class FileDAO {
  constructor(File) {
    this.file = File;
  }
  //@desc Create
  async add(object) {
    try {
      return await this.file.create(object);
    } catch (err) {
      throw err;
    }
  }
  //@desc Delete
  async delete(userId, fileId) {
    try {
      return await this.file.deleteOne({
        'metadata.ownerId': userId,
        'metadata.fileId': fileId,
      });
    } catch (err) {
      throw err;
    }
  }
  //@desc Info
  async getInfo(userId, fileId) {
    try {
      const val = await this.file.findOne({
        'metadata.ownerId': userId,
        'metadata.fileId': fileId,
      });
      return val;
    } catch (err) {
      throw err;
    }
  }
  //@desc Filter
  async getList(match, sort, limit) {
    try {
      return await this.file.find(match).sort(sort).limit(limit);
    } catch (err) {
      throw err;
    }
  }
  ////@desc Update
  async update(object) {
    try {
      // To Be Implemented
    } catch (err) {
      throw err;
    }
  }
}

module.exports = FileDAO;
