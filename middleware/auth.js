const jwt = require("jsonwebtoken");

function auth(req, res, next) {
 // res.header("Access-Control-Allow-Origin", "*");

  const token = req.header("authToken");

  // Check for token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorizaton denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, "ahjsajh");
    // Add user from payload
    req.user = decoded;
    // console.log(decoded);
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}

module.exports = auth;