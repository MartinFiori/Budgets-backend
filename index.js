// imports
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const sequelize = require("./db.js");
const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

sequelize
	.authenticate()
	.then(() => console.log("DB connected"))
	.catch(err => console.error(err.message));

// routes
app.use("/auth", require("./routes/auth.routes.js"));
app.use("/movements", require("./routes/movement.routes.js"));

const PORT = process.env.PORT || 8080;

// sync with db and connecting express
(async function () {
	await sequelize.sync({ force: false });
	app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
})();
