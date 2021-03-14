const FileService = require('../services/FileService');

class FileController {
  constructor() {
    this.fileService = new FileService();
    this.getInfo = this.getInfo.bind(this);
    this.upload = this.upload.bind(this);
    this.download = this.download.bind(this);
    this.getList = this.getList.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getInfo(req, res, next) {
    try {
    } catch (err) {}
  }

  async upload(req, res, next) {
    try {
      const busboy = req.busboy;
      req.pipe(busboy);
      const data = await this.fileService.upload(busboy);
      res.status(200).json({ success: data });
    } catch (err) {
      next(err);
    }
  }

  async download(req, res, next) {
    try {
    } catch (err) {}
  }

  async getList(req, res, next) {
    try {
    } catch (err) {}
  }

  async delete(req, res, next) {
    try {
    } catch (err) {}
  }
}

module.exports = FileController;
