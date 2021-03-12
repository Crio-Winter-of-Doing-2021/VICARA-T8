const S3 = require('../utils/S3Instance');
class S3DAO {
  constructor() {}

  async upload(params) {
    return new Promise((resolve, reject) => {
      S3.upload(params, (err, data) => {
        if (err) reject(err);
        resolve(data);
      }).on('httpUploadProgress', function (progress) {
        console.log(progress);
      });
    });
  }
}

module.exports = S3DAO;
