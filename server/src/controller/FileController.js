const FileService = require('../services/FileService');

class FileController {
  constructor() {
    this.fileService = new FileService();
  }

  getInfo = async (req, res, next) => {
    try {
      const userId = req.payload.aud;
      const fileId = req.params.id;
      const data = await this.fileService.getInfo(userId, fileId);
      res.status(200).json({ status: 'success', data });
    } catch (err) {
      next(err);
    }
  };

  upload = async (req, res, next) => {
    try {
      const busboy = req.busboy;
      const Id = req.payload.aud;
      req.pipe(busboy);
      const data = await this.fileService.upload(Id, busboy);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  };

  download = async (req, res, next) => {
    try {
      const fileId = req.params.id;
      const userId = req.payload.aud;
      const data = await this.fileService.download(userId, fileId);
      res.set('Content-Type', data.metadata.mimetype);
      res.set(
        'Content-Disposition',
        'attachment; filename="' + data.filename + '"'
      );
      res.set('Content-Length', data.metadata.size.toString());
      data.stream.pipe(res);
    } catch (err) {
      next(err);
    }
  };

  getList = async (req, res, next) => {
    try {
      const userId = req.payload.aud;
      const query = req.query;
      const data = await this.fileService.getList(userId, query);
      res.status(200).json({ status: 'success', length: data.length, data });
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const fileId = req.params.id;
      const userId = req.payload.aud;
      const data = await this.fileService.delete(userId, fileId);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  getPublicLink = async (req, res, next) => {
    try {
      const fileId = req.params.id;
      const userId = req.payload.aud;
      const data = await this.fileService.getPublicLink(userId, fileId);
      res.status(200).json({ status: 'success', data });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = FileController;
