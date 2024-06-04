import { Router } from 'express';
import axios from 'axios';
import { catchAsyncError } from '../utils/errorHandling.js';
import { config } from 'dotenv';
import { stringifyQueryParams } from '../utils/helpers.js';
config();

const router = Router();
const version = 'api/v1';
const courseServiceBaseUrl = process.env.COURSE_SERVICE_URL;

export const getAllCourses = catchAsyncError(async (req, res) => {
	const queryParams = stringifyQueryParams(req.query);
	const response = await axios.get(
		`${courseServiceBaseUrl}/${version}/courses?${queryParams}`
	);
	return res.status(response.status).json(response.data);
});

export const getCourseById = async (req, res) => {
	try {
		const response = await axios.get(
			`${courseServiceBaseUrl}/${version}/courses/${req.params.courseId}`
		);
		return res.status(response.status).json(response.data);
	} catch (err) {
		return res.status(err.response.status).send(err.data);
	}
};

export const deletCourseById = async (req, res) => {
	try {
		const response = await axios.delete(
			`${courseServiceBaseUrl}/${version}/courses/${req.params.courseId}`
		);
		return res.status(response.status).json(response.data);
	} catch (err) {
		return res.status(err.response.status).send(err.data);
	}
};

export const updateCourseById = async (req, res) => {
	try {
		const response = await axios.patch(
			`${courseServiceBaseUrl}/${version}/courses/${req.params.courseId}`,
			req.body
		);
		return res.status(response.status).json(response.data);
	} catch (err) {
		return res.status(err.response.status).send(err.data);
	}
};

export const addCourse = catchAsyncError(async (req, res) => {
	const response = await axios.post(
		`${courseServiceBaseUrl}/${version}/courses`,
		req.body
	);
	return res.status(response.status).json(response.data);
});

/////////////////////// CONTENT ///////////////////////

export const getCourseContent = async (req, res) => {
	try {
		const queryParams = stringifyQueryParams(req.query);
		const response = await axios.get(
			`${courseServiceBaseUrl}/${version}/courses/${req.params.courseId}/content?${queryParams}`
		);
		return res.status(response.status).json(response.data);
	} catch (err) {
		return res.status(err.response.status).send(err.data);
	}
};

export const addCourseContent = async (req, res) => {
	try {
		const response = await axios.post(
			`${courseServiceBaseUrl}/${version}/courses/${req.params.courseId}/content`,
			req.body
		);
		return res.status(response.status).json(response.data);
	} catch (err) {
		return res.status(err.response.status).send(err.data);
	}
};

export const publishCourseContent = async (req, res) => {
	try {
		const response = await axios.patch(
			`${courseServiceBaseUrl}/${version}/content/${req.params.contentId}/publish`
		);
		return res.status(response.status).json(response.data);
	} catch (err) {
		console.log(err);
		return res.status(err.response.status).send(err.data);
	}
};

/////////////////////// REVIEWS ///////////////////////

export const addReviewToCourse = async (req, res) => {
	try {
		const response = await axios.post(
			`${courseServiceBaseUrl}/${version}/courses/reviews`,
			req.body
		);
		return res.status(response.status).json(response.data);
	} catch (err) {
		return res.status(err.response.status).send(err.data);
	}
};

export const getCourseReviews = async (req, res) => {
	try {
		const response = await axios.get(
			`${courseServiceBaseUrl}/${version}/courses/${req.params.courseId}/reviews`
		);
		return res.status(response.status).json(response.data);
	} catch (err) {
		return res.status(err.response.status).send(err.data);
	}
};

export default router;
