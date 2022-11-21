require("dotenv").config();
const {
	DB_HOST,
	DB_DATABASE,
	DB_USER,
	DB_PASSWORD,
	JWT_EXPIRES,
	JWT_SECRET,
	BCRYPT_ROUNDS,
} = process.env;

module.exports = {
	host: DB_HOST,
	database: DB_DATABASE,
	username: DB_USER,
	password: DB_PASSWORD,
	expires: JWT_EXPIRES,
	secret: JWT_SECRET,
	rounds: BCRYPT_ROUNDS,
};
