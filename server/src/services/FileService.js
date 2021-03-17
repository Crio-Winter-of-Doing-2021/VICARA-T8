const S3DAO = require('../dao/S3DAO');
const FileDAO = require('../dao/FileDAO');
const UserDAO = require('../dao/UserDAO');
const User = require('../models/User');
const parseStreamData = require('../utils/parseStreamData');
const { encryptStream } = require('../utils/encryption');
const uuid = require('uuid');
const createError = require('http-errors');

//TODO Encryption and Zipping
class FileService {
  constructor() {
    this.s3DAO = new S3DAO();
    this.fileDAO = new FileDAO();
    this.userDAO = new UserDAO(User);
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

      // Update in File DB
      const object = {
        name: filename,
        metadata,
      };

      const updateFileStatus = await this.fileDAO.add(object);
      if (!updateFileStatus) throw createError.InternalServerError();
      // TODO Update Size of File
      //upar daldo

      return { status: 'success' };
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

  delete = async (userId, fileId) => {
    try {
      const exist = await this.fileDAO.getInfo(userId, fileId);
      if (!exist) throw createError.NotFound('File Not Found');

      const deleted = await this.fileDAO.delete(userId, fileId);
      if (!deleted) throw createError.NotAcceptable('Cannot be Deleted');
      const params = {
        Key: fileId,
        Bucket: process.env.BUCKET_NAME,
      };
      const status = await this.s3DAO.delete(params);
      if (!status) throw createError.InternalServerError();
      return { status: 'success' };
    } catch (err) {
      throw err;
    }
  };

  getInfo = async (userId, fileId) => {
    try {
      const data = await this.fileDAO.getInfo(userId, fileId);
      if (!data) throw createError.NotFound('File Not Found');
      return data;
    } catch (err) {
      throw err;
    }
  };

  getList = async (userId, query) => {
    try {
      let match = { 'metadata.ownerId': userId };
      if (query.s) match.name = { $regex: query.s, $options: 'i' };
      let limit = parseInt(query.limit) || 5;
      let sort = { createdAt: 1, name: 1 };
      sort.createdAt = query.sortByDate && query.sortByDate === 'desc' ? -1 : 1;
      sort.name = query.sortByName && query.sortByName === 'desc' ? -1 : 1;
      console.log(match, sort, limit);
      const data = await this.fileDAO.getList(match, sort, limit);
      return data;
    } catch (err) {
      throw err;
    }
  };

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
