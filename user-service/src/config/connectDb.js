import { connect } from 'mongoose';
import { logger } from '../utils/logger/logger.js';

export default async () => {
	try {
		const mongoUsername = process.env.MONGO_USER;
		const mongoPassword = process.env.MONGO_PASS;
		const mongoPort = process.env.MONGO_PORT;
		const dbName = process.env.DB_NAME;
		await connect(`mongodb://localhost:${mongoPort}`, {
			user: mongoUsername,
			pass: mongoPassword,
			dbName: dbName,
			minPoolSize: 5,
			maxPoolSize: 10,
		});
		logger.info('🌱 Connected to MongoDB');
	} catch (err) {
		logger.error('Error connecting to Mongo: ' + err);
	}
};
