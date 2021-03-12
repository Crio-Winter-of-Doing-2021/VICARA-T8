const AWS = require('aws-sdk');
require('dotenv').config();
AWS.config.update({ region: 'us-east-1' });

// Create S3 service object
const S3 = new AWS.S3({
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key,
  sessionToken: process.env.aws_session_token,
  apiVersion: '2006-03-01',
});

module.exports = S3;
