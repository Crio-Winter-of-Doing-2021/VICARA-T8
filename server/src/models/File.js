const mongoose = require('mongoose');

const FileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    isFavourite: {
      type: Boolean,
      default: false,
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
