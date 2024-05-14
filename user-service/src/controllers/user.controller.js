import { ApiError, catchAsyncError } from '../utils/errorHandling.js';
import USER from '../models/user.model.js';
import { StatusCodes } from 'http-status-codes';
import { signJWT } from '../utils/auth.js';
import bcrypt from 'bcrypt';
import { filterObject } from '../utils/helpers.js';

export const register = catchAsyncError(async (req, res, next) => {
	const chckUser = await USER.findOne({ email: req.body.email });
	if (chckUser)
		return next(new ApiError(StatusCodes.BAD_REQUEST, 'user already exists'));
	req.body.password = await bcrypt.hash(
		req.body.password,
		parseInt(process.env.BCRYPT_SALT)
	);
	const user = await USER.create(req.body);
	return res.status(StatusCodes.CREATED).json(user);
});

export const login = catchAsyncError(async (req, res, next) => {
	const chckUser = await USER.findOne({ email: req.body.email });
	if (!chckUser)
		return next(new ApiError(StatusCodes.NOT_FOUND, 'email does not exist'));
	const match = await bcrypt.compare(req.body.password, chckUser.password);
	if (!match)
		return next(new ApiError(StatusCodes.BAD_REQUEST, 'wrong password'));
	const userObj = filterObject({ ...chckUser.toObject() }, ['password']);
	const token = signJWT({ _id: chckUser['_id'], role: chckUser.role });
	return res.status(StatusCodes.OK).json({ token: token, data: userObj });
});
