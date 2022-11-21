const bcrypt = require("bcrypt");
const { rounds } = require("../config");

function createHash(pwd) {
	return bcrypt.hashSync(pwd, bcrypt.genSaltSync(parseInt(rounds)));
}

module.exports = createHash;
