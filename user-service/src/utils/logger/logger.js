import winston from 'winston';
import path from 'path';
import { __dirname } from '../constants.js';

const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
};

const colors = {
	error: 'red',
	warn: 'yellow',
	info: 'blue',
	http: 'magenta',
	debug: 'green',
};

const level = () => {
	const env = process.env.NODE_ENV || 'development';
	const isDevelopment = env === 'development';
	return isDevelopment ? 'debug' : 'warn';
};

const format = winston.format.combine(
	winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
	winston.format.printf(({ timestamp, level, message }) => {
		return `[${level.toUpperCase()}] [${timestamp}]: ${message}`;
	}),
	winston.format.colorize({ all: true, colors })
);

const transports = [
	new winston.transports.Console(),
	new winston.transports.File({
		filename: path.join(__dirname, '../../logs/errors.log'),
		level: 'error',
	}),
];

/**
 * custom logger using winston
 */
export const logger = winston.createLogger({
	level: level(),
	levels,
	format,
	transports,
});
