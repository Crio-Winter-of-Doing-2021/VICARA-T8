const S3DAO = require('../dao/S3DAO');
const parseStreamData = require('../utils/parseStreamData');
const { encryptStream } = require('../utils/encryption');
const uuid = require('uuid');
const createError = require('http-errors');

//TODO Encryption and Zipping
class FileService {
  constructor() {
    this.s3DAO = new S3DAO();
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
      const size = 11;
      const S3ID = uuid.v4();
      const params = {
        Key: S3ID,
        Body: file,
        Bucket: process.env.BUCKET_NAME,
      };
      // Add parent list
      let metadata = {
        owner: userId,
        size,
        mimetype,
        s3ID: S3ID,
      };
      console.log(S3ID);
      const success = await this.s3DAO.upload(params);
      if (!success) throw createError.InternalServerError();

      // const file = await this.fileStructDAO.upload(metadata);
      // TODO Update Size of File
      return { success: 'true' };
    } catch (err) {
      throw err;
    }
  }

  async download() {
    try {
    } catch (err) {}
  }

  async delete() {
    try {
      const params = {
        Key: olaas,
        Bucket: process.env.BUCKET_NAME,
      };
      const download = await this.S3DAO.delete(params);
    } catch (err) {
      throw err;
    }
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
