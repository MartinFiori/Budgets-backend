const bcrypt = require("bcrypt");

function compareHash(pwd, db_pwd) {
	return bcrypt.compareSync(pwd, db_pwd);
}

module.exports = compareHash;
