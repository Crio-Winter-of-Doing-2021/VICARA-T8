const createHttpError = require('http-errors');

createHttpError;
function parseStreamData(busboy) {
  return new Promise((resolve, reject) => {
    const formData = new Map();
    busboy.on('field', (field, val) => {
      formData.set(field, val);
    });
    // Single File Resolving
    busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
      resolve({
        file,
        filename,
        formData,
        mimetype,
      });
    });

    if (formData.size > 0) reject(createHttpError.BadRequest('No File Found'));
    // busboy.on('finish',()=>{

    // })
  });
}

module.exports = parseStreamData;
