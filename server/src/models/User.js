const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// @desc Schema of User

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    default: null,
  },
  storage: {
    size: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 16106127360,
    },
  },
});

// userSchema.pre('save', async function (next) {
//   try {
//     if (this.password === '') next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = mongoose.model('user', userSchema);
