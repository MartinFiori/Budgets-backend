const { Sequelize } = require("sequelize");

const {
	host,
	database,
	username,
	password,
	// DATABASE_URL,
} = require("./utils/config.js");

const sequelize = new Sequelize(
	`postgres://${username}:${password}@${host}:5432/${database}`,
	// `${DATABASE_URL}`,
	{
		logging: false,
		native: false,
		// configuración
		// dialectOptions: {
		// 	ssl: {
		// 		require: true,
		// 		rejectUnauthorized: false,
		// 	},
		// },
	}
);

module.exports = sequelize;
