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
// config .env file in server
config();

// init server
const app = express();
const port = process.env.PORT || 3000;

// run server on port
app.listen(port, () => {
	logger.info(`🔥 Server listening on ${port}`);
	connectDb();
	configurationMiddlware(app);
	routersMiddleware(app);
	errorMiddlware(app);
});
