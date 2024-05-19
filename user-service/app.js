import express from 'express';
import { config } from 'dotenv';
import connectDb from './src/config/connectDb.js';
import userModel from './src/models/user.model.js';
import { logger } from './src/utils/logger/logger.js';
import {
	errorMiddlware,
	configurationMiddlware,
	routersMiddleware,
} from './src/utils/appMiddleware.js';
import { kafkConsumer } from './src/config/kafka.js';
// config .env file in server
config();

// init server
const app = express();
const port = process.env.PORT || 3000;
const x = async () => {
	try {
		await kafkConsumer.connect();
		await kafkConsumer.subscribe({
			topic: 'notifications',
			fromBeginning: true,
		});
		await kafkConsumer.run({
			eachMessage: async ({ topic, partition, message }) => {
				console.log(message.value.toString());
			},
		});
	} catch (err) {
		console.error(err);
	}
};
x()
app.get('/', (req, res) => {
	return res.send('200');
});

// run server on port
app.listen(port, () => {
	logger.info(`🔥 Server listening on ${port}`);
	connectDb();
	configurationMiddlware(app);
	routersMiddleware(app);
	errorMiddlware(app);
});
