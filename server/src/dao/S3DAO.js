const S3 = require('../utils/S3Instance');
const http = require('http-errors');
const { ConfigService } = require('aws-sdk');

//PART Storage
// Increase conccurent request and partfilesize in params
class S3DAO {
  constructor() {}

  //Add options for concurrent upload
  async upload(params) {
    return new Promise((resolve, reject) => {
      S3.upload(params, (err, data) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  async getPublicLink(params) {
    return new Promise((resolve, reject) => {
      S3.getSignedUrl('getObject', params, (err, url) => {
        if (err) reject(err);
        resolve(url);
      });
    });
  }

  async download(params) {
    return new Promise((resolve, reject) => {
      const stream = S3.getObject(params)
        .createReadStream()
        .on('error', () => {
          reject('Cannot Read');
        });

      resolve(stream);
    });
  }

  async delete(params) {
    return new Promise((resolve, reject) => {
      S3.deleteObject(params, (err, data) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }
}

module.exports = S3DAO;
