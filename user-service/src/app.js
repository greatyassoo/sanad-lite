import express from 'express';
import { config } from 'dotenv';
import connectDb from './config/connectDb.js';
import userModel from './models/user.model.js';
import { logger } from './utils/logger/logger.js';
import {
	errorMiddlware,
	configurationMiddlware,
	routersMiddleware,
} from './utils/appMiddleware.js';
import { kafkConsumer } from './config/kafka.js';
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
				// console.log({
				// 	topic,
				// 	partition,
				// 	offset: message.offset,
				// 	value: message.value.toString(),
				// });
				console.log(message.value.toString())
				// Process the received message here
			},
		});
	} catch (err) {
		console.error(err);
	}
};
x();
// run server on port
app.listen(port, () => {
	logger.info(`🔥 Server listening on ${port}`);
	connectDb();
	configurationMiddlware(app);
	routersMiddleware(app);
	errorMiddlware(app);
});
