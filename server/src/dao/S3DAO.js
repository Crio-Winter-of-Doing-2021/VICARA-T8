const S3 = require('../utils/S3Instance');
const http = require('http-errors');

//PART Storage
// Increase conccurent request and partfilesize in params
class S3DAO {
  constructor() {}

  //Add options for concurrent upload
  async upload(params) {
    return new Promise((resolve, reject) => {
      S3.upload(params, (err, data) => {
        if (err) reject(err);
        //console.log(data);
        resolve(true);
      });
    });
  }

  async getPublicLink(params) {
    return new Promise((resolve, reject) => {
      S3.getSignedUrl('getObject', params, (err, url) => {
        console.log(url);
        if (err) reject(err);
        resolve(url);
      });
    });
  }

  async deleteObject(params) {
    //can add here bucket
    return newPromise((resolve, reject) => {
      S3.deleteObject(params, (err, data) => {
        if (err) reject(err);
        console.log(err);
        resolve(true);
      });
    });
  }
}

module.exports = S3DAO;
