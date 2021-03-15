const S3DAO = require('../dao/S3DAO');
const FileDAO = require('../dao/FileDAO');
const UserDAO = require('../dao/UserDAO');
const parseStreamData = require('../utils/parseStreamData');
const { encryptStream } = require('../utils/encryption');
const uuid = require('uuid');
const createError = require('http-errors');

//TODO Encryption and Zipping
class FileService {
  constructor() {
    this.s3DAO = new S3DAO();
    this.fileDAO = new FileDAO();
    this.upload = this.upload.bind(this);
    this.getPublicLink = this.getPublicLink.bind(this);
    this.download = this.download.bind(this);
    this.delete = this.delete.bind(this);
  }

  async upload(userId, busboy) {
    try {
      const { file, filename, formData, mimetype } = await parseStreamData(
        busboy
      );
      const size = '11';
      const S3ID = uuid.v4();

      // Add parent list
      let metadata = {
        ownerId: 'userId',
        size,
        mimetype,
        fileId: S3ID,
      };

      const params = {
        Key: S3ID,
        Body: file,
        Bucket: process.env.BUCKET_NAME,
        Metadata: metadata,
      };
      console.log(S3ID);
      const status = await this.s3DAO.upload(params);
      if (!status) throw createError.InternalServerError();

      // Update in File DB
      const object = {
        name: filename,
        parent: '1',
        parentList: '1',
        metadata,
      };

      const updateFileStatus = await this.fileDAO.add(object);
      if (!updateFileStatus) throw createError.InternalServerError();
      // TODO Update Size of File
      //upar daldo
      const updateStorageStatus = await this.userDAO.UpdateStorage(size);
      if (!updateStorageStatus)
        throw createError.NotAcceptable('Storage Limit Exceed');
      return { success: 'true' };
    } catch (err) {
      throw err;
    }
  }

  async download() {
    try {
      const params = {
        Key: '48ad84d7-40a4-422a-ae33-1a9c3496a215',
        Bucket: process.env.BUCKET_NAME,
      };
      const stream = await this.s3DAO.download(params);

      return stream;
    } catch (err) {
      throw err;
    }
  }

  async delete() {
    try {
      const params = {
        Key: olaas,
        Bucket: process.env.BUCKET_NAME,
      };
      const status = await this.s3DAO.delete(params);
      if (!status) throw createError.InternalServerError();
      return { success: 'true' };
    } catch (err) {
      throw err;
    }
  }

  async getInfo(id) {
    try {
      const data = await this.fileDAO.getInfo(id);
      if (!data) throw createError.NotFound('File Not Found');
      return data;
    } catch (err) {}
  }

  async getPublicLink(Id) {
    try {
      //Check Owner
      const param = {
        Key: Id,
        Bucket: process.env.BUCKET_NAME,
      };
      const url = await this.s3DAO.getPublicLink(param);
      if (!url) throw createError.Forbidden();
      return { success: 'true', url: url };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = FileService;
