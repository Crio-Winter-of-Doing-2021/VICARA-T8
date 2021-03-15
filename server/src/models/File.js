const mongoose = require('mongoose');

const FileSchema = mongoose.Schema(
  {
    name: {
      type: string,
      require: true,
    },
    metadata: {
      type: {
        ownerId: String,
        fileId: String,
        size: Number,
        type: String,
      },
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('File', FileSchema);
