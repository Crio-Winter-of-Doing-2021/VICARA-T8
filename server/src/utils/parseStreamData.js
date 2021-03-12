function parseStreamData(busboy) {
  return new Promise((resolve, reject) => {
    const formData = new Map();

    busboy.on('field', (field, val) => {
      formData.set(field, val);
    });

    busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
      resolve({
        file,
        filename,
        formData,
        mimetype,
      });
    });
  });
}

module.exports = parseStreamData;
