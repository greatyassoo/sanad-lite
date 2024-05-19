import { Router } from 'express';
import axios from 'axios';
import { catchAsyncError } from '../utils/errorHandling.js';
import { config } from 'dotenv';
import { stringifyQueryParams } from '../utils/helpers.js';
config();

const router = Router();
const version = 'api/v1';
const enrollmentServiceBaseUrl = `http://localhost:${process.env.ENROLLMENT_SERVICE_PORT}`;

export const addEnrollment = async (req, res) => {
	try {
		const response = await axios.post(
			`${enrollmentServiceBaseUrl}/${version}/enrollments`,
			req.body
		);
		return res.status(response.status).json(response.data);
	} catch (err) {
		return res.status(err.response.status).send(err.data);
	}
};

export const getEnrollments = catchAsyncError(async (req, res) => {
	const queryParams = stringifyQueryParams(req.query);
	const response = await axios.get(
		`${enrollmentServiceBaseUrl}/${version}/enrollments?${queryParams}`
	);
	return res.status(response.status).json(response.data);
});

export const acceptEnrollment = async (req, res) => {
	try {
		const response = await axios.patch(
			`${enrollmentServiceBaseUrl}/${version}/enrollments/${req.params.enrollmentId}/accept`,
			req.body
		);
		return res.status(response.status).json(response.data);
	} catch (err) {
		return res.status(err.response.status).send(err.data);
	}
};

export const rejectEnrollment = async (req, res) => {
	try {
		const response = await axios.patch(
			`${enrollmentServiceBaseUrl}/${version}/enrollments/${req.params.enrollmentId}/reject`,
			req.body
		);
		return res.status(response.status).json(response.data);
	} catch (err) {
		return res.status(err.response.status).send(err.data);
	}
};
