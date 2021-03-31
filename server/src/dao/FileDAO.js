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
  //@desc Add to Favouites
  async favourites(userId, fileId, isFavourite) {
    try {
      return await this.file.updateOne(
        {
          'metadata.ownerId': userId,
          'metadata.fileId': fileId,
        },
        { isFavourite: isFavourite }
      );
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
  async getList(match, sort, limit, startIndex) {
    try {
      return await this.file.find(match).collation({ locale: 'en' }).sort(sort);
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

  async getCount(match) {
    try {
      return await this.file.countDocuments();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = FileDAO;
