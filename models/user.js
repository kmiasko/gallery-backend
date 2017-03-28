const mongoose = require('mongoose');
const omit = require('lodash/omit');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
}, {
  toObject: {
    transform: function(doc, ret) {
      return omit(ret, ['password', '__v', 'token']);
    }
  },
  toJSON: {
    transform: function (doc, ret) {
      return omit(ret, ['password', '__v', 'token']);
    }
  },
});


const User = mongoose.model('User', userSchema);

module.exports = User;

