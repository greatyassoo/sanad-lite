import express from 'express';
import cookieParser from 'cookie-parser';
import { globalErrorHandler, invalidRoutes } from './errorHandling.js';
import hpp from 'hpp';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { loggerMiddlware } from './logger/logger.middleware.js';
import rateLimit from 'express-rate-limit';
import UserRouter from '../routes/user.route.js';
import CousreRouter from '../routes/course.route.js';
import EnrollmentRouter from '../routes/enrollment.route.js';

export const errorMiddlware = (app) => {
	app.all('*', invalidRoutes);
	app.use(globalErrorHandler);
};

const apiLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // time in milliseconds (1H)
	limit: 100, // max limit for each IP
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	message:
		'Too many accounts created from this IP, please try again after an hour',
});

export const configurationMiddlware = (app) => {
	// body parser
	app.use(express.json({ limit: '10kb' }));
	// app.use('/api', apiLimiter);
	app.use(compression());
	app.use(helmet());
	app.use(cors());
	// api logger
	app.use(loggerMiddlware);
	// api limiter request
	// app.use("/api", apiLimiter);
	// data sanitaization against NOSQL injection
	app.use(mongoSanitize());
	// data sanitaization against XSS
	app.use(xss());
	// http params polution (for duplicate in query string)
	app.use(hpp());
	// cookie parser
	app.use(cookieParser());
};

export const routersMiddleware = (app) => {
	app.use(UserRouter);
	app.use(CousreRouter);
	app.use(EnrollmentRouter);
};
