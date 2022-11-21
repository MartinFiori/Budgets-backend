const Movement = require("../models/Movement.js");
const User = require("../models/User.js");

async function createMovement(req, res) {
	try {
		await Movement.create({
			...req.body,
			user_id: req.user.email,
		});
		const userFound = await User.findByPk(req.user.email, {
			include: [Movement],
		});
		res.json(userFound);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
}
async function getMovementByFilter(req, res) {
	const { filter } = req.params;
	const validFilters = ["all", "income", "outgoing"];
	try {
		if (!validFilters.includes(filter))
			return res.status(404).json("Invalid filter");

		const user = await User.findByPk(req.user.email, {
			include: [Movement],
		});
		if (filter === "all") {
			res.status(200).json(user.toJSON().Movements);
		} else {
			const movements = await Movement.findAll({
				where: { user_id: req.user.email, type: filter },
			});
			res.status(200).json(movements);
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
}

async function updateMovement(req, res) {
	const { id } = req.params;
	try {
		if (!Object.values(req.body).every(Boolean))
			return res.status(400).json({ error: "Complete all inputs" });
		const movement = await Movement.update(req.body, { where: { id } });
		if (movement.length[0] == 0)
			return res.status(400).json({ error: "No movement updated" });

		const user = await User.findByPk(req.user.email, {
			include: [Movement],
		});
		res.json(user.Movements);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
}
async function deleteMovement(req, res) {
	const { id } = req.params;
	try {
		await Movement.destroy({
			where: { id: parseInt(id) },
		});
		const user = await User.findByPk(req.user.email, {
			include: [Movement],
		});
		res.json(user.Movements);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
}

async function findMovementById(req, res) {
	const { id } = req.params;
	try {
		const movementFound = await Movement.findByPk(id);
		const user = await User.findByPk(req.user.email);
		if (movementFound.user_id !== user.email)
			return res.status(404).json({ error });

		res.status(200).json(movementFound);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
}

async function getUserInfo(req, res) {
	try {
		const user = await User.findByPk(req.user.email, {
			include: [Movement],
		});

		const userMovements = await Movement.findAll({
			where: { user_id: req.user.email },
		});

		const income = await Movement.findAll({
			where: { user_id: req.user.email, type: "income" },
		});

		const outgoing = await Movement.findAll({
			where: { user_id: req.user.email, type: "outgoing" },
		});

		const incomeReduce = income.reduce((acc, el) => acc + el.amount, 0);
		const outgoingReduce = outgoing.reduce((acc, el) => acc + el.amount, 0);
		const total = {
			user: {
				...user.toJSON(),
				balance: incomeReduce - outgoingReduce,
			},
			income: {
				totalIncome: incomeReduce,
				array: income,
			},
			outgoing: {
				totalOutgoing: outgoingReduce,
				array: outgoing,
			},
		};
		res.status(200).json(total);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
}

module.exports = {
	createMovement,
	getUserInfo,
	updateMovement,
	deleteMovement,
	findMovementById,
	getMovementByFilter,
};
