//keys.js figure out what set of credentials to return

//decide if we are in production or not
if (process.env.NODE_ENV === "production") {
  //we are in production return the production set of keys
  module.exports = require("./prod");
} else {
  // we are in development
  module.exports = require("./dev");
}
