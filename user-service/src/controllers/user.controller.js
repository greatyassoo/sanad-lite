import { ApiError, catchAsyncError } from '../utils/errorHandling.js';
import USER from '../models/user.model.js';
import { StatusCodes } from 'http-status-codes';
import { signJWT } from '../utils/auth.js';
import bcrypt from 'bcrypt';
import { filterObject } from '../utils/helpers.js';
import { findAllAggregate } from '../utils/fatcory.js';
import { Types } from 'mongoose';
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

export const getAllUsers = catchAsyncError(async (req, res) => {
	findAllAggregate(USER, [], req.query, ['name'], res);
});
export const getUserById = catchAsyncError(async (req, res) => {
	const user = await USER.findById(req.params.userId);
    if (!user)
        return next(new ApiError(StatusCodes.NOT_FOUND, 'user not found'));
    return res.status(StatusCodes.OK).json(user);
})