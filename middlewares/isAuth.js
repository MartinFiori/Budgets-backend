const jwt = require("jsonwebtoken");
const Movement = require("../models/Movement.js");
const User = require("../models/User.js");
const { secret } = require("../utils/config.js");

module.exports = (req, res, next) => {
	const authHeader =
		req.headers["authorization"] || req.headers["Authorization"];
	if (!authHeader)
		return res.status(401).json({ err: "Access unauthorized" });
	if (authHeader.split(" ")[0] !== "Bearer")
		return res.status(401).json({ err: "Invalid token type" });
	const token = authHeader && authHeader.split(" ")[1];
	jwt.verify(token, secret, async (err, decoded) => {
		if (err)
			return res.status(401).json({ err: "Couldn't decodify token" });
		else {
			const userFound = await User.findByPk(decoded.user.email, {
				include: [Movement],
			});
			req.user = userFound.toJSON();
			next();
		}
	});
};
