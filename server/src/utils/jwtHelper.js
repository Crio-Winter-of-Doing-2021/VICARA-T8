import JWT from 'jsonwebtoken';
import createError from 'http-errors';
module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: '1h',
        issuer: 'drive.com',
        audience: userId,
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) reject(createError.InternalServerError());
        resolve(token);
      });
    });
  },
};
