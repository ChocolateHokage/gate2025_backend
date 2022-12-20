import { ApiError, logger } from "./index.js";
import { ValidationError } from "express-validation";

export default function (error, req, res, _) {
	if (error instanceof ApiError) {
		res.status(error.status).json({ msg: error.message, data: error.errors });
		return;
	}

	if (
		error?.name == "SequelizeValidationError" ||
		error?.name == "SequelizeUniqueConstraintError"
	) {
		const messages = [];

		error.errors.forEach((e) => messages.push(e.message));

		res.status(400).json({
			msg: messages.length
				? messages
				: "Error when checking the received data. Try to enter the correct data or contact the administrator.",
			data: {
				code: error?.code || error?.statusCode || 3,
				date: new Date().toString(),
			},
		});
		return;
	}

	if (error instanceof ValidationError) {
		res
			.status(error.statusCode)
			.json({ message: error.message, data: error.details });
		return;
	}

	const { query, params, body, headers } = req;

	logger.error(error);
	logger.error(JSON.stringify({ query, params, body, headers }, null, 2));

	res.status(error?.statusCode || 500).json({
		msg: "Something went wrong. Contact the administrator or try again later.",
		data: {
			code: error?.code || error?.statusCode || 1,
			date: new Date().toString(),
		},
	});
}
