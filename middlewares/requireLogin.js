//
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "Please Log In!" });
  }
  next(); //lets let this user continue on to the request handler
};
