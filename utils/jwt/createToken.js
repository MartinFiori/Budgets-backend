const jwt = require("jsonwebtoken");
const { expires, secret } = require("../config.js");

function createToken(user) {
	return jwt.sign({ user }, secret, { expiresIn: expires });
}

module.exports = createToken;
