const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");
const User = require("./User.js");
const Category = require("./Category.js");

const Movement = sequelize.define(
	"Movement",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			unique: true,
			allowNull: true,
			primaryKey: true,
		},
		concept: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		amount: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		creation_date: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		type: {
			type: DataTypes.ENUM(["income", "outgoing"]),
			allowNull: false,
		},
	},
	{ timestamps: false }
);

User.hasMany(Movement, {
	foreignKey: "user_id",
});

Movement.belongsTo(User, {
	foreignKey: "user_id",
	targetKey: "email",
});

Movement.hasOne(Category, {
	foreignKey: "movement_id",
});

Category.belongsTo(Movement, {
	targetKey: "id",
	foreignKey: "movement_id",
});

module.exports = Movement;
