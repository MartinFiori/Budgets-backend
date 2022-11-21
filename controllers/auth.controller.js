const User = require("../models/User.js");

const createHash = require("../utils/hash/createHash.js");
const compareHash = require("../utils/hash/compareHash.js");
const createToken = require("../utils/jwt/createToken.js");
const Movement = require("../models/Movement.js");

async function signUp(req, res) {
	const { email, username, password } = req.body;
	try {
		if (![email, username, password].every(Boolean))
			return res
				.status(400)
				.json({ error: "Please, complete all inputs" });
		if (await User.findByPk(email))
			return res.status(400).json({ error: "User already exists" });
		const user = await User.create({
			username,
			email,
			password: createHash(password),
		});

		res.status(201).json(user);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
}
async function logIn(req, res) {
	const { password, email } = req.body;
	try {
		if (![email, password].every(Boolean))
			return res
				.status(400)
				.json({ error: "Please, complete all inputs" });
		const user = await User.findByPk(email, {
			include: [Movement],
		});
		if (!user) return res.status(400).json({ error: "User not found" });
		if (!compareHash(password, user.password))
			return res.status(401).json({ error: "Wrong password" });
		let token = createToken(user);
		res.status(200).json({ user: user.toJSON(), token });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
}

async function logout(req, res) {
	try {
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
}
async function verifyUser(req, res) {
	const { email, password } = req.body;
	try {
		const user = await User.findByPk(email);
		if (!user) return res.json(false);
		if (password !== user.password) return res.json(false);
		res.json(true);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
}

module.exports = {
	signUp,
	logIn,
	logout,
	verifyUser,
};
