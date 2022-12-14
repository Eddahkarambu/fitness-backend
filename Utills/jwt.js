const jwt = require("jsonwebtoken");
require("dotenv/config");

function createToken(email) {
  return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: "86400s" });
}
function authenticateToken(req, res) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.status(401).json({ message: "Token is null" });
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);

    if (err) return res.status(403).json({ message: "Invalid Token" });

    req.user = user;
  });
}
module.exports = { createToken, authenticateToken };
