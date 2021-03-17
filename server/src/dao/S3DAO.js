//Store File in Chunks
// Increase conccurent request and partfilesize in params
class S3DAO {
  constructor(S3) {
    this.s3 = S3;
  }

  //Add options for concurrent upload
  async upload(params) {
    return new Promise((resolve, reject) => {
      this.s3.upload(params, (err, data) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  async getPublicLink(params) {
    return new Promise((resolve, reject) => {
      this.s3.getSignedUrl('getObject', params, (err, url) => {
        if (err) reject(err);
        resolve(url);
      });
    });
  }

  async download(params) {
    return new Promise((resolve, reject) => {
      const stream = this.s3
        .getObject(params)
        .createReadStream()
        .on('error', () => {
          reject('Cannot Read');
        });

      resolve(stream);
    });
  }

  async delete(params) {
    return new Promise((resolve, reject) => {
      this.s3.deleteObject(params, (err, data) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }
}

module.exports = S3DAO;
