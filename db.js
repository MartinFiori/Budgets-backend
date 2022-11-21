const { Sequelize } = require("sequelize");

const { host, database, username, password } = require("./utils/config.js");

const sequelize = new Sequelize(
	`postgres://${username}:${password}@${host}:5432/${database}`,
	{ logging: false }
);

module.exports = sequelize;
