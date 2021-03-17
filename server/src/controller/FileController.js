const FileService = require('../services/FileService');

class FileController {
  constructor() {
    this.fileService = new FileService();
    this.getInfo = this.getInfo.bind(this);
    this.upload = this.upload.bind(this);
    this.download = this.download.bind(this);
    this.getList = this.getList.bind(this);
    this.delete = this.delete.bind(this);
    this.getPublicLink = this.getPublicLink.bind(this);
  }

  async getInfo(req, res, next) {
    try {
      const id = req.params.id;
      const data = await this.fileService.getInfo(id);
      res.status(200).json({ success: 'true', data });
    } catch (err) {
      throw err;
    }
  }

  async upload(req, res, next) {
    try {
      const busboy = req.busboy;

      const Id = req.payload.aud;
      req.pipe(busboy);
      const data = await this.fileService.upload(Id, busboy);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  async download(req, res, next) {
    try {
      //const Id = req.params.id;
      const data = await this.fileService.download();
      res.set('Content-Type', 'binary/octet-stream');
      res.set(
        'Content-Disposition',
        'attachment; filename="' + 'currentFile.filename' + '"'
      );
      //res.set('Content-Length', currentFile.metadata.size.toString());
      data.pipe(res);
    } catch (err) {}
  }

  async getList(req, res, next) {
    try {
      const id = 1;
      const query = req.query;
      const data = await this.fileService.getList(id, query);
      res.status(200).json({ status: 'success', data });
    } catch (err) {
      throw err;
    }
  }

  async delete(req, res, next) {
    try {
      const data = await this.fileService.delete();
      res.status(200).json(data);
    } catch (err) {}
  }

  async getPublicLink(req, res, next) {
    try {
      const id = req.params.id;
      //Check Owner
      const data = await this.fileService.getPublicLink(id);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = FileController;
