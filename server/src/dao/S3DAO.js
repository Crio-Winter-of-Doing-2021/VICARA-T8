const S3 = require('../utils/S3Instance');

//PART Storage
// Increase conccurent request and partfilesize in params
class S3DAO {
  constructor() {}

  async upload(params) {
    return new Promise((resolve, reject) => {
      S3.upload(params, (err, data) => {
        if (err) reject(err);
        console.log(data);
        resolve('true');
      }).on('httpUploadProgress', function (progress) {
        console.log(progress);
      });
    });
  }
}

module.exports = S3DAO;
