const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { Schema } = mongoose;
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: "Please supply an email",
  },
  password: {
    type: String,
  },
  favorites: [
    {
      id: {
        type: Number,
      },
      userID: {
        type: String,
      },
      title: String,
      overview: String,
      poster_path: String,
      backdrop_path: String,
      release_date: String,
    },
  ],
});

UserSchema.pre("save", function (next) {
  const user = this;



  // generate a salt
  bcrypt.genSalt(saltRounds, function (err, salt) {
    // if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
    //   if (err) return next(err);
      
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});
//you can add custom methods like this one below using this format
UserSchema.methods.comparePassword = function(candidatePass, callback){
  bcrypt.compare(candidatePass, this.password, function(err, isMatch){
    if(err){
      return callback(err);
    }
    callback(null, isMatch)
  })
}
// const ModelClass = mongoose.model("users", UserSchema);
// module.exports = ModelClass
module.exports = mongoose.model('users', UserSchema)