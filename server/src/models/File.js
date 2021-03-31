const mongoose = require('mongoose');

const FileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('File', FileSchema);
