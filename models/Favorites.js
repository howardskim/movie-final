const mongoose = require("mongoose");

const { Schema } = mongoose;
const FavoriteSchema = new Schema({
  id: {
    type: Number,
  },
  userID: {
    type: String,
  },
  title: String,
  overview: String,
  poster_path: String,
  release_date: String,
  vote_average: Number,
  backdrop_path: String,
  release_date: String
});
module.exports = mongoose.model("favorites", FavoriteSchema);
