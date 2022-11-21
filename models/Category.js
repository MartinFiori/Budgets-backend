const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");

const Category = sequelize.define(
	"Category",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ timestamps: false }
);

module.exports = Category;
