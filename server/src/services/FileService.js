const parseStreamData = require('../utils/parseStreamData');
const uuid = require('uuid');
const createError = require('http-errors');
const { fileFavouiteSchema } = require('../utils/validator');

//TODO Encryption and Zipping
class FileService {
  constructor(S3DAO, UserDAO, FileDAO) {
    this.s3DAO = S3DAO;
    this.userDAO = UserDAO;
    this.fileDAO = FileDAO;
  }
  // desc Upload with streams
  upload = async (userId, busboy) => {
    try {
      const { file, filename, formData, mimetype } = await parseStreamData(
        busboy
      );
      const size = parseInt(formData.get('size'));
      const S3ID = uuid.v4();
      const updateStorageStatus = await this.userDAO.UpdateStorage(
        userId,
        size,
        'add'
      );
      if (!updateStorageStatus)
        throw createError.NotAcceptable('Storage Limit Exceed');

      let metadata = {
        ownerId: userId,
        size: size.toString(),
        mimetype,
        fileId: S3ID,
      };

      const params = {
        Key: S3ID,
        Body: file,
        Bucket: process.env.BUCKET_NAME,
        Metadata: metadata,
      };
      const status = await this.s3DAO.upload(params);
      if (!status) throw createError.InternalServerError();
      const object = {
        name: filename,
        metadata,
      };

      const updateFileStatus = await this.fileDAO.add(object);
      if (!updateFileStatus) throw createError.InternalServerError();

      return { status: 'success', data: updateFileStatus };
    } catch (err) {
      throw err;
    }
  };
  // desc Downloading with streams
  download = async (userId, fileId) => {
    try {
      const exist = await this.fileDAO.getInfo(userId, fileId);
      if (!exist) throw createError.NotFound('File Not Found');

      const params = {
        Key: fileId,
        Bucket: process.env.BUCKET_NAME,
      };
      const stream = await this.s3DAO.download(params);

      return { filename: exist.name, metadata: exist.metadata, stream };
    } catch (err) {
      throw err;
    }
  };
  //@desc Add to Favourites
  favourites = async (userId, fileId, isFavourite) => {
    try {
      const validate = await fileFavouiteSchema.validateAsync(
        { isFavourite },
        {
          abortEarly: false,
        }
      );

      const exist = await this.fileDAO.getInfo(userId, fileId);
      if (!exist) throw createError.NotFound('File Not Found');

      const updated = await this.fileDAO.favourites(
        userId,
        fileId,
        isFavourite
      );
      if (!updated)
        throw createError.NotAcceptable('Cannot be add to favouites');

      return { status: 'success', data: updated };
    } catch (err) {
      throw err;
    }
  };

  //@desc File Delete Service
  delete = async (userId, fileId) => {
    try {
      const exist = await this.fileDAO.getInfo(userId, fileId);
      if (!exist) throw createError.NotFound('File Not Found');

      const status = await this.s3DAO.delete(params);
      if (!status) throw createError.InternalServerError();

      const deleted = await this.fileDAO.delete(userId, fileId);
      if (!deleted) throw createError.NotAcceptable('Cannot be Deleted');
      const params = {
        Key: fileId,
        Bucket: process.env.BUCKET_NAME,
      };

      return { status: 'success' };
    } catch (err) {
      throw err;
    }
  };

  //@desc File Info
  getInfo = async (userId, fileId) => {
    try {
      const data = await this.fileDAO.getInfo(userId, fileId);
      if (!data) throw createError.NotFound('File Not Found');
      return data;
    } catch (err) {
      throw err;
    }
  };

  //@desc File List Query/Filter/Sorting
  getList = async (userId, query) => {
    try {
      let match = { 'metadata.ownerId': userId };

      if (query.fav) match.isFavourite = query.fav;
      let page = parseInt(query.page || 1);
      let limit = parseInt(query.limit) || 20;
      let sort = {};
      sort.name = query.sortByName && query.sortByName === 'desc' ? -1 : 1;
      //sort.createdAt = query.sortByDate && query.sortByDate === 'desc' ? -1 : 1;

      if (query.s) {
        match.name = { $regex: query.s, $options: 'i' };
        sort = {};
      }
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const results = {};
      results.hasPrevious = false;
      results.hasNext = false;
      const DOCS = await this.fileDAO.getList(match, sort);
      const count = DOCS.length;
      const data = DOCS.slice(startIndex, endIndex);
      results.total = count;
      if (startIndex > 0) {
        results.hasPrevious = true;
        results.previousPage = page - 1;
      }
      if (endIndex < count) {
        results.hasNext = true;
        results.nextPage = page + 1;
      }

      console.log(match, sort, limit);

      return { data, results };
    } catch (err) {
      throw err;
    }
  };
  //@desc Get The Public Linl
  getPublicLink = async (userId, fileId) => {
    try {
      const exist = await this.fileDAO.getInfo(userId, fileId);
      if (!exist) throw createError.NotFound('File Not Found');
      const param = {
        Key: fileId,
        Bucket: process.env.BUCKET_NAME,
      };
      const url = await this.s3DAO.getPublicLink(param);
      if (!url) throw createError.Forbidden();
      return { success: 'true', url: url };
    } catch (err) {
      throw err;
    }
  };
}

module.exports = FileService;
