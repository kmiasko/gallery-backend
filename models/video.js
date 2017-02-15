const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
  shortid: {
    type: String,
    unique: true,
  },
  title: String,
  url: String,
  likes: Number,
  views: Number,
  creationDate: {
    type: Date,
    default: Date.now,
  },
  description: String,
  embed: String,
  thumbnail: String,
  favorite: {
    type: Boolean,
    default: false,
  },
});

videoSchema.statics.feed = function(cb) {
  const Video = this;
  return Video.find({})
    .sort({ $natural: -1 })
    .limit(10)
    .select({ title: 1, thumbnail: 1 })
    .exec(cb);
};

videoSchema.methods.fav = function() {
  const video = this;
  video.favorite = !video.favorite;
  return video.save();
};

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;

