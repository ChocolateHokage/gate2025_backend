import { authModel, accountModel, sessionModel } from "../model/index.js";
import { ApiError, hasherIds, passHasher, Token } from "../module/index.js";

export async function login(req, res, next) {
	try {
		const { login, password } = req.body;

		const account = await accountModel.findOne({
			where: { login },
			include: authModel,
		});
		if (!account || account.auth.hash_password !== passHasher(password)) {
			throw ApiError.BadRequest("Invalid email or password!");
		}

		const session_tokens = Token.generateTokens({
			id: account.id,
			login: account.login,
			isAdmin: account.isAdmin,
			createdAt: account.createdAt,
			updatedAt: account.updatedAt,
		});

		await Token.saveToken(
			hasherIds.decode(account.id),
			session_tokens.refreshToken,
		);

		res.cookie("refresh_token", session_tokens.refreshToken, {
			maxAge: 1000 * 60 * 60 * 24 * 30,
			httpOnly: true,
			sameSite: "lax",
		});

		res.status(201).json({
			data: {
				id: account.id,
				login: account.login,
				isAdmin: account.isAdmin,
				updatedAt: account.updatedAt,
				createdAt: account.createdAt,

			},
			...session_tokens,
		});
	} catch (error) {
		next(error);
	}
}

export async function refresh(req, res, next) {
	try {
		const { refresh_token } = req.cookies;
		if (!refresh_token) {
			throw ApiError.UnauthorizedError();
		}
		const sessionData = await sessionModel.findOne({
			where: { refresh_token },
		});

		const authData = Token.validateRefreshToken(refresh_token);
		const checkToken = await Token.findToken(refresh_token);

		if (!sessionData || !(authData && checkToken)) {
			throw ApiError.UnauthorizedError();
		}
		const account = await accountModel.findOne({
			where: { id: sessionData.accountId },
		});

		const session_tokens = Token.generateTokens({
			id: account?.id,
			login: account?.login,
			isAdmin: account?.isAdmin,
			createdAt: account?.createdAt,
			updatedAt: account?.updatedAt,
		});

		Token.saveToken(hasherIds.decode(account?.id), session_tokens.refreshToken);

		res.cookie("refresh_token", session_tokens.refreshToken, {
			maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
			httpOnly: true,
			sameSite: "lax",
		});

		res.status(200).json({
			data: {
				id: account?.id,
				login: account?.login,
				isAdmin: account?.isAdmin,
				createdAt: account?.createdAt,
				updatedAt: account?.updatedAt,
			},
			...session_tokens,
		});
	} catch (error) {
		next(error);
	}
}

export async function logout(req, res, next) {
	try {
		const { refresh_token } = req.cookies;

		if (refresh_token) {
			await Token.removeToken(refresh_token);
			res.clearCookie("refresh_token");
		}

		res.status(200).json({ msg: "OK" });
	} catch (error) {
		next(error);
	}
}

export async function addAccount(req, res, next) {
	try {
		const { login, password, isAdmin } = req.body;

		const account = await accountModel.create({
			login: login,
			isAdmin: isAdmin,
		});
		await authModel.create({
			accountId: hasherIds.decode(account.id),
			hash_password: passHasher(password),
		});

		res.status(201).json(account);
	} catch (error) {
		next(error);
	}
}
