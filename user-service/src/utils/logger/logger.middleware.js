import morgan from 'morgan';
import { logger } from './logger.js';

const stream = {
	write: (message) => logger.http(message),
};

/**
 * Skip all the Morgan http log if the
 * application is not running in development mode
 */
const skip = () => {
	const env = process.env.NODE_ENV || 'development';
	return env !== 'development';
};

/**
 * express middlware to hadle logging in console
 */
export const loggerMiddlware = morgan(
	':remote-addr - :method - :url - :status - :response-time ms - ":user-agent" - :res[content-length]',
	{ stream, skip }
);
