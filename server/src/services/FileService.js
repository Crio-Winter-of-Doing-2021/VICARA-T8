const S3DAO = require('../dao/S3DAO');
const parseStreamData = require('../utils/parseStreamData');
class FileService {
  constructor() {
    this.s3DAO = new S3DAO();
    this.upload = this.upload.bind(this);
  }

  async upload(busboy) {
    const { file, filename, formData, mimetype } = await parseStreamData(
      busboy
    );
    const params = {
      Key: '123',
      Body: file,
      Bucket: process.env.BUCKET_NAME,
    };

    return this.s3DAO.upload(params);
  }
}

module.exports = FileService;
