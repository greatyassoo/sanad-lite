import { StatusCodes } from 'http-status-codes';
import { logger } from './logger/logger.js';

export class ApiError extends Error {
	constructor(statusCode, message) {
		super(message);
		this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
		this.statusCode = statusCode;
		this.isOperational = true;
		Error.captureStackTrace(this, this.constructor);
	}
}

// catching errors from asynchronous functions used in services
export const catchAsyncError = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch((err) => {
			next(err);
		});
	};
};

// for invalid requested routes or methods
export const invalidRoutes = (req, res, next) => {
	const { method, originalUrl } = req;
	next(
		new ApiError(StatusCodes.NOT_FOUND, `can't find: ${method} ${originalUrl}`)
	);
};

const handleCastError = (err) => {
	// e.g. Invalid _id: asdaed
	const message = `Invalid ${err.path}: ${err.value}`;
	return new ApiError(StatusCodes.BAD_REQUEST, message);
};

const handleDuplicateFieldsDB = (err) => {
	// get value between quotes
	const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
	const message = `Duplicate field value: ${value}. Please use another value!`;
	return new ApiError(StatusCodes.BAD_REQUEST, message);
};

const handleValidationErrorDB = (err) => {
	const errorMessages = Object.values(err.errors).map((el) => el.message);
	const message = `Invalid input data. ${errorMessages.join('. ')}`;
	return new ApiError(StatusCodes.BAD_REQUEST, message);
};

// handle invalid token (e.g. signature)
const handleJWTError = (err) => {
	return new ApiError(
		StatusCodes.UNAUTHORIZED,
		'invalid token, please log in again'
	);
};

// handle expired token
const handleJWTExpired = (err) => {
	return new ApiError(
		StatusCodes.UNAUTHORIZED,
		'token expired, please log in again'
	);
};

const sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	});
};

const sendErrorProd = (err, res) => {
	// operational (trusted error)
	if (err.isOperational)
		res
			.status(err.statusCode)
			.json({ status: err.status, message: err.message });
	// unknown errors from outside or programmatic
	else {
		logger.error('ERROR 💥 ', err);
		// generic error message
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			status: 'error',
			message: 'Something went wrong!',
		});
	}
};

export const unhandledRejection = (app) => {
	process.on('unhandledRejection', (err) => {
		logger.warn('UNHANDLED REJECTION! 💥 Shutting down...');
		console.log(err);
		app.close(() => {
			// exit with uncaught exception
			process.exit(1);
		});
	});
};

export const uncaughtException = () => {
	process.on('uncaughtException', (err) => {
		logger.warn('UNCAUGHT EXCEPTION! 💥 Shutting down...');
		console.log(err);
		process.exit(1);
	});
};

// handler function to handle any error in the app
export const globalErrorHandler = (err, req, res, next) => {
	err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
	err.status = err.status || 'error';
	err.message = err.message;
	const nodeEnv = process.env.NODE_ENV;
	// get error stack only in development mode
	if (nodeEnv == 'development') sendErrorDev(err, res);
	if (nodeEnv == 'production') {
		// // hard copy to override existing error
		let error = { ...err };
		error.message = err.message;
		if (error.name === 'CastError') error = handleCastError(error);
		if (err.code === 11000) error = handleDuplicateFieldsDB(error);
		if (error.name === 'ValidationError')
			error = handleValidationErrorDB(error);
		if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
		if (error.name === 'TokenExpiredError') error = handleJWTExpired(error);
		sendErrorProd(error, res);
	}
};
