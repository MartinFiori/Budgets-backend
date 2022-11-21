const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");

const User = sequelize.define(
	"User",
	{
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			primaryKey: true,
			validate: {
				isEmail: { msg: "The email must be a valid email" },
			},
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ timestamps: false }
);

module.exports = User;
