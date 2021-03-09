const JWT = require('jsonwebtoken');
const createError = require('http-errors');

//Check Refresh token Validity in --> REDIS
//Expires and issue values must be constant from
module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: '1d',
        issuer: 'drive.com',
        audience: userId,
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) reject(createError.InternalServerError());
        resolve(token);
      });
    });
  },

  verifyAccessToken: (req, res, next) => {
    if (!req.headers['authorization']) return next(createError.Unauthorized());
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message =
          err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;

        return next(createError.Unauthorized(message));
      }
      req.payload = payload;
      next();
    });
  },

  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: '30d',
        issuer: 'drive.com',
        audience: userId,
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) reject(createError.InternalServerError());
        //Added Locally

        resolve(token);
      });
    });
  },

  verifyRefreshToken: (token) => {
    return new Promise((resolve, reject) => {
      JWT.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
        if (err) return reject(createError.Unauthorized());
        const userId = payload.aud;
        //console.log(payload);
        resolve(userId);
      });
    });
  },
};
