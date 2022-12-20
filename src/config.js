export const corsOptions = {
	methods: ["OPTIONS", "GET", "POST", "PUT", "DELETE"],
	credentials: true,
	origin: (origin, callback) => {
		// if (origin == "http://localhost:3000")
			callback(null, true);
		// console.log(origin);
	},
};

export const rateLimitOptions = {
	message: "Too many requests.",
	max: 500,
	windowMs: 1000 * 60 * 10,
	legacyHeaders: false,
};

export const compressionOptions = {};

export const cookieSecret = "s3cr3t";

export const cookieOptions = {};

export const eJSONOptions = {};
