import jwt from 'jsonwebtoken';
import { ApiError, catchAsyncError } from './errorHandling.js';
import { StatusCodes } from 'http-status-codes';
import USER from '../models/user.model.js';

export const signJWT = (payload) => {
	payload.iat = Date.now();
	return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

export const restrictTo = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.role))
			return next(new ApiError(StatusCodes.FORBIDDEN, 'unauthorized'));
		next();
	};
};

export const protect = catchAsyncError(async (req, res, next) => {
	let token = req.headers.authorization;
	const bearerKey = 'Bearer ';
	if (!token || token == null || !token.startsWith(bearerKey))
		return next(
			new ApiError(StatusCodes.UNAUTHORIZED, 'invalid authentication token')
		);
	token = token.split(bearerKey)[1];
	const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
	const user = await USER.findById(decoded['_id']);
	if (!user)
		return next(
			new ApiError(
				StatusCodes.UNAUTHORIZED,
				'user belonging to this token no longer exists'
			)
		);
	req.user = user;
	req.role = user.role;
	next();
});
