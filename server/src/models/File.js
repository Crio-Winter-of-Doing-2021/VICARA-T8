const mongoose = require('mongoose');

const FileSchema = mongoose.Schema(
  {
    name: {
      type: string,
      require: true,
    },
    parent: {
      type: string,
    },
    parentList: {
      type: string,
    },
    metadata: {
      type: {
        ownerId: String,
        fileId: String,
        size: Number,
        mimetype: String,
      },
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('File', FileSchema);
