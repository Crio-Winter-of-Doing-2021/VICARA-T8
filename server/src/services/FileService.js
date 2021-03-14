const S3DAO = require('../dao/S3DAO');
const parseStreamData = require('../utils/parseStreamData');
const { encryptStream } = require('../utils/encryption');

//TODO Encryption and Zipping
class FileService {
  constructor() {
    this.s3DAO = new S3DAO();
    this.upload = this.upload.bind(this);
  }

  async upload(busboy) {
    const { file, filename, formData, mimetype } = await parseStreamData(
      busboy
    );
    const cipherStream = encryptStream('123');
    const params = {
      Key: 'ola',
      Body: file.pipe(cipherStream),
      Bucket: process.env.BUCKET_NAME,
    };

    // Create a cipher service

    const data = this.s3DAO.upload(params);
    if (data instanceof Error) throw data;
    return data;
  }
}

module.exports = FileService;
